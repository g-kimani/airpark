import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { getBookings } from "../utils";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BookingHistory from "./BookingHistory";
import ListedParkings from "./ListedParkings";

const Tab = createMaterialTopTabNavigator();

const MyParkings = () => {
  return (
    <Tab.Navigator onAnimatedValueUpdate={() => {}}>
      <Tab.Screen name="Booking History" component={BookingHistory} />
      <Tab.Screen name="Listed Parkings" component={ListedParkings} />
    </Tab.Navigator>
  );
};

export default MyParkings;

const styles = StyleSheet.create({});
