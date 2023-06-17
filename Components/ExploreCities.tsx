import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

interface Props {
  item: {
    location: string;
  };
}

const ExploreCities: React.FC<Props> = ({ item }) => {
  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.container}>
        <Text style={styles.location}>{item.location.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 8,
    height: 100,
  },
  container: {
    // aspectRatio: 1,
    backgroundColor: "#EB5E28",
    borderRadius: 10,
    width: 100,
    justifyContent: "center",
    height: 80,
  },

  location: {
    fontSize: 17,
    fontWeight: "bold",
    marginVertical: 10,
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    padding: 10,
    borderRadius: 10,
  },
});

export default ExploreCities;
