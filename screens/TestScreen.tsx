import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapComponent from "../Components/MapView";

const TestScreen = () => {
  return (
    <View>
      <Text>
        <MapComponent
          selectedLocation={{ latitude: 51.509865, longitude: -0.118092 }}
        />
      </Text>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
