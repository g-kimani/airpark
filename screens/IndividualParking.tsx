import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  Image,
} from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import tw from "twrnc";
import moment from "moment";
import { defaultImage } from "../assets/image_not_found.ts";
import Geocoder from "react-native-geocoding";
import { SafeAreaView } from "react-native-safe-area-context";

Geocoder.init("AIzaSyBhcOAI9R7HKqUD9f-2is268fJza5KZ0G8");
import { Calendar } from "react-native-calendars";
import { postBooking } from "../utils.js";

type Parking = {
  parking_id: number;
  latitude: number;
  longitude: number;
  price: number;
};

type IndividualParkingProps = NativeStackScreenProps<any, "IndividualParking">;

const IndividualParking = ({ route }: IndividualParkingProps) => {
  const { parking } = route.params;
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [addressStr, setAdressStr] = useState("");
  const [markedDates, setMarkedDates] = useState([]);
  const [daysNum, setDaysNum] = useState(1);
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  const toggleModal = () => {
    setShowBookingModal(!showBookingModal);
  };

  useEffect(() => {
    console.log("use individual");
    console.log(parking);
    const loc = {
      latitude: parking.latitude,
      longitude: parking.longitude,
    };
    console.log(loc);
    Geocoder.from(loc).then((result) => {
      console.log(result.results[0]);
      setAdressStr(result.results[0].formatted_address);
    });
  }, [parking]);
  useEffect(() => {
    const start = new Date(selectedStartDate);
    const end = new Date(endDate);
    const time = new Date(end.getTime() - start.getTime()).getTime();
    const days = time / (1000 * 60 * 60 * 24) + 1;
    setDaysNum(days);
    setCalculatedPrice(parking.price * days);
  }, [endDate]);

  const handleBooking = () => {
    const booking = {
      parking_id: parking.parking_id,
      booking_start: selectedStartDate,
      booking_end: endDate,
      price: calculatedPrice,
    };
    postBooking(booking).then(({ booking }) => {
      console.log(
        "🚀 ~ file: IndividualParking.tsx:80 ~ postBooking ~ booking:",
        booking
      );
    });
  };

  return (
    <SafeAreaView style={tw`mt-10`}>
      <View style={styles.container}>
        <View style={styles.parkingCover}>
          <Image
            source={{ uri: parking.picture ? parking.picture : defaultImage }}
            style={styles.image}
          />
          <View style={styles.priceContainer}>
            <Text style={tw`font-bold my-2`}>
              £{parking.price}
              <Text style={tw`text-gray-400`}> /day</Text>
            </Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Entypo name="location-pin" size={20} color="red" />
          <Text style={tw`text-2xl font-bold`}>{addressStr}</Text>
          <Text
            style={tw`text-sm font-medium underline leading-6 text-gray-900 mt-4`}
          >
            Extra info:
          </Text>
          <View style={[styles.description, tw`shadow`]}>
            <Text style={tw`text-base text-gray-500`}>
              {parking.description}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={tw`rounded-md bg-white border-2 border-indigo-600 px-3 py-2 shadow-sm mx-auto`}
          onPress={toggleModal}
        >
          <Text style={tw`text-sm font-semibold text-indigo-600`}>
            Reserve Spot
          </Text>
        </TouchableOpacity>

        <Modal
          visible={showBookingModal}
          animationType="slide"
          transparent
          onRequestClose={() => {
            setShowBookingModal(!showBookingModal);
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
                <Text style={tw`text-sm font-semibold text-red-600`}>
                  Cancel
                </Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  parkingCover: {
    position: "relative",
    width: "100%",
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 15,
  },
  priceContainer: {
    position: "absolute",
    bottom: 5,
    right: 5,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30,
    marginVertical: 10,
    marginLeft: 5,
    borderRadius: 8,
    backgroundColor: "white",
    padding: 8,
  },
  infoContainer: {
    // marginVertical: 10,
    padding: 16,
  },
  description: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    height: 120,
    maxHeight: 120,
  },
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
