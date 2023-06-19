import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getParkingsForUser } from "../utils";
import ParkingListing from "../Components/ParkingListing";

const ListedParkings = () => {
  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getParkingsForUser().then((parkings) => {
      setParkings(parkings);
      setLoading(false);
    });
  }, []);
  if (loading) return <Text>Loading...</Text>;
  return (
    <View>
      <FlatList
        data={parkings}
        renderItem={({ item }) => {
          return <ParkingListing parking={item} />;
        }}
        keyExtractor={(item) => item.parking_id}
      />
    </View>
  );
};

export default ListedParkings;

const styles = StyleSheet.create({});
