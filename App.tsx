import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import HomePage from "./screens/HomePage";
import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import Profile from "./screens/Profile";
import MapView from "./Components/MapView";
import { UserContext } from "./contexts/UserContext";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import AddParkingList from "./screens/AddParkingList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeTabNav from "./Navigation/HomeTabNav";

const Stack = createNativeStackNavigator();

export type NavigationStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  Profile: { userid: string } | undefined;
  AddParking: undefined;
};

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       <NavigationContainer>
//         {!user.token ? (
//           <Stack.Navigator>
//             <Stack.Screen
//               name="Login"
//               component={LoginScreen}
//               options={{ title: "Sign In" }}
//             />
//             <Stack.Screen
//               name="Signup"
//               component={SignupScreen}
//               options={{ title: "Create Account" }}
//             />
//           </Stack.Navigator>
//         ) : (
//           <Tab.Navigator>
//             <Tab.Screen name="Home" component={HomeStackScreen} />
//             <Tab.Screen name="Profile" component={ProfileStackScreen} />
//             <Tab.Screen name="AddParking" component={AddParkingStackScreen} />
//           </Tab.Navigator>
//         )}
//       </NavigationContainer>
//     </UserContext.Provider>
//   );
// }

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
        {!user.token ? (
          <Stack.Navigator>
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
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeTabNav}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </UserContext.Provider>
  );
}
