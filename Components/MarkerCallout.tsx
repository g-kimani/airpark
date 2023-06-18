import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
// import Geocoder from "react-native-geocoding";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

// Geocoder.init("AIzaSyBhcOAI9R7HKqUD9f-2is268fJza5KZ0G8");
type Props = {
  parking: any;
};
const MarkerCallout = ({ parking }: Props) => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  // useEffect(() => {
  //   Geocoder.from(parking).then((result) => {
  //     // console.log(
  //     //   "🚀 ~ file: MarkerCallout.tsx:19 ~ Geocoder.from ~ result.results[0]:",
  //     //   result.results[0]
  //     // );
  //     setAddress(result.results[0]);
  //     setLoading(false);
  //   });
  // }, []);
  return (
    <View style={tw`flex justify-center mx-auto items-center`}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {
            //  TODO - Decide on what goes in a callout
          }
          {/* <Text style={tw`text-sm font-medium leading-6 text-gray-900 mt-4`}>
            Address:
          </Text>
          {address.address_components.map((comp) => (
            <Text>{comp.short_name}</Text>
          ))} */}
          <Text style={tw`font-bold my-2`}>
            £{parking.price}
            <Text style={tw`text-gray-400`}> /day</Text>
          </Text>
        </>
      )}
      <TouchableOpacity
        style={tw`rounded-md bg-white border-2 border-indigo-600 px-3 py-2 shadow-sm mx-auto`}
        onPress={() => {
          navigation.navigate("IndividualParking", { parking });
        }}
      >
        <Text style={tw`text-sm font-semibold text-indigo-600`}>See more</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MarkerCallout;

const styles = StyleSheet.create({});
