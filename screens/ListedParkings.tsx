import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getParkingsForUser } from "../utils";
import ParkingListing from "../Components/ParkingListing";

const ListedParkings = () => {
  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getParkingsForUser().then((parkings) => {
      console.log(parkings);
      setParkings(parkings);
      setLoading(false);
    });
  }, []);
  if (loading) return <Text>Loading...</Text>;
  return (
    <View>
      {/* <FlatList
        data={parkings}
        renderItem={(item) => <ParkingListing parking={item} />}
          /> */}
      {parkings.map((park) => {
        return <ParkingListing key={park.parking_id} parking={park} />;
      })}
    </View>
  );
};

export default ListedParkings;

const styles = StyleSheet.create({});
