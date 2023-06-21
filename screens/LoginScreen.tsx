import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useContext, useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { loginUser } from "../utils";
import { UserContext } from "../contexts/UserContext";
import * as SecureStore from "expo-secure-store";

async function save(key: string, value: string) {
  //console.log("🚀 ~ file: LoginScreen.tsx:15 ~ save ~ value:", value);
  await SecureStore.setItemAsync(key, value);
}

type NavigationStackParamList = {
  Map: undefined;
  HomePage: undefined;
  Login: undefined;
  Signup: undefined;
  Profile: { userid: "string" } | undefined;
};

type Props = NativeStackScreenProps<NavigationStackParamList, "Login">;

type ContextTypes = {
  user?: any;
  setUser?: any;
};

const LoginScreen = ({ navigation }: Props) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { user, setUser } = useContext<ContextTypes>(UserContext);

  const handleLogin = () => {
    setErrorMessage(""); // Clear any previous error message
    loginUser({ login, password })
      .then((data) => {
        setUser(data);
        save("auth-token", data.token);
        save("user", data.user);
        save("user_id", `${data.user_id}`);
        navigation.replace("Home");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setErrorMessage("Incorrect email or password");
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      });
  };

  // AUTO Login if previously logged in
  useEffect(() => {
    SecureStore.getItemAsync("auth-token").then((result) => {
      if (result) {
        setUser((user: any) => {
          return { ...user, token: result };
        });
        navigation.replace("Home");
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>AirPark</Text>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 0,
        }}
      >
        <Text style={styles.signInText}>Sign in</Text>

        <TextInput
          placeholder="Email or Username"
          style={styles.inputText}
          value={login}
          onChangeText={(text) => setLogin(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          style={styles.inputText}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.signUpText}>Don't have an account?</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Signup")}
        // style={styles.button}
      >
        <Text style={styles.signUp}>Sign up now!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
  },

  slogan: {
    marginBottom: 25,
    fontSize: 10,
    fontStyle: "italic",
    color: "grey",
  },
  inputContainer: {
    width: "80%",
    marginBottom: 10,
  },

  signInText: {
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
    marginBottom: 8,
    textAlign: "center",
  },
  button: {
    padding: 16,
    backgroundColor: "#039be5",
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  inputText: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  signUpText: {
    marginTop: 20,
    fontSize: 16,
    marginBottom: 10,
  },
  signUp: {
    fontSize: 16,
    color: "#039be5",
    fontWeight: "bold",
  },
  header: {
    marginBottom: 8,

    fontSize: 40,
    fontWeight: "normal",
    marginTop: 50,
    textAlign: "center",
    color: "red",
  },
});
