import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MapComponent from "./MapView";
import ParkingsList from "./ParkingsList";
import { FontAwesome5 } from "@expo/vector-icons";

type Props = {
  selectedLocation: {
    latitude: number;
    longitude: number;
  };
  parkingList: any[];
  viewMode: string;
  setSelectedLocation: any;
};

const DestinationResult = ({
  selectedLocation,
  parkingList,
  setSelectedLocation,
  viewMode,
}: Props) => {
  return (
    <View>
      {viewMode === "map" ? (
        <MapComponent
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          parkings={parkingList}
        />
      ) : (
        <View>
          <ParkingsList parkings={parkingList} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  toggle: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
});

export default DestinationResult;
