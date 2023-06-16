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

const Stack = createNativeStackNavigator();

export type NavigationStackParamList = {
  Home: undefined;
  LoginScreen: undefined;
  Signup: undefined;
  Profile: { userid: string } | undefined;
  AddParking: undefined;
};

export default function App() {
  const [user, setUser] = useState({});
  const [parkings, setParkings] = useState({
    list: [],
  });
  useEffect(() => {
    SecureStore.getItemAsync("auth-token").then((result) => {
      if (result) {
        setUser((user) => {
          return { ...user, token: result };
        });
      }
    });
  }, []);

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
          </Stack.Navigator>
        </NavigationContainer>
      </ParkingsContext.Provider>
    </UserContext.Provider>
  );
}
