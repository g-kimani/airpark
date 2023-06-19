import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ParkingInfo from "../Components/ParkingInfo";
import ParkingBookings from "../Components/ParkingBookings";
const Tab = createMaterialTopTabNavigator();

const ManageParking = ({ route }) => {
  const { parking } = route.params;
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Info"
        component={ParkingInfo}
        initialParams={{ parking }}
      />
      <Tab.Screen
        name="Requests / History"
        component={ParkingBookings}
        initialParams={{ parking }}
      />
    </Tab.Navigator>
  );
};

export default ManageParking;

const styles = StyleSheet.create({});
