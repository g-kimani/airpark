import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MapView from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";

import Geocoder from "react-native-geocoding";
import { Marker } from "react-native-maps";
import parkingsArray from "../data/parkingsArray";
import { NavigationStackParamList } from "./types";
import MapComponent from "../Components/MapView.tsx";
import HomeSearch from "../Components/HomeSearch.tsx";
import { getParkings } from "../utils.js";

type Props = NativeStackScreenProps<NavigationStackParamList, "HomePage">;

const HomePage = ({ navigation }: Props) => {
  const [viewMode, setViewMode] = useState("list");
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 51.509865,
    longitude: -0.118092,
  });

  Geocoder.init("AIzaSyBhcOAI9R7HKqUD9f-2is268fJza5KZ0G8");
  const navigateToMap = () => {
    navigation.navigate("Map");
  };

  const showList = () => {
    setViewMode("list");
  };

  const showMap = () => {
    setViewMode("map");
  };

  const [parkingList, setParkingList] = useState(parkingsArray);

  useEffect(() => {
    getParkings().then(({ parkings }) => {
      setParkingList(parkings);
    });
  }, [selectedLocation]);

  const handleSearch = (description: string) => {
    const location = description;

    Geocoder.from(location)
      .then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        const selectedLocation = { latitude: lat, longitude: lng };
        setSelectedLocation(selectedLocation);

        // const filteredList = parkingList.filter((item) =>
        //   item.location.toLowerCase().includes(location.toLowerCase())
        // );
        // setParkingList(filteredList);
      })
      .catch((error) => {
        console.log("Error fetching coordinates:", error);
      });
  };
  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <HomeSearch onPlaceSelected={handleSearch} />
        {/* <SafeAreaView style={{ width: "80%" }}>
          <View style={styles.searchSuggestion}>
            <GooglePlacesAutocomplete
              placeholder="Search"
              onPress={handleSearch}
              query={{
                key: "AIzaSyBhcOAI9R7HKqUD9f-2is268fJza5KZ0G8",
                language: "en",
              }}
            />
          </View>
        </SafeAreaView> */}

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={showList} style={styles.button}>
            <Text style={styles.buttonText}>List</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={showMap} style={styles.button}>
            <Text style={styles.buttonText}>Map</Text>
          </TouchableOpacity>
        </View>

        {viewMode === "list" ? (
          <FlatList
            data={parkingList}
            renderItem={({ item }) => (
              <View>
                <Text>{item.price}</Text>
                <Text>{item.location}</Text>
                <Image source={{ uri: item.imgUrl }} style={styles.image} />
              </View>
            )}
            keyExtractor={(item) => item.parking_id.toString()}
          />
        ) : (
          <MapComponent
            selectedLocation={selectedLocation}
            parkings={parkingList}
          />
        )}
      </View>
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    // marginTop: -100,
    marginBottom: 10,
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
  inputText: {
    padding: 16,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    margin: 10,
    width: "60%",
  },
  map: {
    width: "100%",
    height: 200,
  },
  searchSuggestion: {
    padding: 5,
    // height: "50%",
    backgroundColor: "red",
  },
  image: {
    width: 200,
    height: 200,
  },
});
