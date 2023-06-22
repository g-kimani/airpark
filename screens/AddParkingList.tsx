import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import HomeSearch from "../Components/HomeSearch";
import { postParking } from "../utils";
import { ParkingsContext } from "../contexts/ParkingsContext";
import tw from "twrnc";
import { MaterialIcons } from "@expo/vector-icons";
import { ParkingContextTypes } from "./types";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as yup from "yup";

const AddParkingList = () => {
  const [location, setLocation] = useState({});
  const [price, setPrice] = useState("");
  const [image, setImage] = useState({});
  const [description, setDescription] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setParkings } = useContext<ParkingContextTypes>(ParkingsContext);
  const navigation = useNavigation();

  function pickImage() {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
      .then((result) => {
        if (!result.canceled) {
          // formik.values.image = result.assets[0];
          setImage(result.assets[0]);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleSubmit() {
    const request = { ...location, price, image, description };
    console.log(
      "🚀 ~ file: AddParkingList.tsx:48 ~ handleSubmit ~ parking:",
      request
    );
    setDisableSubmit(true);
    setIsLoading(true);
    postParking(request)
      .then(({ parking }) => {
        setParkings((prev: any) => {
          return { list: [...prev.list, parking] };
        });
        parking = {
          ...parking,
          latitude: parking.location.x,
          longitude: parking.location.y,
        };
        navigation.navigate("ManageParking", { parking });
      })
      .catch((err) => alert(err))
      .finally(() => {
        setDisableSubmit(false);
        setIsLoading(false); // Set isLoading to false after navigating
      });
  }

  useEffect(() => {
    if (
      Object.keys(location).length === 0 ||
      Object.keys(image).length === 0 ||
      price === ""
    ) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [location, image, price]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={tw`flex justify-center p-8`}>
          <View
            style={tw`flex relative mx-auto justify-center items-center w-4/5 min-h-220px my-4 bg-slate-200 rounded-md `}
          >
            {Object.keys(image).length ? (
              <>
                <Image
                  source={{ uri: image.uri }}
                  style={{ width: 200, height: 200 }}
                />
                <TouchableOpacity
                  onPress={() => {
                    setImage({});
                  }}
                  style={tw`absolute bottom-1 right-1 bg-slate-200 rounded`}
                >
                  <MaterialIcons name="delete" size={32} color={"red"} />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={pickImage}>
                <MaterialIcons name="add-a-photo" size={64} />
                <Text>Add a photo</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={tw`text-sm font-medium leading-6 text-gray-900 mt-4`}>
            Address:
          </Text>
          <HomeSearch
            setSelectedLocation={setLocation}
            placeholder="Your parking location?"
          />
          <Text style={tw`text-sm font-medium leading-6 text-gray-900 mt-4`}>
            Price (£ / per day):
          </Text>
          <TextInput
            placeholder="£0.00"
            value={price}
            keyboardType={"decimal-pad"}
            onChangeText={(text) => setPrice(text)}
            style={[
              styles.inputBg,
              tw`w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm `,
            ]}
          />
          <Text style={tw`text-sm font-medium leading-6 text-gray-900 mt-4`}>
            Description (optional):
          </Text>
          <TextInput
            placeholder="Description"
            multiline
            value={description}
            onChangeText={(text) => setDescription(text)}
            textAlignVertical="top"
            style={[
              styles.inputBg,
              tw`w-full rounded-md border-0 py-1.5 px-4 text-gray-900 min-h-75px shadow-sm `,
            ]}
          />

          <TouchableOpacity
            style={[
              tw`rounded-md bg-${
                disableSubmit ? "gray-600" : "indigo-600"
              } px-3 py-2 shadow-sm m-8 mx-auto`,
              {
                width: 120,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
              }, // Set a fixed width and height for the button
            ]}
            onPress={handleSubmit}
            disabled={disableSubmit}
          >
            {isLoading ? ( // Conditional rendering of loading indicator
              <ActivityIndicator size="small" color="white" /> // You can customize the loading indicator as needed
            ) : (
              <Text style={tw`text-sm font-semibold text-white`}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputBg: {
    backgroundColor: "#f8f9fa",
  },
});
export default AddParkingList;
