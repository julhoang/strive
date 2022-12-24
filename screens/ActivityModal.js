import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { palette } from "../Styles";
import { db } from "../firebase-config";

export default function ActivityModal({ navigation, route }) {
  const { activity, icon, goal, completed, progress, needCounter } = route.params;

  function toggleCompletion() {
    // console.log(!completed);
    navigation.navigate({
      name: "Home",
      params: { newHabit: { ...route.params, completed: !completed } },
      merge: true,
    });
  }

  return (
    <View style={styles.modal}>
      <Text style={styles.emoji}>{icon}</Text>
      <Text style={styles.activity}>{activity}</Text>
      <Text style={styles.goal}>{goal}</Text>
      {/* <Text>{completed ? "Congrats you have reach your goal!" : "You can do this!"}</Text> */}
      <Pressable
        style={styles.actionBtn}
        onPress={toggleCompletion}
      >
        <Text style={styles.message}>Mark As {completed ? "Not completed" : "completed"}</Text>
      </Pressable>
      <Pressable
        style={styles.closeBtn}
        onPress={() => navigation.goBack()}
      >
        <Feather
          name="x-circle"
          size={40}
          color={palette.grey}
        />
      </Pressable>
    </View>
  );
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
  actionBtn: {
    backgroundColor: palette.primary,
    borderRadius: 100,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
  },
  message: {
    fontSize: 20,
    fontWeight: "500",
  },
});
