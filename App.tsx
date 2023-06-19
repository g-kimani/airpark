import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import { UserContext } from "./contexts/UserContext";
import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import HomeTabNav from "./Navigation/HomeTabNav";
import { ParkingsContext } from "./contexts/ParkingsContext";
import IndividualParking from "./screens/IndividualParking";
import CitiesParkingList from "./screens/CitiesParkingList";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Chat from "./screens/Chat";
import ManageParking from "./screens/ManageParking";

const Stack = createNativeStackNavigator();

export type NavigationStackParamList = {
  Home: undefined;
  LoginScreen: undefined;
  SignupScreen: undefined;
  Profile: { userid: string } | undefined;
  AddParking: undefined;
  Explore: undefined;
  HomePage: undefined;
  DestinationResults: undefined;
  CitiesParkingList: undefined;
  ManageParking: undefined;
};

export default function App() {
  const [user, setUser] = useState({});
  const [parkings, setParkings] = useState({
    list: [],
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ParkingsContext.Provider value={{ parkings, setParkings }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ title: "Sign In" }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ title: "Create Account" }}
            />
            <Stack.Screen
              name="Home"
              component={HomeTabNav}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="IndividualParking"
              component={IndividualParking}
              options={{
                headerTitle: "",
                headerTransparent: true,
              }}
            />
            <Stack.Screen
              name="ManageParking"
              component={ManageParking}
              options={{ headerTitle: "Manage Parking" }}
            />
            <Stack.Screen
              name="CitiesParkingList"
              component={CitiesParkingList}
              options={{
                headerTitle: () => (
                  <>
                    <MaterialCommunityIcons
                      name="city-variant-outline"
                      size={24}
                      color="black"
                    />
                    <Text style={{ fontSize: 18, marginLeft: 4 }}>City</Text>
                  </>
                ),
              }}
            />
            <Stack.Screen name="Chat" component={Chat} />
          </Stack.Navigator>
        </NavigationContainer>
      </ParkingsContext.Provider>
    </UserContext.Provider>
  );
}
