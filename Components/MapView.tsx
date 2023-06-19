import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, {
  Callout,
  Details,
  MapViewProps,
  Marker,
  Region,
} from "react-native-maps";
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
  const [currentViewport, setCurrentViewport] = useState({});

  const handleRegionChange = (region: Region, details: Details) => {
    console.log("🚀 ~ file: MapView.tsx:29 ~ MapComponent ~ details:", details);
    console.log("🚀 ~ file: MapView.tsx:50 ~ MapComponent ~ region:", region);

    const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
    const northeastLatitude = latitude + latitudeDelta / 2;
    const northeastLongitude = longitude + longitudeDelta / 2;

    const southwestLatitude = latitude - latitudeDelta / 2;
    const southwestLongitude = longitude - longitudeDelta / 2;

    setCurrentViewport({
      northeast: {
        latitude: northeastLatitude,
        longitude: northeastLongitude,
      },
      southwest: {
        latitude: southwestLatitude,
        longitude: southwestLongitude,
      },
    });
    console.log(
      "🚀 ~ file: MapView.tsx:48 ~ handleRegionChange ~ currentViewport:",
      currentViewport
    );
  };

  return (
    <MapView
      style={styles.map}
      region={{
        latitude: selectedLocation ? selectedLocation.latitude : 0,
        longitude: selectedLocation ? selectedLocation.longitude : 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onRegionChangeComplete={handleRegionChange}
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
