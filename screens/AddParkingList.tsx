import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const AddParkingList = () => {
  const [image, setImage] = useState(null);
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
    <>
      <View style={styles.container}>
        <Text style={styles.header}>Add Parking space</Text>
        <TextInput
          id="location"
          placeholder="Location"
          style={styles.inputText}
        />

        <TextInput id="price" placeholder="Price" style={styles.inputText} />
        <TextInput
          id="Availability"
          placeholder="Availability"
          style={styles.inputText}
        />
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity style={styles.uploadButton}>
          <Button title="Upload image" onPress={pickImage} />
        </TouchableOpacity>
        {image && (
          <Text>Successfully uploaded!</Text>
          // <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    margin: 10,
    paddingTop: 20,
  },
  container: {
    alignItems: "center",
  },
  inputText: {
    padding: 16,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    margin: 10,
    width: "60%",
  },
  uploadButton: {
    padding: 14,
    backgroundColor: "white",
    borderColor: "grey",
    borderStyle: "solid",
    borderWidth: 0.4,

    borderRadius: 10,
    margin: 10,
    width: "50%",
  },
  button: {
    padding: 16,
    backgroundColor: "red",
    borderRadius: 10,
    margin: 10,
    width: "50%",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});
export default AddParkingList;
