import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { palette } from "../Styles";

import { Feather } from "@expo/vector-icons";

export default function CompletedView() {
  return (
    <View>
      {/* Header */}
      <Text style={styles.sectionHeader}>Habits Completed</Text>

      {/* Widgets */}
      <View style={styles.completedSection}>
        <Widget activity="Running" emoji="🏃‍♂️" goal="for 10 km" />
        <Widget activity="Reading" emoji="📚" goal="for 15 mins" />
        <Widget activity="Coding" emoji="💻" goal="for 30 mins" />
        <Widget activity="Rise Early" emoji="☀️" goal="before 8 AM" />
      </View>
    </View>
  );
}

function Widget({ activity, emoji, goal }) {
  return (
    <View style={styles.card}>
      <View style={styles.checkMark}>
        <Feather name="check-circle" size={24} color="green" />
      </View>

      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.activity}>{activity}</Text>
      <Text style={styles.goal}>{goal}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 7,
    fontWeight: "700",
  },
  completedSection: {
    flexDirection: "row",
    flexWrap: "wrap",
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
