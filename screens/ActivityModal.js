import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { palette } from "../Styles";

export default function ActivityModal({ navigation, route }) {
  const { activity, emoji, goal, done } = route.params;

  if (done) {
    return (
      <View style={styles.modal}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.activity}>{activity}</Text>
        <Text style={styles.goal}>{goal}</Text>
        <Text>Congrats you have reach your goal!</Text>

        <Pressable style={styles.closeBtn} onPress={() => navigation.goBack()}>
          <Feather name="x-circle" size={40} color={palette.grey} />
        </Pressable>
      </View>
    );
  } else {
    return (
      <View style={styles.modal}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.activity}>{activity}</Text>
        <Text style={styles.goal}>{goal}</Text>
        <Text>You can do this!</Text>

        <Pressable style={styles.closeBtn} onPress={() => navigation.goBack()}>
          <Feather name="x-circle" size={40} color={palette.grey} />
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 80,
    position: "absolute",
    top: 50,
  },
  activity: {
    fontSize: 40,
    fontWeight: "500",
    position: "absolute",
    top: 150,
  },
  goal: {
    fontSize: 20,
    fontWeight: "300",
    position: "absolute",
    top: 200,
    color: palette.grey,
  },
  closeBtn: {
    position: "absolute",
    bottom: 50,
  },
});
