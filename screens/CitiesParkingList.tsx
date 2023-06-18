import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ParkingsList from "../Components/ParkingsList";
import { SafeAreaView } from "react-native-safe-area-context";
import { getParkings } from "../utils.js";
import { useState } from "react";

const CitiesParkingList = () => {
  const [parkingList, setParkingList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    getParkings().then((parkings) => {
      setParkingList(parkings);
    });
  }, [selectedLocation]);

  return (
    <SafeAreaView>
      <ParkingsList parkings={parkingList} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default CitiesParkingList;
