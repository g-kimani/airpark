import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../screens/HomePage";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import AddParkingList from "../screens/AddParkingList";

import ProfilePage from "../screens/ProfilePage";

import ExplorePage from "../screens/ExplorePage";
import MyParkings from "../screens/MyParkings";

const Tab = createBottomTabNavigator();

const HomeTabNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Explore"
        component={ExplorePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-compass-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Add Parking"
        component={AddParkingList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="pluscircleo" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="My Parkings"
        component={MyParkings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="book" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={ProfilePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default HomeTabNav;
