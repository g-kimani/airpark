import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./screens/HomePage";
import SignupScreen from "./screens/SignupScreen";
import LogIn from "./screens/Login";

type NavigationStackParamList = {
  // provide the props that are needed for a route, undefined if no props
  Login: undefined;

  Signup: undefined;
  HomePage: undefined;
  // example of props and types | undefined means props optional
  Profile: { userid: "string" } | undefined;
};

const Stack = createNativeStackNavigator<NavigationStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LogIn} />

        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="HomePage" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
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
