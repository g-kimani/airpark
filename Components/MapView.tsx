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
    latitudeDelta: number;
    longitudeDelta: number;
  };
  parkings: any[];
  setSelectedLocation: any;
};

const MapComponent = ({
  selectedLocation,
  parkings,
  setSelectedLocation,
}: Props) => {
  const navigation = useNavigation();
  const [currentViewport, setCurrentViewport] = useState({});

  const handleRegionChange = (region: Region, details: Details) => {
    setSelectedLocation(region);
  };

  return (
    <MapView
      style={styles.map}
      region={selectedLocation}
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
