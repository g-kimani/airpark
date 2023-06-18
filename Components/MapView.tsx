import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import IndividualParking from "../screens/IndividualParking";
import MarkerCallout from "./MarkerCallout";

type Props = {
  selectedLocation: {
    latitude: number;
    longitude: number;
  };
  parkings: any[];
};

const MapComponent = ({ selectedLocation, parkings }: Props) => {
  const navigation = useNavigation();

  return (
    <MapView
      style={styles.map}
      region={{
        latitude: selectedLocation ? selectedLocation.latitude : 0,
        longitude: selectedLocation ? selectedLocation.longitude : 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {parkings.map((parking) => {
        return (
          <Marker
            key={parking.parking_id}
            coordinate={{
              latitude: parking.latitude,
              longitude: parking.longitude,
            }}
          >
            <Callout>
              <MarkerCallout parking={parking} />
            </Callout>
          </Marker>
        );
      })}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
});

export default MapComponent;
