import React, { useState, useEffect } from "react";
import { db, habitsCollectionRef } from "../firebase-config";
import { doc, getDocs, updateDoc, query, where, getDoc } from "firebase/firestore";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, LayoutAnimation } from "react-native";

import Celebration from "../components/Celebration";

import CompletedView from "../components/CompletedView";
import ToDoView from "../components/ToDoView";
import { palette } from "../Styles";

const HomeScreen = ({ navigation, route }) => {
  const [completed, setCompleted] = useState(undefined);
  const [progress, setProgress] = useState(undefined);
  const [current, setCurrent] = useState(0);
  const [record, setRecord] = useState(0);

  // use LayoutAnimation to smoothly transition the all the cards
  LayoutAnimation.configureNext({
    create: {
      type: LayoutAnimation.Types.spring,
      duration: 10,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      duration: 1000,
      type: LayoutAnimation.Types.easeInOut,
    },
  });

  useEffect(() => {
    try {
      if (route.params.newHabit) {
        // update DB
        const ref = doc(db, "habits", route.params.newHabit.activity.toLowerCase());
        updateDoc(ref, route.params.newHabit);

        let addVal = completed.length + (route.params.newHabit["completed"] ? 1 : -1);
        updateDBStats(addVal == 7);

        if (addVal !== 7) {
          getDataFromFirebase();
        }
      }
    } catch (err) {}
  }, [route.params]);

  async function getStreakCount() {
    const docRef = doc(db, "habits", "stats");
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCurrent(Number(docSnap.data().current));
        setRecord(Number(docSnap.data().max));
      }
    } catch (error) {
      console.log("error loading streakCount from firebase");
      console.log(error);
    }
  }

  async function getCompleted() {
    let completedArr = [];
    const q = query(habitsCollectionRef, where("completed", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      completedArr.push(doc.data());
    });

    setCompleted(completedArr);
  }

  async function getInProgress() {
    let progressArr = [];
    const q = query(habitsCollectionRef, where("completed", "==", false));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      progressArr.push(doc.data());
    });

    setProgress(progressArr);
  }

  async function updateDBStats(addValue) {
    console.log("updateDB get called");
    const ref = doc(db, "habits", "stats");
    const today = new Date().toISOString().slice(0, 10);
    const docSnap = await getDoc(ref);
    let currentStats = {};

    // get current stats
    if (docSnap.exists()) {
      currentStats = docSnap.data();
    }

    // if today has not make a streak
    if (currentStats.currentDate !== today && addValue) {
      currentStats.current += 1;
      setCurrent((prev) => prev + 1);
      console.log("new current: ", currentStats);
      if (currentStats.current > currentStats.max) {
        currentStats.max = currentStats.current;
        setRecord(currentStats.max);
      }

      currentStats.currentDate = today;
      updateDoc(ref, currentStats).then(getDataFromFirebase);
      console.log("from updateDBStats");
    } else if (addValue == false && currentStats.currentDate == today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      let previousDay = yesterday.toISOString().slice(0, 10);
      currentStats.current -= 1;
      currentStats.currentDate = previousDay;

      setCurrent((prev) => prev - 1);

      console.log("new current: ", currentStats);

      if (currentStats.maxDate == today) {
        currentStats.max -= 1;
        currentStats.maxDate = previousDay;
        setRecord(currentStats.max);
      }

      updateDoc(ref, currentStats).then(getDataFromFirebase);
      console.log("from updateDBStats");
    }
  }

  async function getDataFromFirebase() {
    console.log("loading from firebase");
    getStreakCount();
    getCompleted();
    getInProgress();
  }

  useEffect(() => {
    getDataFromFirebase();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Today</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {current || record ? (
            <View style={styles.header}>
              <View style={styles.card}>
                <Text style={styles.statsHeader}> Record</Text>
                <Text style={styles.statsData}>🔥 {record} Days</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.statsHeader}>Current</Text>
                <Text style={styles.statsData}>🔥 {current} Days</Text>
              </View>
            </View>
          ) : null}
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
  card: {
    paddingVertical: 10,
    margin: 7,
    borderRadius: 15,
    width: "45%",
    backgroundColor: palette.lightgrey,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FFD853",
    borderWidth: 3,
  },
  statsHeader: {
    fontSize: 16,
    fontWeight: "500",
    paddingBottom: 10,
  },
  statsData: {
    fontSize: 25,
    fontWeight: "600",
    justifyContent: "center", //Centered horizontally
    color: palette.primary,
  },
});
