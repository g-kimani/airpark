import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MapView from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";

import Geocoder from "react-native-geocoding";
import { Marker } from "react-native-maps";
import HomeSearch from "../Components/HomeSearch";
import ParkingsList from "../Components/ParkingsList";

const HomePage = () => {
  const navigation = useNavigation();
  const [viewMode, setViewMode] = useState("list"); // Track the current view mode
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 51.509865,
    longitude: -0.118092,
  }); // Track the user's location

  Geocoder.init("AIzaSyBhcOAI9R7HKqUD9f-2is268fJza5KZ0G8"); //  geocoder
  const navigateToMap = () => {
    navigation.navigate("Map");
  };

  const showList = () => {
    setViewMode("list");
  };

  const showMap = () => {
    setViewMode("map");
  };

  const [parkingList, setParkingList] = useState([
    {
      parking_id: 10,
      host_id: 10,
      price: 10,
      location: "London",
      isBooked: false,
      imgUrl:
        "https://images.pexels.com/photos/1500459/pexels-photo-1500459.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      parking_id: 11,
      host_id: 11,
      price: 5,
      location: "Bristol",
      isBooked: false,
      imgUrl:
        "https://www.shutterstock.com/image-photo/empty-space-parking-260nw-332087375.jpg",
    },
    {
      parking_id: 12,
      host_id: 13,
      price: 10,
      location: "Manchester",
      isBooked: false,
      imgUrl:
        "https://images.pexels.com/photos/1500459/pexels-photo-1500459.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      parking_id: 13,
      host_id: 14,
      price: 10,
      location: "London",
      isBooked: false,
      imgUrl:
        "https://images.pexels.com/photos/1500459/pexels-photo-1500459.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      parking_id: 15,
      host_id: 14,
      price: 10,
      location: "Manchester",
      isBooked: false,
      imgUrl:
        "https://images.pexels.com/photos/1500459/pexels-photo-1500459.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ]);
  const [filteredParkingList, setFilteredParkingList] = useState(parkingList);
  const handleSearch = (data, details) => {
    const location = data.description.split(",")[0].trim();

    // Use Geocoder to get latitude and longitude
    Geocoder.from(location)
      .then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        const selectedLocation = { latitude: lat, longitude: lng };
        setSelectedLocation(selectedLocation);

        const filteredList = parkingList.filter((item) =>
          item.location.toLowerCase().includes(location.toLowerCase())
        );
        setFilteredParkingList(filteredList);
      })
      .catch((error) => {
        console.log("Error fetching coordinates:", error);
      });
  };
  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <SafeAreaView style={{ width: "80%" }}>
          <HomeSearch navigation={navigation} />
        </SafeAreaView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={showList} style={styles.button}>
            <Text style={styles.buttonText}>List</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={showMap} style={styles.button}>
            <Text style={styles.buttonText}>Map</Text>
          </TouchableOpacity>
        </View>

        {viewMode === "list" ? (
          <ParkingsList parkings={filteredParkingList} />
        ) : (
          <MapView
            style={styles.map}
            region={{
              latitude: selectedLocation ? selectedLocation.latitude : 0,
              longitude: selectedLocation ? selectedLocation.longitude : 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{ latitude: 51.509865, longitude: -0.118092 }}
            />
          </MapView>
        )}
      </View>
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    marginTop: -100,
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

    height: "50%",
  },
  image: {
    width: 200,
    height: 200,
  },
});
