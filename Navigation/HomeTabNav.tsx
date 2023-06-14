import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../screens/HomePage";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Profile from "../screens/Profile";
import AddParkingList from "../screens/AddParkingList";
import Inbox from "../screens/Inbox";

const Tab = createBottomTabNavigator();

const HomeTabNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Explore"
        component={HomePage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
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
        name="Messages"
        component={Inbox}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default HomeTabNav;
