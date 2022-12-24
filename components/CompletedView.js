import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { palette } from "../Styles";

import Widget from "./Widget";

export default function CompletedView({ data }) {
  let widgets = [];
  data.forEach((habit) => {
    widgets.push(
      <Widget
        key={habit.activity}
        {...habit}
      />
    );
  });
  return (
    <View>
      <Text style={styles.sectionHeader}>Habits Completed</Text>
      <View style={styles.completedSection}>{widgets}</View>
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
    width: 30,
    height: 30,
    position: "absolute",
    top: -10,
    right: -10,
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
    flex: 1,
  },
});
