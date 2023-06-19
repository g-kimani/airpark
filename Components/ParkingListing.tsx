import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";

type Props = {
  parking: any;
};
const ParkingListing = ({ parking }: Props) => {
  return (
    <View style={tw`flex bg-white shadow-sm h-10 p-8 items-center m-4`}>
      <Text>{parking.area}</Text>
    </View>
  );
};

export default ParkingListing;

const styles = StyleSheet.create({});
