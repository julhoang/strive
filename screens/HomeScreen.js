import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, doc, getDoc } from "firebase/firestore";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";

import CompletedView from "../components/CompletedView";
import ToDoView from "../components/ToDoView";
import { palette } from "../Styles";

const HomeScreen = () => {
  const [habits, setHabits] = useState();
  const [streaks, setStreaks] = useState();
  const [completed, setCompleted] = useState();
  const [progress, setProgress] = useState();

  async function getChosenHabits() {
    const docRef = doc(db, "habits", "chosenHabits");
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setHabits(docSnap.data());
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getStreaks() {
    const docRef = doc(db, "habits", "streaks");
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setStreaks(docSnap.data().dates);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function getCurrentStatus() {
    let completedArr = [];
    let progressArr = [];

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
    if (habits) {
      getCurrentStatus();
    }
  }, [habits]);

  useEffect(() => {
    console.log("load from Firebase");
    getChosenHabits();
    getStreaks();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Today</Text>

          {streaks && (
            <View style={styles.badge}>
              <Text style={styles.subTitle}>🔥 {streaks.length} Days</Text>
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
