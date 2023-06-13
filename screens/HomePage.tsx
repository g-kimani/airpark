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

const HomePage = ({ navigation }) => {
  const [viewMode, setViewMode] = useState("list"); // Track the current view mode

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
      parking_id: 10,
      host_id: 10,
      price: 10,
      location: "London",
      isBooked: false,
      imgUrl:
        "https://images.pexels.com/photos/1500459/pexels-photo-1500459.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      parking_id: 10,
      host_id: 10,
      price: 10,
      location: "London",
      isBooked: false,
      imgUrl:
        "https://images.pexels.com/photos/1500459/pexels-photo-1500459.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    // ... more parking items
  ]);

  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TextInput placeholder="Search for Parking" style={styles.inputText} />

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
                <Image
                  source={{ uri: item.imgUrl }}
                  style={{ width: 200, height: 200 }}
                />
              </View>
            )}
            keyExtractor={(item) => item.host_id.toString()}
          />
        ) : (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          /> // Replace with your map component
        )}
      </View>
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
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
});
