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
import { useNavigation } from "@react-navigation/native";
import BookingForm from "../Components/BookingForm.tsx";
import { formatPrice } from "../tools/helpers.js";

type Parking = {
  parking_id: number;
  latitude: number;
  longitude: number;
  price: number;
};

type IndividualParkingProps = NativeStackScreenProps<any, "IndividualParking">;

const IndividualParking = ({ route }: IndividualParkingProps) => {
  const { parking } = route.params;
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [addressStr, setAdressStr] = useState("");

  const toggleModal = () => {
    setShowBookingModal(!showBookingModal);
  };

  useEffect(() => {
    const loc = {
      latitude: parking.latitude,
      longitude: parking.longitude,
    };
    Geocoder.from(loc).then((result) => {
      setAdressStr(result.results[0].formatted_address.split(",")[0]);
    });
  }, [parking]);

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
              {formatPrice(parking.price)}
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
        <BookingForm
          visible={showBookingModal}
          setVisible={setShowBookingModal}
          parking={parking}
        />
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
