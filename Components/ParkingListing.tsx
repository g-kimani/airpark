import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import Geocoder from "react-native-geocoding";
import { useNavigation } from "@react-navigation/native";

type Props = {
  parking: any;
};
const ParkingListing = ({ parking }: Props) => {
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();
  useEffect(() => {
    Geocoder.from(parking).then((result) => {
      // truncates to first line of address
      setAddress(result.results[0].formatted_address.split(",")[0]);
    });
  }, [parking]);
  const formatPrice = (price: number) => {
    if (!price) return "FREE";
    if (price < 1) {
      return `${price * 100}p /day`;
    } else {
      let [pounds, pennies] = String(price).split(".");
      if (!pennies) pennies = "";
      pennies = pennies.padEnd(2, "0");
      return `£${pounds}.${pennies} /day`;
    }
  };
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ManageParking", { parking });
      }}
    >
      <View style={tw`bg-white shadow-sm p-4 rounded-lg m-2`}>
        <View style={tw`flex flex-row`}>
          <View style={tw`rounded-full bg-gray-100 px-3 py-1.5`}>
            <Text style={tw` font-medium text-gray-600`}>{parking.area}</Text>
          </View>
          <View style={tw`rounded-full bg-gray-100 px-3 py-1.5 mx-2`}>
            <Text style={tw` font-medium text-gray-600`}>
              {formatPrice(parking.price)}
            </Text>
          </View>
        </View>
        <Text style={tw`mt-3 text-lg font-semibold leading-6 text-gray-900`}>
          {address}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ParkingListing;

const styles = StyleSheet.create({});
