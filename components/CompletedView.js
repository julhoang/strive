import React, { useLayoutEffect } from "react";
import { Button, View, Text, StyleSheet, FlatList } from "react-native";

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
  },
  card: {
    padding: 20,
    margin: 7,
    borderWidth: 1,
    borderRadius: 15,
    width: "45%",
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
});
