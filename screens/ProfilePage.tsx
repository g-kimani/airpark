import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { getUserProfile } from "../utils";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Formik } from "formik";

type NavigationStackParamList = {
  LoginScreen: undefined;
};

type Props = NativeStackScreenProps<NavigationStackParamList>;

const ProfilePage = ({ navigation }: Props) => {
  const { user } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [buttonText, setButtonText] = useState("Edit");

  useEffect(() => {
    setIsLoading(true);
    getUserProfile(user).then((data) => {
      setUserInfo(data);
      setIsLoading(false);
    });
  }, [user]);

  const handleLogout = () => {
    SecureStore.deleteItemAsync("auth-token").then(() => {
      navigation.replace("LoginScreen");
    });
  };

  const defaultImage =
    "https://i.pinimg.com/564x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg";

  const [image, setImage] = useState(defaultImage);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const toggleEditSave = () => {
    if (disabled) {
      setDisabled(false);
      setButtonText("Save");
    } else {
      setDisabled(true);
      setButtonText("Edit");
    }
  };

  return (
    <SafeAreaView>
      <View style={tw`flex justify-center p-5`}>
        {isLoading ? (
          <ActivityIndicator size="large" color="red" />
        ) : (
          <View>
            <View style={tw`flex flex-row items-center justify-between`}>
              <Text style={tw`p-2 text-3xl font-bold`}>Profile</Text>
              <TouchableOpacity onPress={handleLogout}>
                <Entypo name="log-out" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.pictureContainer}>
                {image && (
                  <Image source={{ uri: image }} style={styles.picture} />
                )}
                <View style={tw`items-center`}>
                  <Text style={tw`text-4xl`}>{userInfo.firstname}</Text>
                  <TouchableOpacity onPress={pickImage}>
                    <View style={tw`flex flex-row items-center`}>
                      <Feather name="edit" size={18} color="black" />
                      <Text style={tw`text-sm`}>Photo</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={tw`flex flex-row justify-between items-center`}>
                <Text style={tw`text-xl`}>Personal Information</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={toggleEditSave}
                >
                  <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
              </View>
              <Formik
                initialValues={{
                  firstname: userInfo.firstname || "",
                  lastname: userInfo.lastname || "",
                  username: userInfo.user || "",
                  pronouns: "",
                }}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View style={styles.form}>
                    <Text style={tw`text-decoration-line: underline`}>
                      Firstname
                    </Text>
                    <TextInput
                      id="firstname"
                      placeholder="First Name"
                      style={[
                        styles.inputText,
                        !disabled && styles.enabledInputText,
                      ]}
                      onChangeText={handleChange("firstname")}
                      value={values.firstname}
                      editable={!disabled}
                    />
                    <Text style={tw`text-decoration-line: underline`}>
                      Lastname
                    </Text>
                    <TextInput
                      id="lastname"
                      placeholder="Last Name"
                      style={[
                        styles.inputText,
                        !disabled && styles.enabledInputText,
                      ]}
                      onChangeText={handleChange("lastname")}
                      onBlur={handleBlur("lastname")}
                      value={values.lastname}
                      editable={!disabled}
                    />
                    <Text style={tw`text-decoration-line: underline`}>
                      Username
                    </Text>
                    <TextInput
                      id="username"
                      placeholder="Username"
                      style={[
                        styles.inputText,
                        !disabled && styles.enabledInputText, // Invert the condition here
                      ]}
                      onChangeText={handleChange("username")}
                      onBlur={handleBlur("username")}
                      value={values.username}
                      editable={!disabled}
                    />
                    <Text style={tw`text-decoration-line: underline`}>
                      Email
                    </Text>
                    <TextInput
                      id="pronouns"
                      placeholder="Pronouns"
                      style={[
                        styles.inputText,
                        !disabled && styles.enabledInputText,
                      ]}
                      onChangeText={handleChange("pronouns")}
                      onBlur={handleBlur("pronouns")}
                      value={values.pronouns}
                      editable={!disabled}
                    />
                  </View>
                )}
              </Formik>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  pictureContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafaff",
    borderRadius: 20,
    paddingVertical: 10,
    marginBottom: 20,
    width: "100%",
  },
  picture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: 10,
    marginLeft: 10,
  },
  header: {
    fontSize: 20,
    margin: 10,
    paddingTop: 20,
  },
  container: {
    alignItems: "center",
  },
  inputText: {
    padding: 12,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    marginVertical: 15,
    width: "100%",
    fontSize: 20,
    alignItems: "baseline",
  },
  button: {
    padding: 10,
    backgroundColor: "red",
    borderRadius: 10,
    margin: 5,
    width: "30%",
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  enabledInputText: {
    backgroundColor: "white",
  },
});
