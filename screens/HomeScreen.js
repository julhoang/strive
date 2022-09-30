import React, { useLayoutEffect } from "react";
import { Button, View, Text, SafeAreaView, StyleSheet, FlatList, ScrollView } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DayView from "../components/DayView";
import CompletedView from "../components/CompletedView";
import ToDoView from "../components/ToDoView";
import { Spacer } from "@react-native-material/core";

const HomeScreen = () => {
  const navigation = useNavigation(); // help move between screens

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Today</Text>
        <Text style={styles.subTitle}>Streaks: 5 Days</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <DayView />
        <CompletedView />
        <ToDoView />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const primary = "#FF713C";
const styles = StyleSheet.create({
  safeArea: {
    marginHorizontal: 15,
  },
  title: {
    color: "black",
    fontWeight: "800",
    fontSize: 30,
    marginTop: 3,
  },
  subTitle: {
    color: "dark-gray",
    fontSize: 14,
  },
  header: {
    marginHorizontal: 5,
  },
  scrollView: {
    marginBottom: 50,
  },
});
