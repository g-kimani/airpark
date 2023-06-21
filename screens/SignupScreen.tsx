import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { NavigationStackParamList, UserContextTypes } from "./types.ts";
import { saveToStore, signUpUser } from "../utils.js";
import { UserContext } from "../contexts/UserContext.tsx";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  username: yup.string().required("username is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type Props = NativeStackScreenProps<NavigationStackParamList, "Signup">;

const SignupScreen = ({ navigation }: Props) => {
  const { user, setUser } = useContext<UserContextTypes>(UserContext);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //console.log(values);
      signUpUser(values)
        .then((data) => {
          setUser(data);
          saveToStore("auth-token", data.token);
          saveToStore("user", data.username);
          navigation.replace("HomePage");
        })
        .catch((err) => alert(err));
    },
  });
  const handleLoginNavigation = () => {
    navigation.navigate("LoginScreen");
  };
  return (
    <SafeAreaView style={tw`flex-1`}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={styles.container}>
          <Text style={styles.header}>AirPark</Text>
          <Text style={styles.slogan}>Never worry about parking again!</Text>
          <Text style={styles.signup}>Create an account</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              id="firstName"
              onChangeText={formik.handleChange("firstName")}
              value={formik.values.firstName}
              placeholder="First Name"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <Text style={styles.errorText}>{formik.errors.firstName}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              id="lastName"
              onChangeText={formik.handleChange("lastName")}
              value={formik.values.lastName}
              placeholder="Last Name"
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <Text style={styles.errorText}>{formik.errors.lastName}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              id="username"
              onChangeText={formik.handleChange("username")}
              value={formik.values.username}
              placeholder="Username"
            />
            {formik.touched.username && formik.errors.username && (
              <Text style={styles.errorText}>{formik.errors.username}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              id="email"
              onChangeText={formik.handleChange("email")}
              value={formik.values.email}
              placeholder="Email"
            />
            {formik.touched.email && formik.errors.email && (
              <Text style={styles.errorText}>{formik.errors.email}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              id="password"
              onChangeText={formik.handleChange("password")}
              value={formik.values.password}
              placeholder="Password"
              secureTextEntry
            />
            {formik.touched.password && formik.errors.password && (
              <Text style={styles.errorText}>{formik.errors.password}</Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => formik.submitForm()}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <Text>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.logIn}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
  },
  inputContainer: {
    width: "80%",
    marginBottom: 10,
  },
  inputText: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
  button: {
    padding: 16,
    backgroundColor: "black",
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
  loginContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  logIn: {
    color: "#039be5",
    fontWeight: "bold",
    marginLeft: 5,
  },
  header: {
    marginBottom: 8,

    fontSize: 40,
    fontWeight: "normal",
    marginTop: 30,
    textAlign: "center",
    color: "red",
  },
  slogan: {
    marginBottom: 25,
    fontSize: 12,
    fontStyle: "italic",
    color: "grey",
  },
  signup: {
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default SignupScreen;
