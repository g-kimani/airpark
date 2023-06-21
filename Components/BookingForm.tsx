import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { Parking } from "../screens/types";
import { postBooking } from "../utils";
import { useNavigation } from "@react-navigation/native";

type Props = {
  visible: boolean;
  setVisible: any;
  parking: Parking;
};
const BookingForm = ({ visible, setVisible, parking }: Props) => {
  const toggleModal = () => {
    setVisible((prev: boolean) => !prev);
  };
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [daysNum, setDaysNum] = useState(1);
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    const start = new Date(selectedStartDate);
    const end = new Date(endDate);
    const time = new Date(end.getTime() - start.getTime()).getTime();
    const days = time / (1000 * 60 * 60 * 24) + 1;
    setDaysNum(days);
    setCalculatedPrice(Number((parking.price * days).toFixed(2)));
  }, [endDate]);

  const handleBooking = () => {
    const booking = {
      parking_id: parking.parking_id,
      booking_start: selectedStartDate,
      booking_end: endDate,
      price: calculatedPrice,
    };
    postBooking(booking).then(({ booking }) => {
      navigation.navigate("MyParkings");
    });
  };
  return (
    <View>
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={() => {
          setVisible(!visible);
        }}
      >
        <View style={styles.calendarContainer}>
          <View style={tw`w-full flex flex-row items-end justify-between `}>
            <Text style={tw`text-base uppercase font-semibold `}>
              Select days
            </Text>
            <TouchableOpacity
              style={tw`rounded-md bg-white border-2 border-red-600 px-3 py-2 shadow-sm `}
              onPress={toggleModal}
            >
              <Text style={tw`text-sm font-semibold text-red-600`}>Cancel</Text>
            </TouchableOpacity>
          </View>
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
          <View style={tw`flex flex-row w-full items-center justify-between`}>
            <View>
              <Text style={tw`font-bold my-2`}>£{calculatedPrice}</Text>
              <Text style={tw`text-gray-400`}>@ £{parking.price} / day</Text>
            </View>
            <Text>
              {daysNum}
              <Text style={tw`text-gray-400`}> days</Text>
            </Text>

            <TouchableOpacity
              style={tw`flex rounded-md bg-white items-center border-2 border-indigo-600 px-3 py-2 shadow-sm `}
              onPress={handleBooking}
            >
              <Text style={tw`text-sm font-semibold text-indigo-600`}>
                Book Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BookingForm;

const styles = StyleSheet.create({
  calendarContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    left: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
