import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { palette } from "../Styles";
import { Feather } from "@expo/vector-icons";

export default function Widget(params) {
  const { activity, icon, goal, completed } = params;
  const navigation = useNavigation();
  const onPressFunction = () => {
    navigation.navigate("ActivityModal", {
      ...params,
    });
  };

  return (
    <View style={styles.card}>
      <Pressable onPress={onPressFunction}>
        <View style={styles.checkMark}>
          <Feather
            name="check-circle"
            size={24}
            color={completed ? "green" : "darkgrey"}
          />
        </View>
        <Text style={styles.emoji}>{icon}</Text>
        <Text style={styles.activity}>{activity}</Text>
        <Text style={styles.goal}>{goal}</Text>
      </Pressable>
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
