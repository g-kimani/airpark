import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { defaultImage } from "../assets/image_not_found";
import { formatPrice } from "../tools/helpers";
import Geocoder from "react-native-geocoding";
import { Entypo } from "@expo/vector-icons";
const ParkingInfo = ({ route }) => {
  const { parking } = route.params;
  const [address, setAddress] = useState("");

  useEffect(() => {
    Geocoder.from(parking).then((result) => {
      setAddress(result.results[0].formatted_address);
    });
  }, [parking]);
  return (
    <View style={tw`p-4`}>
      <View style={tw`items-center`}>
        <View style={tw`w-full h-300px`}>
          <Image
            source={{ uri: parking.picture ? parking.picture : defaultImage }}
            style={tw`w-full h-full rounded`}
          />
        </View>
      </View>
      <View>
        <Text style={tw`font-bold my-2`}>
          Price: {formatPrice(parking.price)}
          <Text style={tw`text-gray-400`}> /day</Text>
        </Text>
        <View style={tw`flex flex-row items-center`}>
          <Entypo name="location-pin" size={20} color="red" />
          <Text style={tw`text-xl font-bold`}>{address}</Text>
        </View>
        <Text
          style={tw`text-sm font-medium underline leading-6 text-gray-900 mt-4`}
        >
          Extra info:
        </Text>
        <View>
          {parking.description ? (
            <Text style={tw`text-base text-gray-500`}>
              {parking.description}
            </Text>
          ) : (
            <Text>No Description</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default ParkingInfo;

const styles = StyleSheet.create({});
