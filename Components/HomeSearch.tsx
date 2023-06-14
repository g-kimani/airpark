import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import parkingsArray from "../data/parkingsArray";
import { Feather } from "@expo/vector-icons";
import {
  GooglePlaceData,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";

const HomeSearch = ({ onPlaceSelected }) => {
  const handlePlaceSelected = (data, details) => {
    const { description } = data;
    onPlaceSelected(description);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <GooglePlacesAutocomplete
          placeholder="Where to?"
          onPress={handlePlaceSelected}
          fetchDetails={true}
          query={{
            key: "AIzaSyBhcOAI9R7HKqUD9f-2is268fJza5KZ0G8",
            language: "en",
          }}
          styles={styles.inputText}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={styles.searchSuggestion}>
                <View style={styles.iconContainer}>
                  <Feather name="map-pin" size={30} />
                </View>
                <Text style={styles.suggestionText}>{item.description}</Text>
              </View>
            </TouchableOpacity>
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: "center",
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
