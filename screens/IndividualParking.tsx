import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  Image,
  SafeAreaView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import tw from "twrnc";
import moment from "moment";
import { defaultImage } from "../assets/image_not_found.ts";

import { Calendar } from "react-native-calendars";

type Parking = {
  parking_id: number;
  latitude: number;
  longitude: number;
  price: number;
};

type IndividualParkingProps = NativeStackScreenProps<any, "IndividualParking">;

const IndividualParking = ({ route }: IndividualParkingProps) => {
  const { parking } = route.params;
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [endDate, setEndDate] = useState(null);

  const toggleModal = () => {
    setShowCalendar(!showCalendar);
  };

  const handleBooking = () => {};

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={{ uri: parking.picture ? parking.picture : defaultImage }}
          style={styles.image}
        />
        <View style={styles.locationContainer}>
          <Entypo name="location-pin" size={40} color="red" />
          <Text style={tw`text-2xl font-bold`}>{parking.area}</Text>
        </View>
        <Text style={tw`text-xl text-gray-500 my-2 `}>
          {parking.description}
        </Text>
        <View style={styles.priceContainer}>
          <FontAwesome5 name="pound-sign" size={28} color="#ff8500" />
          <Text style={styles.price}>{parking.price}</Text>
        </View>

        <View style={{ margin: 20 }}>
          <Button title="Select Dates" onPress={toggleModal} />
          <Modal visible={showCalendar} animationType="slide">
            <View style={styles.calendarContainer}>
              <Calendar
                style={{
                  marginTop: 20,
                }}
                current={moment().format("YYYY-MM-DD")}
                minDate={moment().format("YYYY-MM-DD")}
                maxDate={moment().add(2, "months").format("YYYY-MM-DD")}
                onDayPress={(day) => {
                  if (selectedStartDate) {
                    setEndDate(day.dateString);
                    setShowCalendar(false);
                  } else {
                    setSelectedStartDate(day.dateString);
                  }
                }}
                markedDates={{
                  [selectedStartDate]: {
                    selected: true,
                    startingDay: true,
                    color: "green",
                  },
                  [endDate]: { selected: true, color: "green" },
                }}
              />
              {selectedStartDate && endDate && (
                <TouchableOpacity
                  onPress={() => {
                    setShowCalendar(false);
                  }}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Confirm</Text>
                </TouchableOpacity>
              )}
            </View>
          </Modal>
          {selectedStartDate && endDate && (
            <Text style={styles.selectedDateText}>
              {moment(selectedStartDate).format("D")}-
              {moment(endDate).format("D MMM")}
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={tw`rounded-md bg-indigo-600 px-5 py-4 shadow-sm m-6 mx-auto`}
          onPress={handleBooking}
        >
          <Text style={tw`text-sm font-semibold text-white`}>Reserve Spot</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  image: {
    width: "100%",
    height: "50%",
    resizeMode: "cover",
    borderRadius: 15,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginLeft: -5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    fontSize: 30,
    marginVertical: 10,
    marginLeft: 5,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 6,
  },
  calendarContainer: {
    flex: 1,
    marginTop: 20,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: "center",
    padding: 10,
    backgroundColor: "lightgray",
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  selectedDateText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default IndividualParking;
