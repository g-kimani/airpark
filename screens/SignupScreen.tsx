import React from "react";
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

import { NavigationStackParamList } from "./types";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
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

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      navigation.navigate("HomePage");
    },
  });
  return (
    <View>
      <TextInput
        style={styles.inputText}
        id="firstName"
        onChangeText={formik.handleChange("firstName")}
        value={formik.values.firstName}
        placeholder="First Name"
      />
      <Text>{formik.errors.firstName}</Text>

      <TextInput
        style={styles.inputText}
        id="lastName"
        onChangeText={formik.handleChange("lastName")}
        value={formik.values.lastName}
        placeholder="Last Name"
      />
      <Text>{formik.errors.lastName}</Text>

      <TextInput
        style={styles.inputText}
        id="email"
        onChangeText={formik.handleChange("email")}
        value={formik.values.email}
        placeholder="Email"
      />
      <Text>{formik.errors.email}</Text>

      <TextInput
        style={styles.inputText}
        id="password"
        name="password"
        onChangeText={formik.handleChange("password")}
        value={formik.values.password}
        placeholder="Password"
        secureTextEntry
      />
      <Text>{formik.errors.password}</Text>

      <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>

    // <TouchableOpacity
    //     onPress={() => {
    //       navigation.navigate("Signup");
    //     }}
    //     // style={styles.button}
    //   >
    //     <Text style={styles.signUpText}>Sign up now! </Text>
    //   </TouchableOpacity>
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
