import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Booking, Parking } from "./types";
import Geocoder from "react-native-geocoding";
import tw from "twrnc";
import { defaultImage } from "../assets/image_not_found";
import BookingStatus from "../Components/BookingStatus";
import { formatDate, formatPrice, getDaysBetweenDates } from "../tools/helpers";
import BookingForm from "../Components/BookingForm";
type ParamTypes = {
  booking: Booking;
  parking: Parking;
};
Geocoder.init("AIzaSyBhcOAI9R7HKqUD9f-2is268fJza5KZ0G8");

const IndividualBooking = ({ route }) => {
  const { booking, parking }: ParamTypes = route.params;
  const [address, setAddress] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  useEffect(() => {
    const loc = {
      latitude: Number(parking.latitude),
      longitude: Number(parking.longitude),
    };
    Geocoder.from(loc).then((result) => {
      setAddress(result.results[0].formatted_address);
    });
  }, [parking]);
  return (
    <View style={tw`p-4 `}>
      <BookingStatus status={booking.status} />
      <View>
        <Text
          style={tw`text-xl font-semibold leading-6 text-center text-gray-900 my-4`}
        >
          Parking Info
        </Text>
        <View style={tw`flex flex-row`}>
          <View style={tw`flex-shrink`}>
            <Text style={tw`text-sm font-semibold leading-6 text-gray-900`}>
              Location:
            </Text>
            <Text>{address}</Text>
            <Text
              style={tw`text-sm font-semibold leading-6 text-gray-900 mt-2`}
            >
              Description:
            </Text>
            <Text>{parking.description ?? "No Description"}</Text>
            <Text
              style={tw`text-sm font-semibold leading-6 text-gray-900 mt-2`}
            >
              Price <Text style={tw`text-gray-400`}>/day</Text>:
            </Text>
            <Text>{formatPrice(parking.price)}</Text>
          </View>

          <View style={tw`h-200px w-150px`}>
            <Image
              source={{ uri: parking.picture ? parking.picture : defaultImage }}
              style={tw`w-full h-full rounded`}
            />
          </View>
        </View>
      </View>
      <View>
        <Text
          style={tw`text-xl font-semibold leading-6 text-center text-gray-900 my-4`}
        >
          Booking Info
        </Text>
        <View>
          <Text style={tw`text-sm font-semibold leading-6 text-gray-900 mt-2`}>
            Duration:{" "}
            <Text>
              {getDaysBetweenDates(booking.booking_start, booking.booking_end)}{" "}
              Days
            </Text>
          </Text>
          <Text style={tw`text-sm font-semibold leading-6 text-gray-900 mt-2`}>
            Start:
          </Text>
          <Text>{formatDate(booking.booking_start)}</Text>
          <Text style={tw`text-sm font-semibold leading-6 text-gray-900 mt-2`}>
            End:
          </Text>
          <Text>{formatDate(booking.booking_end)}</Text>
          <Text style={tw`text-sm font-semibold leading-6 text-gray-900 mt-2`}>
            Total Price:
          </Text>
          <Text>{formatPrice(booking.price)}</Text>
        </View>
      </View>
      <View style={tw`mt-4`}>
        <TouchableOpacity
          style={tw`rounded-md bg-white border-2 border-indigo-600 px-3 py-2 shadow-sm mx-auto`}
          onPress={() => setFormVisible((prev) => !prev)}
        >
          <Text style={tw`text-sm font-semibold text-indigo-600`}>
            Book Again
          </Text>
        </TouchableOpacity>
        <BookingForm
          parking={parking}
          visible={formVisible}
          setVisible={setFormVisible}
        />
      </View>
    </View>
  );
};

export default IndividualBooking;

const styles = StyleSheet.create({});
