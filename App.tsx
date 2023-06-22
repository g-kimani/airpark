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
import ManageParking from "./screens/ManageParking";
import { SafeAreaProvider } from "react-native-safe-area-context";
import IndividualBooking from "./screens/IndividualBooking";

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
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false, title: "Sign In" }}
              />
              <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{ headerShown: false, title: "Sign Up" }}
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
                name="IndividualBooking"
                component={IndividualBooking}
              />
              <Stack.Screen
                name="ManageParking"
                component={ManageParking}
                options={{ headerTitle: "Manage Parking" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </ParkingsContext.Provider>
    </UserContext.Provider>
  );
}
