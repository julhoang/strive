import React from "react";
import { Button, View, Text, StyleSheet, FlatList } from "react-native";

import { palette } from "../Styles";
import { Feather } from "@expo/vector-icons";

export default function ToDoView() {
  return (
    <View>
      {/* Header */}
      <Text style={styles.sectionHeader}>Habits Completing</Text>

      {/* Widgets */}
      <View style={styles.completedSection}>
        <Widget activity="Meditate" emoji="🧘" goal="for 15 mins" />
        <Widget activity="Healthy Diet" emoji="🥕" goal="All Day" />
        <Widget activity="Journal" emoji="✍️" goal="at 10PM" />
      </View>
    </View>
  );
}

function Widget({ activity, emoji, progress, goal }) {
  return (
    <View style={styles.card}>
      <View style={styles.checkMark}>
        <Feather name="check-circle" size={24} color="darkgrey" />
      </View>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.activity}>{activity}</Text>
      <Text style={styles.goal}>{goal}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontWeight: "700",
    fontSize: 24,
    marginTop: 25,
    marginBottom: 10,
    marginHorizontal: 7,
  },
  completedSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 100,
  },
  card: {
    padding: 20,
    margin: 7,
    borderRadius: 15,
    width: "45%",
    backgroundColor: palette.lightgrey,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 7,
  },
  activity: {
    fontSize: 20,
    fontWeight: "500",
  },
  goal: {
    fontSize: 16,
    fontWeight: "300",
  },
  checkMark: {
    borderRadius: 50,
    // backgroundColor: "#bcf5bc",
    width: 30,
    height: 30,
    position: "absolute",
    top: 10,
    left: 115,
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
    flex: 1,
  },
});
