import React, { useContext, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import HomeSearch from "../Components/HomeSearch";
import { postParking } from "../utils";
import { UserContext } from "../contexts/UserContext";
import { ParkingsContext } from "../contexts/ParkingsContext";

const AddParkingList = () => {
  const [parking, setParking] = useState({ price: "", description: "haha" });
  const [image, setImage] = useState(null);
  const { token } = useContext(UserContext);
  const [selectedArea, setSelectedArea] = useState({});
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };
  function handleAreaSelected(locationInfo: any) {
    setSelectedArea(locationInfo);
    setParking((prev) => {
      return { ...prev, ...locationInfo };
    });
    //console.log(
    //   "🚀 ~ file: AddParkingList.tsx:40 ~ handleAreaSelected ~ parking:",
    //   parking
    // );
  }
  // function dismissKeyboard() {

  // }
  const { setParkings } = useContext(ParkingsContext);

  function handleSubmit() {
    postParking({ ...parking, image })
      .then(({ parking }) => {
        //console.log(
        //   "🚀 ~ file: AddParkingList.tsx:55 ~ postParking ~ parking:",
        //   parking
        // );
        // setParkings((prev: any) => [...prev, parking]);
        setParkings((prev: any) => {
          return { list: [...prev.list, parking] };
        });
        //console.log("updated parkings");
      })
      .catch((err) => alert(err));
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>Add Parking space</Text>
        <HomeSearch
          setSelectedLocation={handleAreaSelected}
          placeholder="Where is the parking?"
        />
        <Text>Price: </Text>
        <TextInput
          id="price"
          placeholder="Price"
          keyboardType="decimal-pad"
          value={parking.price}
          onChangeText={(text) =>
            setParking((prev) => {
              return { ...prev, price: text };
            })
          }
          style={[styles.inputText, { width: "100%" }]}
        />
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity style={styles.uploadButton}>
          <Button title="Upload image" onPress={pickImage} />
        </TouchableOpacity>
        {image && (
          //   <Text>Successfully uploaded!</Text>
          <Image
            source={{ uri: image.uri }}
            style={{ width: 200, height: 200 }}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
