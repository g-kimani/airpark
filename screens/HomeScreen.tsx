import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type NavigationStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  Profile: { userid: "string" } | undefined;
};

type Props = NativeStackScreenProps<NavigationStackParamList, "Home">;

const HomeScreen = ({ navigation }: Props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.Header}>AirPark</Text>
      <Text>Sign in</Text>
      <TextInput placeholder="Email" style={styles.inputText} />
      <TextInput
        placeholder="Password"
        style={styles.inputText}
        // onChange={(event) => {
        //   console.log(event.target);
        // }}
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("HomePage");
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
  );
};

export default HomeScreen;

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
  Header: {
    fontSize: 20,
  },
});
