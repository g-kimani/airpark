ParkingsList.tsx;
import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";

interface Parking {
  parking_id: number;
  host_id: number;
  price: number;
  location: string;
  isBooked: boolean;
  imgUrl: string;
}

interface Props {
  parkings: Parking[];
}

const ParkingsList: React.FC<Props> = ({ parkings }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={parkings}
        keyExtractor={(item) => item.parking_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image
              style={styles.image}
              source={{
                uri: item.imgUrl,
              }}
            />
            <View style={styles.detailsContainer}>
              <Text style={styles.location}>{item.location}</Text>
              <Text style={styles.price}>£{item.price}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  item: {
    marginVertical: 8,
  },
  image: {
    width: "100%",
    aspectRatio: 3 / 2,
    resizeMode: "cover",
    borderRadius: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default ParkingsList;
