import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { defaultImage } from "../assets/image_not_found.ts";
import { useNavigation } from "@react-navigation/native";

interface Parking {
  parking_id: number;
  host_id: number;
  price: number;
  location: string;
  isBooked: boolean;
  picture: string;
}

interface Props {
  parkings: Parking[];
}

const ParkingsList: React.FC<Props> = ({ parkings }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const handleParkingPress = (parking: Parking) => {
    navigation.navigate("IndividualParking", { parking });
  };
  return (

    <View style={styles.container}>
      <FlatList
        data={parkings}
        keyExtractor={(item) => item.parking_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={{margin:20}} onPress={() => handleParkingPress(item)}>
            <View style={styles.item}>
              {isLoading && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="red" />
                  <Text style={styles.loadingText}>Image is loading...</Text>
                </View>
              )}
              <Image
                style={styles.image}
                source={{ uri: item.picture ? item.picture : defaultImage }}
                accessibilityLabel="Parking Image"
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
              />
              <View style={styles.detailsContainer}>
                <Text style={styles.location}>{item.area}</Text>
                <Text style={styles.price}>£{item.price}</Text>
              </View>

           
          </View>
        </TouchableOpacity>
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
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
});

export default ParkingsList;
