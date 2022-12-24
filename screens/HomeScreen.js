import React, { useState, useEffect, useRef } from "react";
import { db, habitsCollectionRef } from "../firebase-config";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";

import CompletedView from "../components/CompletedView";
import ToDoView from "../components/ToDoView";
import { palette } from "../Styles";
import { doc, getDocs, updateDoc, query, where, getDoc } from "firebase/firestore";

const HomeScreen = ({ navigation, route }) => {
  const [completed, setCompleted] = useState(undefined);
  const [progress, setProgress] = useState(undefined);
  const [streakCount, setStreakCount] = useState(0);

  useEffect(() => {
    try {
      if (route.params.newHabit) {
        // update DB
        const ref = doc(db, "habits", route.params.newHabit.activity.toLowerCase());
        updateDoc(ref, route.params.newHabit);

        // reload page
        getDataFromFirebase();
      }
    } catch (err) {}
  }, [route.params]);

  async function getStreakCount() {
    const docRef = doc(db, "habits", "stats");
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setStreakCount(docSnap.data().streakCount);
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

  async function getDataFromFirebase() {
    console.log("loading form firebase");
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
