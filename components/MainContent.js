import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import ProgressScreen from "../screens/ProgressScreen";
import ProfileScreen from "../screens/ProfileScreen";

import { Feather } from "@expo/vector-icons";

const screenOptions = ({ route }) => {
  return {
    headerShown: false,
    tabBarIcon: ({ focused }) => {
      let iconName;
      let color = focused ? "red" : "black";

      if (route.name === "Home") {
        iconName = "home";
      } else if (route.name === "Profile") {
        iconName = "user";
      } else if (route.name === "Progress") {
        iconName = "trending-up";
      }
      return (
        <Feather
          name={iconName}
          size={24}
          color={color}
        />
      );
    },
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray",
  };
};

export default function MainContent() {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Group screenOptions={screenOptions}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Home" }}
          />
          <Tab.Screen
            name="Progress"
            component={ProgressScreen}
            options={{ title: "Progress" }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: "Profile" }}
          />
        </Tab.Group>
      </Tab.Navigator>
    </>
  );
}

// https://shopify.engineering/5-ways-to-improve-your-react-native-styling-workflow
