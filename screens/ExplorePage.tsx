import React, { useLayoutEffect, useState, useEffect } from "react";

import { Text, View, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import ExploreCities from "../Components/ExploreCities";
import citiesArray from "../data/citiesArray";
import tw from "twrnc";
import HomeSearch from "../Components/HomeSearch";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import ExploreParkings from "../Components/ExploreParkings";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationStackParamList } from "./types";
import { getParkings } from "../utils.js";
import parkingsArray from "../data/parkingsArray";

type Props = NativeStackScreenProps<NavigationStackParamList, "ExplorePage">;

const ExplorePage = ({ navigation }: Props) => {
  const [selectedLocation, setSelectedLocation] = useState({});
  const [cities, setCities] = useState(citiesArray);
  const [parkingList, setParkingList] = useState([]);
  const [dummyData, setDummyData] = useState(parkingsArray);
  useEffect(() => {
    getParkings().then((parkings) => {
      console.log(
        "🚀 ~ file: HomePage.tsx:50 ~ getParkings ~ parkings:",
        parkings
      );
      setParkingList(parkings);
      setDummyData(dummyData);
    });
  }, [selectedLocation]);

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={styles.header}>
        <Text style={styles.text}>Explore</Text>
        <Ionicons name="ios-compass-outline" size={24} color="black" />
      </View>
      <HomeSearch
        setSelectedLocation={setSelectedLocation}
        placeholder="Find your spot"
      />
      <View>
        <View style={styles.citiesHeader}>
          <Text style={tw`text-gray-500 text-lg ml-2`}>Cities</Text>
          <AntDesign name="arrowright" size={24} color="grey" />
        </View>
        <ScrollView
          contentContainerStyle={styles.citiesScrollViewContent}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {cities.map((item) => (
            <ExploreCities item={item} key={item.location} />
          ))}
        </ScrollView>
        <View style={styles.featuredHeader}>
          <Text style={tw`text-gray-500 text-lg ml-3`}>Low Price</Text>
          <Ionicons name="pricetag-outline" size={24} color="grey" />
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 10,
          }}
        >
          <ExploreParkings parkings={dummyData} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    padding: 5,
    fontWeight: "bold",
  },
  citiesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  citiesScrollViewContent: {
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  featuredHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
});
export default ExplorePage;
