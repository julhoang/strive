import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { firebaseConfig } from "./api";
import {
  collection,
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const habitsCollectionRef = collection(db, "habits");

async function addTodayToDB() {
  const today = new Date().toISOString().slice(0, 10);
  const docRef = doc(db, "habits", "streaks");
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      if (!(today in data)) {
        console.log("today not in data");
        data[today] = {
          note: "",
          completed: false,
        };
        updateDoc(docRef, data);
        resetHabits();
      } else {
        console.log("today is already in database");
      }
    }
  } catch (error) {
    console.log("error loading streaks from firebase");
  }
}

async function resetHabits() {
  let arr = [];
  const q = query(habitsCollectionRef, where("completed", "==", true));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((habit) => {
    let habitObj = habit.data();
    const docID = habitObj["activity"].toLowerCase();
    habitObj["completed"] = false;
    arr.push(habitObj);
    console.log(habitObj);

    const ref = doc(db, "habits", docID);
    updateDoc(ref, habitObj);
  });
}

console.log("firebase config js file called");
addTodayToDB();
// resetHabits();
