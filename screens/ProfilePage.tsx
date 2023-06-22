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
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { getUserProfile, patchUserProfile } from "../utils";
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
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUserProfile(user)
      .then((data) => {
        setUserInfo(data);
        setIsLoading(false);
      })
      .catch((err) => alert(err));
  }, [user]);

  const handleLogout = () => {
    Promise.all([
      SecureStore.deleteItemAsync("auth-token"),
      SecureStore.deleteItemAsync("user_id"),
      SecureStore.deleteItemAsync("user"),
    ]).then(() => {
      navigation.replace("LoginScreen");
    });
  };

  const handleModal = () => setIsModalVisible((prevValue) => !prevValue);

  const defaultImage =
    "https://i.pinimg.com/564x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg";

  const [image, setImage] = useState(null);
  const [displayAvatar, setDisplayAvatar] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
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

  const capitaliseName = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  useEffect(() => {
    if (userInfo?.avatar_url) {
      setDisplayAvatar(userInfo.avatar_url);
    } else {
      setDisplayAvatar(defaultImage);
    }
  }, [userInfo]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
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
                    <Image
                      source={{ uri: image?.uri ?? displayAvatar }}
                      style={styles.picture}
                    />
                    <View style={tw`items-center`}>
                      <Text style={tw`text-4xl`}>
                        {capitaliseName(userInfo.firstname)}
                      </Text>
                      {!disabled && (
                        <TouchableOpacity onPress={pickImage}>
                          <View style={tw`flex flex-row items-center`}>
                            <Feather name="edit" size={18} color="black" />
                            <Text style={tw`text-sm`}>Photo</Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  <View style={tw`flex flex-row justify-between items-center`}>
                    <Text style={tw`text-xl`}>Personal Information</Text>
                  </View>
                  <View style={styles.form}>
                    <Formik
                      initialValues={{
                        firstname: userInfo.firstname || "",
                        lastname: userInfo.lastname || "",
                        username: userInfo.user || "",
                        email: userInfo.email || "",
                      }}
                      onSubmit={(values) => {
                        const request = { ...values, image };
                        patchUserProfile(request)
                          .then(({ user }) => {
                            setUserInfo(user);
                            setDisabled(true);
                            setButtonText("Edit");
                          })
                          .catch((err) => alert(err));
                        console.log(values);
                      }}
                    >
                      {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={styles.form}>
                          <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                              if (disabled) {
                                toggleEditSave();
                              } else {
                                handleSubmit();
                              }
                            }}
                          >
                            <Text style={styles.buttonText}>{buttonText}</Text>
                          </TouchableOpacity>
                          <Text>Firstname</Text>
                          <TextInput
                            id="firstname"
                            placeholder="First Name"
                            style={[
                              styles.inputText,
                              !disabled && styles.enabledInputText,
                            ]}
                            onChangeText={handleChange("firstname")}
                            value={capitaliseName(values.firstname)}
                            editable={!disabled}
                          />
                          <Text>Lastname</Text>
                          <TextInput
                            id="lastname"
                            placeholder="Last Name"
                            style={[
                              styles.inputText,
                              !disabled && styles.enabledInputText,
                            ]}
                            onChangeText={handleChange("lastname")}
                            onBlur={handleBlur("lastname")}
                            value={capitaliseName(values.lastname)}
                            editable={!disabled}
                          />
                          <Text>Username</Text>
                          <TextInput
                            id="username"
                            placeholder="Username"
                            style={[
                              styles.inputText,
                              !disabled && styles.enabledInputText,
                            ]}
                            onChangeText={handleChange("username")}
                            onBlur={handleBlur("username")}
                            value={values.username}
                            editable={!disabled}
                          />
                          <Text>Email</Text>
                          <TextInput
                            id="email"
                            placeholder="email"
                            style={[
                              styles.inputText,
                              !disabled && styles.enabledInputText,
                            ]}
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("pronouns")}
                            value={values.email}
                            editable={!disabled}
                          />
                        </View>
                      )}
                    </Formik>
                    <TouchableOpacity onPress={handleModal}>
                      <View style={tw`items-center`}>
                        <Text style={tw`text-base text-indigo-800`}>
                          Find out more about us
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <Modal isVisible={isModalVisible}>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        activeOpacity={1}
                        onPress={handleModal}
                      >
                        <View
                          style={{
                            backgroundColor: "white",
                            borderRadius: 10,
                            padding: 20,
                          }}
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 18,
                              fontWeight: "bold",
                              marginBottom: 20,
                            }}
                          >
                            Welcome to AirPark
                          </Text>
                          <Text style={{ textAlign: "center", fontSize: 18 }}>
                            Your go-to parking app for convenient and
                            hassle-free parking solutions. Our app is designed
                            to help you find available parking spaces and
                            connect with hosts who offer secure parking options.
                            Whether you're a traveler in need of a parking spot
                            or a host looking to monetize your parking space,
                            we've got you covered.
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </Modal>
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginVertical: 5,
    marginBottom: 20,
    width: "100%",
    fontSize: 20,
    alignItems: "baseline",
  },
  button: {
    padding: 10,
    backgroundColor: "#00296b",
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
  form: {
    marginVertical: 10,
  },
});
