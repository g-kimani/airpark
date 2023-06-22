import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { Calendar } from "react-native-calendars";
import { Parking } from "../screens/types";
import { postBooking } from "../utils";
import { useNavigation } from "@react-navigation/native";
import { formatPrice } from "../tools/helpers";
import CalendarPicker from "./CalendarPicker";

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
  const [submitDisbaled, setSubmitDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const start = new Date(selectedStartDate);
    const end = new Date(endDate);
    const time = new Date(end.getTime() - start.getTime()).getTime();
    const days = time / (1000 * 60 * 60 * 24) + 1;
    setDaysNum(days);
    setCalculatedPrice(Number((parking.price * days).toFixed(2)));
    setSubmitDisabled(selectedStartDate === "" || endDate === "");
  }, [selectedStartDate, endDate]);

  const handleBooking = () => {
    setIsLoading(true);
    const booking = {
      parking_id: parking.parking_id,
      booking_start: selectedStartDate,
      booking_end: endDate,
      price: calculatedPrice,
    };
    postBooking(booking).then(({ booking }) => {
      setIsLoading(false);

      navigation.navigate("My Parkings");
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
              {selectedStartDate
                ? endDate
                  ? "Book Now!"
                  : "Select End Date"
                : "Select Start Date"}
            </Text>
            <TouchableOpacity
              style={tw`rounded-md bg-white border-2 border-red-600 px-3 py-2 shadow-sm `}
              onPress={toggleModal}
            >
              <Text style={tw`text-sm font-semibold text-red-600`}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <CalendarPicker
            startDate={selectedStartDate}
            endDate={endDate}
            setStart={setSelectedStartDate}
            setEnd={setEndDate}
          />
          <View style={tw`flex flex-row w-full items-center justify-between`}>
            <View>
              <Text style={tw`font-bold my-2`}>
                {formatPrice(calculatedPrice)}
              </Text>
              <Text style={tw`text-gray-400`}>
                @ {formatPrice(parking.price)} / day
              </Text>
            </View>
            <Text>
              {daysNum ? daysNum : "~"}
              <Text style={tw`text-gray-400`}> days</Text>
            </Text>

            <TouchableOpacity
              style={tw`flex rounded-md bg-white items-center border-2 border-${
                submitDisbaled ? "gray-500" : "indigo-600"
              } px-3 py-2 shadow-sm `}
              onPress={handleBooking}
              disabled={submitDisbaled || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={submitDisbaled ? "gray" : "indigo"} />
              ) : (
                <Text
                  style={tw`text-sm font-semibold text-${
                    submitDisbaled ? "gray-500" : "indigo-600"
                  }`}
                >
                  Book Now
                </Text>
              )}
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
