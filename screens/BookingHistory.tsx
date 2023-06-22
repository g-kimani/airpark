import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { getBookings } from "../utils";
import BookingHistoryCard from "../Components/BookingHistoryCard";
import { Booking } from "./types";
import { sortBookings } from "../tools/helpers";
import { useIsFocused } from "@react-navigation/native";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    getBookings().then(({ bookings }) => {
      bookings = sortBookings(bookings);
      setBookings(bookings);
    });
  }, [isFocused]);
  return (
    <View style={tw`p-4`}>
      <FlatList
        data={bookings}
        renderItem={({ item }) => {
          return <BookingHistoryCard booking={item} />;
        }}
      />
    </View>
  );
};

export default BookingHistory;

const styles = StyleSheet.create({});
