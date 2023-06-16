import React, { useState } from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Calendar from "react-native-calendar-range-picker";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";

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
  const [selected, setSelected] = useState("");
  const [showCalendar, setShowCalendar] = React.useState(false);
  const toggleModal = () => {
    setShowCalendar(!showCalendar);
  };
  const handleBooking = () => {};

  // Render the parking information
  return (
    <>
      <Text>
        Individual Parking:
        {"\n"}
        Parking ID: {parking.parking_id}
        {"\n"}
        Host ID: {parking.host_id}
        {"\n"}
        Price: {parking.price}
        {"\n"}
        Area: {parking.area}
        {"\n"}
        Availability: {parking.is_booked}
        {/* Render additional information as needed */}
      </Text>

      <View style={{ margin: 20 }}>
        <Button title="Select Dates" onPress={toggleModal} />
        <View style={styles.container}>
          <Modal visible={showCalendar} animationType="slide">
            <Calendar
              startDate={new Date()}
              endDate
              scrollToToday
              scrollable={true}
              onChange={({ startDate, endDate }) => {
                if (startDate && endDate) {
                  setShowCalendar(false);
                }
              }}
            />
          </Modal>
        </View>
      </View>
      <TouchableOpacity style={styles.Button} onPress={handleBooking}>
        <Text style={styles.ButtonText}>Book the space</Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  ButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  Button: {
    padding: 12,
    backgroundColor: "blue",
    borderRadius: 10,
    margin: 5,
    width: "50%",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "yellow",
    padding: 10,

    width: "100%",
  },
});
export default IndividualParking;
