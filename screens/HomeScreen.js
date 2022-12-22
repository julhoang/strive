import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase-config";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";

import CompletedView from "../components/CompletedView";
import ToDoView from "../components/ToDoView";
import { palette } from "../Styles";
import { doc, getDoc, collection, updateDoc } from "firebase/firestore";

const HomeScreen = ({ navigation, route }) => {
  const [habits, setHabits] = useState(undefined);
  const [completed, setCompleted] = useState(undefined);
  const [progress, setProgress] = useState(undefined);
  const [streakCount, setStreakCount] = useState(0);

  useEffect(() => {
    try {
      if (route.params.newHabit) {
        // console.log("coming back and text is: ", route.params.newHabit);
        const habit = route.params.newHabit.activity.toLowerCase();
        let newHabits = { ...habits };
        newHabits[habit] = { ...habits[habit], completed: route.params.newHabit.done };
        setHabits(newHabits);

        // update DB
        const ref = doc(db, "habits", "chosenHabits");
        updateDoc(ref, newHabits);
      }
    } catch (err) {}
  }, [route.params]);

  async function getHabits() {
    const docRef = doc(db, "habits", "chosenHabits");
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("found habits from firebase");
        setHabits(docSnap.data());
      }
    } catch (error) {
      console.log("error loading habits from firebase");
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

  async function getStreakCount() {
    const docRef = doc(db, "habits", "stats");
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("found streak count from firebase");
        setStreakCount(docSnap.data().streakCount);
      }
    } catch (error) {
      console.log("error loading streakCount from firebase");
    }
  }

  useEffect(() => {
    if (habits) {
      getCurrentStatus();
    }
  }, [habits]);

  useEffect(() => {
    console.log("useEffect");
    getHabits();
    getStreakCount();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Today</Text>

          {streakCount ? (
            <View style={styles.badge}>
              <Text style={styles.subTitle}>🔥 {streakCount} Days</Text>
            </View>
          ) : null}
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {completed ? <CompletedView data={completed} /> : null}

          {progress ? <ToDoView data={progress} /> : null}
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
