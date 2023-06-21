import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { NavigationStackParamList, UserContextTypes } from "./types.ts";
import { saveToStore, signUpUser } from "../utils.js";
import { UserContext } from "../contexts/UserContext.tsx";

const validationSchema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
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
  const [avoidKeyboard, setAvoidKeyboard] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      Keyboard.dismiss();
      signUpUser(values)
        .then((data) => {
          setUser(data);
          console.log(data);
          saveToStore("auth-token", data.token);
          saveToStore("user", data.user);
          navigation.replace("Home");
        })
        .catch((err) => alert(err));
    },
  });
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      enabled={avoidKeyboard}
      behavior="position"
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.header}>AirPark</Text>
          <Text style={styles.slogan}>Never worry about parking again!</Text>
          <Text style={styles.signup}>Create an account</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              id="firstname"
              onChangeText={formik.handleChange("firstname")}
              value={formik.values.firstname}
              placeholder="First Name"
              onFocus={() => setAvoidKeyboard(false)}
            />
            {formik.touched.firstname && formik.errors.firstname && (
              <Text style={styles.errorText}>{formik.errors.firstname}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              id="lastname"
              onChangeText={formik.handleChange("lastname")}
              value={formik.values.lastname}
              placeholder="Last Name"
              onFocus={() => setAvoidKeyboard(false)}
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <Text style={styles.errorText}>{formik.errors.lastname}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              id="username"
              onChangeText={formik.handleChange("username")}
              value={formik.values.username}
              placeholder="Username"
              onFocus={() => setAvoidKeyboard(true)}
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
              inputMode="email"
              placeholder="Email"
              onFocus={() => setAvoidKeyboard(true)}
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
              onFocus={() => setAvoidKeyboard(true)}
            />
            {formik.touched.password && formik.errors.password && (
              <Text style={styles.errorText}>{formik.errors.password}</Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => formik.submitForm()}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <Text>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.logIn}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  loginContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  logIn: {
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
  slogan: {
    marginBottom: 25,
    fontSize: 10,
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
