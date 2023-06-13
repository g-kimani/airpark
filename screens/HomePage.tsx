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

const HomePage = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () =>
    setIsEnabled((previousState) => {
      return !previousState;
    });

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
      host_id: 12,
      price: 10,
      location: "London",
      isBooked: false,
      imgUrl:
        "https://images.pexels.com/photos/1500459/pexels-photo-1500459.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput placeholder="Search for Parking" style={styles.inputText} />
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => {
          navigation.navigate("HomePage");
          toggleSwitch;
        }}
        value={isEnabled}
      />

      <TouchableOpacity onPress={() => {}} style={styles.button}>
        <Text style={styles.buttonText}>List</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Map</Text>
      </TouchableOpacity>

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
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
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
  signUpText: {
    color: "blue",
    fontSize: 16,
  },
  Header: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
