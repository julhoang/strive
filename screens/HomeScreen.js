import React, { useState, useEffect, useContext } from "react";
import { db, MainDataContext } from "../firebase-config";
import { collection, doc, getDoc } from "firebase/firestore";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";

import CompletedView from "../components/CompletedView";
import ToDoView from "../components/ToDoView";
import { palette } from "../Styles";

const HomeScreen = () => {
  const MainData = useContext(MainDataContext);
  const [completed, setCompleted] = useState();
  const [progress, setProgress] = useState();

  function getCurrentStatus() {
    let completedArr = [];
    let progressArr = [];

    const habits = MainData.habits;

    Object.keys(habits).forEach((habit) => {
      if (habits[habit]["completed"]) {
        completedArr.push(habits[habit]);
      } else {
        progressArr.push(habits[habit]);
      }
    });

    setCompleted(completedArr);
    setProgress(progressArr);
  }

  useEffect(() => {
    if (MainData) {
      getCurrentStatus();
    }
  }, [MainData]);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Today</Text>

          {MainData && (
            <View style={styles.badge}>
              <Text style={styles.subTitle}>🔥 {MainData.streaks.length} Days</Text>
            </View>
          )}
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {completed && <CompletedView data={completed} />}

          {progress && <ToDoView data={progress} />}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    marginHorizontal: 15,
  },
  header: {
    marginHorizontal: 5,
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 5,
  },
  title: {
    color: "black",
    fontWeight: "800",
    fontSize: 30,
    marginTop: 3,
  },
  subTitle: {
    fontSize: 18,
    color: "#EA2300",
    fontWeight: "700",
  },
  badge: {
    borderRadius: 30,
    backgroundColor: "#FFD853",
    padding: 5,
    paddingHorizontal: 10,
  },
});
