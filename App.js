import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActivityModal from "./screens/ActivityModal";
// import MainContent from "./components/MainContent";
import HomeScreen from "./screens/HomeScreen";
import GetStarted from "./screens/GetStarted";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="GetStarted"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Group>
          {/* Screens */}
          <Stack.Screen
            name="GetStarted"
            component={GetStarted}
          />
          {/* <Stack.Screen
            name="MainContent"
            component={MainContent}
            options={{ title: "MainContent" }}
          /> */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Home" }}
          />
        </Stack.Group>

        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name="ActivityModal"
            component={ActivityModal}
          ></Stack.Screen>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
