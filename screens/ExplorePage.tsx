import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
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
import DestinationResult from "../Components/DestinationResult";
import { FontAwesome5 } from "@expo/vector-icons";
import ParkingsList from "../Components/ParkingsList.js";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<NavigationStackParamList, "ExplorePage">;

const ExplorePage = ({ navigation }: Props) => {
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 51.50853,
    longitude: -0.12574,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [parkingList, setParkingList] = useState([]);
  const [viewMode, setViewMode] = useState("map");

  useEffect(() => {
    getParkings(selectedLocation).then((parkings) => {
      setParkingList(parkings);
    });
  }, [selectedLocation]);

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "map" ? "list" : "map"));
  };

  const handleParkingPress = (parking) => {
    navigation.navigate("IndividualParking", { parking });
  };

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`flex flex-row p-3 items-center`}>
        <Text style={tw`p-2 text-3xl font-bold`}>Explore</Text>
        <Ionicons name="ios-compass-outline" size={24} />
      </View>
      <View style={tw`flex flex-row p-2`}>
        <HomeSearch
          setSelectedLocation={setSelectedLocation}
          placeholder="Find your spot"
        />
        {selectedLocation && (
          <View>
            <TouchableOpacity onPress={toggleViewMode}>
              <View
                style={tw`flex justify-center items-center bg-white p-4 rounded-md shadow mx-2`}
              >
                <FontAwesome5
                  name={viewMode === "map" ? "list-alt" : "map"}
                  size={24}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <DestinationResult
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        parkingList={parkingList}
        viewMode={viewMode}
      />
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
