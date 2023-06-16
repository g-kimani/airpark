import React from "react";
import { Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Parking = {
  // Define the type for the parking object
  parking_id: number;
  latitude: number;
  longitude: number;
  price: number;
  // Include any other properties of the parking object
  // that you want to access and display
};

type IndividualParkingProps = NativeStackScreenProps<any, "IndividualParking">;

const IndividualParking = ({ route }: IndividualParkingProps) => {
  // Access the parking object from the route parameter
  const { parking } = route.params;

  // Render the parking information
  return (
    <Text>
      Individual Parking:
      {"\n"}
      Parking ID: {parking.parking_id}
      {"\n"}
      Host ID: {parking.host_id}
      {"\n"}
      Latitude: {parking.latitude}
      {"\n"}
      Longitude: {parking.longitude}
      {"\n"}
      Price: {parking.price}
      {"\n"}
      Area: {parking.area}
      {"\n"}
      Availability: {parking.is_booked}
      {/* Render additional information as needed */}
    </Text>
  );
};

export default IndividualParking;
