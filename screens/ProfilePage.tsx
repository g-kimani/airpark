import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type NavigationStackParamList = {
  LoginScreen: undefined;
};

type Props = NativeStackScreenProps<NavigationStackParamList>;

const ProfilePage = ({ navigation }: Props) => {
  const handleLogout = () => {
    navigation.replace("LoginScreen");
  };
  const defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXV98JSo6IPuUib7DkMohhXWrHPggU_rGweA&usqp=CAU";
  const [image, setImage] = useState(defaultImage);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.ScrollViewcontainer}>
      <View style={styles.container}>
        <View style={styles.pictureContainer}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                alignContent: "center",
              }}
            />
          )}
          <Button title="Edit picture" onPress={pickImage} />
        </View>
        <Text style={styles.header}>Username</Text>

        <TouchableOpacity style={styles.listingsButton}>
          <Text style={styles.buttonText}>Manage Listings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookingsButton}>
          <Text style={styles.buttonText}>Manage Bookings</Text>
        </TouchableOpacity>

        <TextInput id="name" placeholder="Name" style={styles.inputText} />

        <TextInput
          id="username"
          placeholder="Username"
          style={styles.inputText}
        />
        <TextInput
          id="pronouns"
          placeholder="Pronouns"
          style={styles.inputText}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  ScrollViewcontainer: {
    alignItems: "center",
  },
  pictureContainer: {
    borderColor: "grey",
    borderStyle: "solid",
    borderWidth: 0.2,
    borderRadius: 20,
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    marginBottom: -20,
  },
  header: {
    fontSize: 20,
    margin: 10,
    paddingTop: 20,
  },
  container: {
    alignItems: "center",
    marginTop: 30,
    width: "100%",
  },
  inputText: {
    padding: 12,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    margin: 10,
    width: "60%",
  },

  listingsButton: {
    padding: 12,
    backgroundColor: "orange",
    borderRadius: 30,
    margin: 5,
    width: "60%",
  },
  bookingsButton: {
    padding: 12,
    backgroundColor: "blue",
    borderRadius: 30,
    margin: 5,
    width: "60%",
  },
  button: {
    padding: 10,
    backgroundColor: "red",
    borderRadius: 10,
    margin: 5,
    width: "30%",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  logoutButton: {
    padding: 12,
    backgroundColor: "blue",
    borderRadius: 10,
    margin: 5,
    width: "60%",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});
export default ProfilePage;