import React, { useState, useEffect } from "react";
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

import * as Location from "expo-location";

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
  const [currentViewport, setCurrentViewport] = useState<Region>({});
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          // Handle permission denied
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setCurrentViewport({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        console.log("Error getting current location:", error);
      }
    })();
  }, []);

  const handleRegionChange = (region: Region, details: Details) => {
    setSelectedLocation(region);
  };

  return (
    <MapView
      style={styles.map}
      region={selectedLocation}
      onRegionChangeComplete={handleRegionChange}
    >
      {currentViewport && (
        <Marker
          coordinate={{
            latitude: currentViewport.latitude,
            longitude: currentViewport.longitude,
          }}
          title="You are here!"
          description="Your current location"
          pinColor="blue"
        />
      )}
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
