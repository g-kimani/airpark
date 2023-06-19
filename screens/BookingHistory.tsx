import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { getBookings } from "../utils";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    getBookings().then(({ bookings }) => {
      setBookings(bookings);
    });
  }, []);
  return (
    <View style={tw`p-4`}>
      <Text style={tw`text-2xl font-bold leading-7 text-gray-900`}>
        Bookings
      </Text>
      {bookings.map((bk) => {
        return (
          <View
            key={bk.booking_id}
            style={tw`bg-white shadow-sm rounded p-8 my-4`}
          >
            <Text>Booking ID#: {bk.booking_id}</Text>
            <Text>£{bk.price}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default BookingHistory;

const styles = StyleSheet.create({});
