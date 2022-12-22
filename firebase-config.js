import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { firebaseConfig } from "./api";
import { collection, doc, updateDoc, deleteDoc } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const booksCollectionRef = collection(db, "habits");
