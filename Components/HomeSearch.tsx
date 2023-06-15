import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  GooglePlaceData,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";

type Props = {
  onPlaceSelected: any;
  placeholder: string;
};

const HomeSearch = ({
  onPlaceSelected,
  setSelectedLocation,
  placeholder,
}: Props) => {
  const handlePlacePress = (data: GooglePlaceData, detail: GooglePlaceData) => {
    console.log(
      "!!!!!!!!!!!!!!!!!!!!",
      detail,

      "LOCATION~!~~~~~~~~~~~~~",
      detail.geometry.location, //
      "VIEWPORT~~~~~~~~~~: ",
      detail.geometry.viewport
    );
    const geometry = detail.geometry.location;
    setSelectedLocation({ latitude: geometry.lat, longitude: geometry.lng });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <GooglePlacesAutocomplete
          placeholder={placeholder}
          fetchDetails
          query={{
            key: "AIzaSyBhcOAI9R7HKqUD9f-2is268fJza5KZ0G8",
            language: "en",
            components: "country:uk",
          }}
          onPress={handlePlacePress}
          styles={styles.inputText}
          renderRow={(data: GooglePlaceData) => (
            <View style={styles.searchSuggestion}>
              <View style={styles.iconContainer}>
                <Feather name="map-pin" size={30} />
              </View>
              <Text style={styles.suggestionText}>{data.description}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: "center",
    width: "100%",
    marginTop: 20,
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

export default HomeSearch;
