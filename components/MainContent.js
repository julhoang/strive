import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainDataContext, MainDataContextProvider } from "../firebase-config";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

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
  const [habits, setHabits] = useState();
  const [streaks, setStreaks] = useState();

  async function getHabits() {
    const docRef = doc(db, "habits", "chosenHabits");
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setHabits(docSnap.data());
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getStreaks() {
    const docRef = doc(db, "habits", "streaks");
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setStreaks(docSnap.data().dates);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("load from Firebase");
    getHabits();
    getStreaks();
  }, []);

  const Tab = createBottomTabNavigator();

  return (
    <>
      {habits && streaks && (
        <MainDataContext.Provider value={{ habits, setHabits, streaks, setStreaks }}>
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
        </MainDataContext.Provider>
      )}
    </>
  );
}

// https://shopify.engineering/5-ways-to-improve-your-react-native-styling-workflow
