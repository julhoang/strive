import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { palette } from "../Styles";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default function CompletedView({ data }) {
  let widgets = [];
  data.forEach((habit) => {
    widgets.push(
      <Widget
        key={habit.activity}
        activity={habit.activity}
        emoji={habit.icon}
        goal={habit.goal}
      />
    );
  });
  return (
    <View>
      {/* Header */}
      <Text style={styles.sectionHeader}>Habits Completed</Text>

      {/* Widgets */}
      <View style={styles.completedSection}>
        {widgets}
        {/* <Widget
          activity="Running"
          emoji="🏃‍♂️"
          goal="for 10 km"
        />
        <Widget
          activity="Reading"
          emoji="📚"
          goal="for 15 mins"
        />
        <Widget
          activity="Coding"
          emoji="💻"
          goal="for 30 mins"
        />
        <Widget
          activity="Rise Early"
          emoji="☀️"
          goal="before 8 AM"
        /> */}
      </View>
    </View>
  );
}

function Widget({ activity, emoji, goal }) {
  const navigation = useNavigation(); // help move between screens
  const onPressFunction = () => {
    navigation.navigate("ActivityModal", {
      activity: activity,
      emoji: emoji,
      goal: goal,
      done: true,
    });
  };

  return (
    <View style={styles.card}>
      <Pressable onPress={onPressFunction}>
        <View style={styles.checkMark}>
          <Feather
            name="check-circle"
            size={24}
            color="green"
          />
        </View>

        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.activity}>{activity}</Text>
        <Text style={styles.goal}>{goal}</Text>
      </Pressable>
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
    left: 100,
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
    flex: 1,
  },
});
