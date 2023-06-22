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

import tw from "twrnc";
import { formatPrice } from "../tools/helpers.js";

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
  setSelectedLocation: any;
}

const ParkingsList: React.FC<Props> = ({ parkings, setSelectedLocation }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const handleParkingPress = (parking: Parking) => {
    navigation.navigate("IndividualParking", { parking });
  };
  const handleLocationExpand = () => {
    setSelectedLocation((prev) => {
      const location = { ...prev };
      location.latitudeDelta += 0.1;
      location.longitudeDelta += 0.1;
      return location;
    });
  };
  return (
    <View style={tw`flex shrink relative`}>
      {parkings.length === 0 ? (
        <View style={styles.noParkingsContainer}>
          <View style={tw`items-center py-10 m-10`}>
            <Text style={tw`text-base text-slate-600 text-center`}>
              No current parkings found here, keep searching!
            </Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={parkings}
          keyExtractor={(item) => item.parking_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ marginHorizontal: 20 }}
              onPress={() => handleParkingPress(item)}
            >
              <View style={tw`bg-white rounded-lg shadow-md my-4`}>
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
                <View
                  style={tw`flex flex-row justify-between items-center p-2`}
                >
                  <Text style={styles.location}>
                    <Text style={tw`text-gray-600`}>Area: </Text>
                    {item.area}
                  </Text>
                  <Text style={styles.price}>
                    <Text style={tw`text-gray-600`}>Price: </Text>
                    {formatPrice(item.price)} /day
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      <View style={tw`flex justify-center items-center bg-transparent w-full`}>
        <TouchableOpacity
          style={tw`bg-white border-indigo-600 border-2 p-2 m-2 flex rounded`}
          onPress={handleLocationExpand}
        >
          <Text style={tw`text-indigo-600 font-semibold`}>
            Search Further Out ?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    width: "100%",
    alignSelf: "center",
  },
  image: {
    width: "100%",
    aspectRatio: 3 / 2,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    display: "flex",
    flexWrap: "wrap",
  },
  price: {
    fontSize: 16,
    marginVertical: 10,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  noParkingsContainer: {
    marginVertical: 60,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
});

export default ParkingsList;
