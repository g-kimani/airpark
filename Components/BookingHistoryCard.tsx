import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { formatPrice } from "../tools/helpers";
import { Booking, Parking } from "../screens/types";
import { useNavigation } from "@react-navigation/native";
import { getParkingById } from "../utils";
type Props = {
  booking: Booking;
};

const BookingHistoryCard = ({ booking }: Props) => {
  const navigation = useNavigation();
  const [parking, setParking] = useState<Parking>();
  useEffect(() => {
    getParkingById(booking.parking_id).then((parking) => {
      setParking(parking);
    });
  }, [booking]);
  return (
    <View style={tw`w-full bg-white m-2 p-4 rounded`}>
      <View style={tw`flex flex-row justify-between`}>
        <View>
          <Text style={tw`text-sm font-medium leading-6 text-gray-900`}>
            Start - End
          </Text>
          <Text>
            {new Date(booking.booking_start).toLocaleDateString()} -{" "}
            {new Date(booking.booking_end).toLocaleDateString()}
          </Text>
        </View>
        <View style={tw``}>
          <View
            style={tw`p-1 shrink bg-slate-50 border-gray-400 border-2 rounded `}
          >
            <Text style={tw`text-gray-400 uppercase font-bold `}>
              {booking.status}
            </Text>
          </View>
        </View>
      </View>
      <View style={tw`flex flex-row mt-2 justify-between`}>
        <View>
          <View style={tw`mr-3`}>
            <Text style={tw`text-sm font-medium leading-6 text-gray-900 `}>
              Location: <Text>{parking?.area}</Text>
            </Text>
          </View>
          <View>
            <Text style={tw`text-sm font-medium leading-6 text-gray-900 `}>
              Price ({formatPrice(parking?.price)}/day):{" "}
              <Text>{formatPrice(booking.price)}</Text>
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={tw`rounded-md bg-white border-indigo-600 border-2 px-3 py-2 shadow-sm mx-auto`}
            onPress={() => {
              navigation.navigate("IndividualBooking", { booking, parking });
            }}
          >
            <Text style={tw`text-sm font-semibold text-indigo-600`}>
              See More
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BookingHistoryCard;

const styles = StyleSheet.create({});
