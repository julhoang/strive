import React, { useLayoutEffect } from "react";
import { Button, View, Text, StyleSheet, FlatList } from "react-native";

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
    marginBottom: 50,
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
