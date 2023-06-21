import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
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

const validationSchema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  username: yup.string().required("Username is required"),
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
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      signUpUser(values)
        .then((data) => {
          setUser(data);
          saveToStore("auth-token", data.token);
          saveToStore("user", data.username);
          navigation.replace("Home");
        })
        .catch((err) => alert(err));
    },
  });

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TextInput
        style={styles.inputText}
        onChangeText={formik.handleChange("firstname")}
        value={formik.values.firstname}
        placeholder="First Name"
      />
      <Text>{formik.errors.firstname}</Text>

      <TextInput
        style={styles.inputText}
        onChangeText={formik.handleChange("lastname")}
        value={formik.values.lastname}
        placeholder="Last Name"
      />
      <Text>{formik.errors.lastname}</Text>

      <TextInput
        style={styles.inputText}
        onChangeText={formik.handleChange("username")}
        value={formik.values.username}
        placeholder="Username"
      />
      <Text>{formik.errors.username}</Text>

      <TextInput
        style={styles.inputText}
        onChangeText={formik.handleChange("email")}
        value={formik.values.email}
        placeholder="Email"
      />
      <Text>{formik.errors.email}</Text>

      <TextInput
        style={styles.inputText}
        onChangeText={formik.handleChange("password")}
        value={formik.values.password}
        placeholder="Password"
        secureTextEntry
      />
      <Text>{formik.errors.password}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => formik.handleSubmit()}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

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
});

export default SignupScreen;
