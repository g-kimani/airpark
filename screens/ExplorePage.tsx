import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import tw from "twrnc";
import HomeSearch from "../Components/HomeSearch";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationStackParamList } from "./types";
import { getParkings } from "../utils.js";
import DestinationResult from "../Components/DestinationResult";
import { FontAwesome5 } from "@expo/vector-icons";
import ParkingsList from "../Components/ParkingsList.js";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";

type Props = NativeStackScreenProps<NavigationStackParamList, "ExplorePage">;

const ExplorePage = ({ navigation }: Props) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [parkingList, setParkingList] = useState([]);
  const [viewMode, setViewMode] = useState("map");

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setSelectedLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        console.log("Error getting current location:", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      getParkings(selectedLocation).then((parkings) => {
        setParkingList(parkings);
      });
    }
  }, [selectedLocation]);
  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "map" ? "list" : "map"));
  };

  const handleParkingPress = (parking) => {
    navigation.navigate("IndividualParking", { parking });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={tw`bg-white h-full`}>
        <View style={tw`flex flex-row p-3 items-center`}>
          <Text style={tw`p-2 text-3xl font-bold`}>Explore</Text>
          <Ionicons name="ios-compass-outline" size={24} />
        </View>
        <View style={tw`flex flex-row p-2`}>
          <HomeSearch
            setSelectedLocation={setSelectedLocation}
            placeholder="Find your next parking spot"
          />
          {selectedLocation && (
            <View>
              <TouchableOpacity onPress={toggleViewMode}>
                <View
                  style={tw`flex justify-center items-center bg-[#257bf0] p-2.5 rounded-md shadow mx-2`}
                >
                  <FontAwesome5
                    name={viewMode === "map" ? "list-alt" : "map"}
                    size={24}
                    color="white"
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.resultsContainer}>
          <DestinationResult
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            parkingList={parkingList}
            viewMode={viewMode}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  resultsContainer: {
    height: "100%",
  },
});

export default ExplorePage;
