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

const Stack = createNativeStackNavigator();

export type NavigationStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  Profile: { userid: string } | undefined;
  AddParking: undefined;
};

export default function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    SecureStore.getItemAsync("auth-token").then((result) => {
      if (result) {
        setUser((user) => {
          return { ...user, token: result };
          // setUser({});
        });
      }
    });
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator>
          {!user.token ? (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ title: "Sign In" }}
              />
              <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{ title: "Create Account" }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={HomeTabNav}
                options={{
                  headerShown: false,
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
