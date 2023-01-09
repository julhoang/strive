import React, { useEffect, useState, useContext } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput } from "react-native";
import { palette } from "../Styles";
import { Calendar } from "react-native-calendars";
import { db } from "../firebase-config";
import { doc, getDoc, collection, updateDoc } from "firebase/firestore";

export default function ProgressScreen({ navigation }) {
  const [streaks, setStreaks] = useState(undefined);
  const today = new Date().toISOString().slice(0, 10);
  const [clickedDate, setClickedDate] = useState(today);
  const [note, setNote] = useState("");
  const [stats, setStats] = useState(1);

  async function getStreaks() {
    const docRef = doc(db, "habits", "streaks");
    console.log(today);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let data = docSnap.data();
        console.log(data);
        Object.keys(data).map((key) => {
          data[key] = {
            ...data[key],
            selected: data[key]["completed"],
            selectedColor: palette.yellow,
          };
        });

        if (today in data) {
          if (data[today]["completed"] == false) {
            delete data[today]["selectedColor"];
          }
        }

        setStreaks(data);
      }
    } catch (error) {
      console.log("error loading STREAKS from firebase");
      console.log(error);
    }
  }

  async function getStreakCount() {
    const docRef = doc(db, "habits", "stats");
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setStats(docSnap.data());
      }
    } catch (error) {
      console.log("error loading STATS from firebase");
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("useeffect for progress");
    getStreaks();
    getStreakCount();
  }, []);

  function handleSelectDay(day) {
    if (day.dateString in streaks) {
      setNote(streaks[day.dateString]["note"] + streaks[day.dateString]["completed"]);
    } else {
      setNote("");
    }
    setClickedDate(day.dateString);
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Progress</Text>
        </View>

        <View style={styles.header}>
          <View style={styles.card}>
            <Text style={styles.statsHeader}> Record</Text>
            <Text style={styles.statsData}>🔥 {stats ? stats.max : 1} Days</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.statsHeader}>Current</Text>
            <Text style={styles.statsData}>🔥 {stats ? stats.current : 1} Days</Text>
          </View>
        </View>
      </SafeAreaView>

      <Calendar
        onDayPress={handleSelectDay}
        initialDate={today}
        pagingEnabled={true}
        scrollEnabled={true}
        horizontal={true}
        theme={styles.calendar}
        disableAllTouchEventsForDisabledDays={true}
        style={{ alignSelf: "center", width: "95%" }}
        calendarWidth={360}
        markedDates={streaks}
        enableSwipeMonths={true}
        hideArrows={true}
      />

      <SafeAreaView style={styles.safeArea}>
        <View>
          <Text style={styles.sectionHeader}>Notes: {clickedDate}</Text>
          <Text>{note}</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    marginHorizontal: 20,
  },
  header: {
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
  badge: {
    borderRadius: 30,
    backgroundColor: palette.yellow,
    padding: 5,
    paddingHorizontal: 10,
  },
  subTitle: {
    fontSize: 18,
    color: "#EA2300",
    fontWeight: "700",
  },
  sectionHeader: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 7,
    fontWeight: "700",
  },
  day: {
    borderColor: "gray",
    borderWidth: 1,
    width: 50,
    height: 50,
    margin: 7,
  },
  calendar: {
    calendarBackground: palette.white,
    monthTextColor: palette.black,
    textSectionTitleColor: "darkgrey",
    textSectionTitleDisabledColor: palette.black,
    textDayFontWeight: "500",
    textDayHeaderFontWeight: "500",
    textMonthFontSize: 25,
    textMonthFontWeight: "800",
    todayTextColor: "black",
    indicatorColor: "green",
    selectedDayTextColor: palette.black,
    "stylesheet.calendar.header": {
      header: {
        alignItems: "flex-start",
      },
    },
    borderWidth: 2,
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
