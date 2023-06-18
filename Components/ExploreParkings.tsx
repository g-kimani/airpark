import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { defaultImage } from "../assets/image_not_found.ts";

interface Parking {
  parking_id: number;
  host_id: number;
  price: number;
  area: string;
  isBooked: boolean;
  picture: string;
}

interface Props {
  parkings: Parking[];
}

const ExploreParkings: React.FC<Props> = ({ parkings }) => {
  return (
    <View>
      {parkings.map((item) => (
        <TouchableOpacity style={styles.item} key={item.parking_id}>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={{ uri: item.picture ? item.picture : defaultImage }}
              accessibilityLabel="Parking Image"
            />
            <View style={styles.detailsContainer}>
              <Text style={styles.location}>{item.area}</Text>
              <Text style={styles.price}>£{item.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  container: {
    width: "100%",
  },
  image: {
    width: "100%",
    aspectRatio: 4 / 2,
    resizeMode: "cover",
    borderRadius: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
  },
});

export default ExploreParkings;
