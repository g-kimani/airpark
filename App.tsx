import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import HomePage from "./screens/HomePage";
import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import MapView from "./Components/MapView";
import { UserContext } from "./contexts/UserContext";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const Stack = createNativeStackNavigator<NavigationStackParamList>();

type NavigationStackParamList = {
  HomePage: undefined;
  Login: undefined;
  Signup: undefined;
  Profile: { userid: "string" } | undefined;
  navigate: {};
};
export default function App() {
  const [user, setUser] = useState({});
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
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="HomePage" component={HomePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
