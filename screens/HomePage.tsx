import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import parkingsArray from "../data/parkingsArray";
import { NavigationStackParamList } from "./types";
import MapComponent from "../Components/MapView.tsx";
import HomeSearch from "../Components/HomeSearch.tsx";
import { getParkings } from "../utils.js";
import ParkingsList from "../Components/ParkingsList.tsx";
import { ParkingsContext } from "../contexts/ParkingsContext.tsx";

type Props = NativeStackScreenProps<NavigationStackParamList, "HomePage">;

const HomePage = ({ navigation }: Props) => {
  const [viewMode, setViewMode] = useState("list");
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 51.509865,
    longitude: -0.118092,
  });

  const showList = () => {
    setViewMode("list");
  };

  const showMap = () => {
    setViewMode("map");
  };

  const [parkingList, setParkingList] = useState(parkingsArray);
  const [dummydata, setDummydata] = useState(parkingsArray);
  const { parkings, setParkings } = useContext(ParkingsContext);

  useEffect(() => {
    getParkings().then((parkings) => {
      console.log(
        "🚀 ~ file: HomePage.tsx:50 ~ getParkings ~ parkings:",
        parkings
      );
      setParkings((prev: any) => {
        return { list: [...prev.list, ...parkings] };
      });
      setParkingList(parkings);
    });
  }, [selectedLocation]);

  const handlePlacePress = (detail: any) => {
    const geometry = detail.geometry.location;
    setSelectedLocation({ latitude: geometry.lat, longitude: geometry.lng });
  };

  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={styles.searchContainer}>
          <HomeSearch setSelectedLocation={setSelectedLocation} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={showList} style={styles.button}>
            <Text style={styles.buttonText}>List</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={showMap} style={styles.button}>
            <Text style={styles.buttonText}>Map</Text>
          </TouchableOpacity>
        </View>
        {viewMode === "list" ? (
          <ParkingsList parkings={dummydata} />
        ) : (
          <MapComponent
            selectedLocation={selectedLocation}
            parkings={parkings.list}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    // position: "absolute",
  },
  searchContainer: {
    position: "absolute",
    top: 10,
    width: "100%",
    zIndex: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    // marginTop: -100,
    marginBottom: 10,
    position: "relative",
    backgroundColor: "white",
    zIndex: 100,
    position: "relative",
  },
  button: {
    padding: 16,
    backgroundColor: "red",
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: "center",
    width: "100%",
    height: 50,
  },
  inputText: {
    fontSize: 20,
    marginTop: 100,
    height: "50%",
  },
  searchSuggestion: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF2F4",
    height: "100%",
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    color: "black",
    marginRight: 10,
  },
  suggestionText: {
    fontSize: 15,
  },
});

export default HomePage;
