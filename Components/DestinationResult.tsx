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
  toggleViewMode: () => void;
  dummyData: any[];
};

const DestinationResult = ({
  selectedLocation,
  parkingList,
  viewMode,
  toggleViewMode,
  dummyData,
}: Props) => {
  return (
    <View>
      <TouchableOpacity onPress={toggleViewMode}>
        <View style={styles.toggle}>
          <Text>{viewMode === "map" ? "List" : "Map"}</Text>
          <FontAwesome5
            name={viewMode === "map" ? "list-alt" : "map"}
            size={24}
            color="black"
          />
        </View>
      </TouchableOpacity>
      {viewMode === "map" ? (
        <MapComponent
          selectedLocation={selectedLocation}
          parkings={parkingList}
        />
      ) : (
        <View>
          <ParkingsList parkings={dummyData} />
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
