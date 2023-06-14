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
  console.log("🚀 ~ file: LoginScreen.tsx:15 ~ save ~ value:", value);
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext<ContextTypes>(UserContext);

  const handleLogin = () => {
    loginUser({ username, password }).then((data) => {
      setUser(data);
      save("auth-token", data.token);
      save("user", data.user);
      navigation.replace("HomePage");
    });
  };

  return (
    <>
      <Text style={styles.header}>AirPark</Text>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 0,
        }}
      >
        <Text>Sign in</Text>
        <TextInput
          placeholder="Email"
          style={styles.inputText}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          placeholder="Password"
          style={styles.inputText}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity
          onPress={() => {
            handleLogin();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={() => {
          //   navigation.navigate("google");
          // }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>

        <Text>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Signup");
          }}
          // style={styles.button}
        >
          <Text style={styles.signUpText}>Sign up now! </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    padding: 16,
    backgroundColor: "#039be5",
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  inputText: {
    padding: 16,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    margin: 10,
    width: "60%",
  },
  signUpText: {
    color: "blue",
    fontSize: 16,
  },
  header: {
    fontSize: 26,
    marginTop: 20,
    textAlign: "center",
    color: "red",
  },
});
