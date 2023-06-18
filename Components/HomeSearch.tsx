import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  GooglePlaceData,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";

type Props = {
  placeholder: string;
  setSelectedLocation: any;
};

const HomeSearch = ({ setSelectedLocation, placeholder }: Props) => {
  const handlePlacePress = (data: GooglePlaceData, detail: GooglePlaceData) => {
    const area = detail.address_components.find((comp: any) =>
      comp.types?.some((type: any) => type === "postal_town")
    );

    const geometry = detail.geometry.location;
    setSelectedLocation({
      latitude: geometry.lat,
      longitude: geometry.lng,
      area: area.long_name,
    });
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
          debounce={200}
          enablePoweredByContainer={false}
          minLength={2}
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
    flex: 0,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "left",
    width: "100%",
    // padding: 10,
    // marginTop: 20,
  },
  inputText: {
    textInput: {
      fontSize: 16,
      fontWeight: "700",
      backgroundColor: "#f8f9fa",
    },
  },
  searchSuggestion: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
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
    flexWrap: "wrap",
  },
});

export default HomeSearch;
