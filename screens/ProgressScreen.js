import React, { useEffect, useState, useContext } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { palette } from "../Styles";
import { Calendar, CalendarList } from "react-native-calendars";
import { db, MainDataContext } from "../firebase-config";

export default function ProgressScreen() {
  const MainData = useContext(MainDataContext);
  const today = new Date().toISOString().slice(0, 10);
  const [clickedDate, setClickedDate] = useState(today);
  const [note, setNote] = useState("");
  const [dates, setDates] = useState({});

  function handleSelectDay(day) {
    if (day.dateString in dates) {
      setNote(dates[day.dateString]["note"]);
    } else {
      setNote("");
    }
    setClickedDate(day.dateString);
  }

  useEffect(() => {
    let datesObj = {};

    let sortedStreaks = MainData.streaks.sort(
      (s1, s2) => Date.parse(s2["date"]) - Date.parse(s1["date"])
    );

    sortedStreaks.map((streak) => {
      datesObj[streak["date"]] = {
        dotColor: "#50cebb",
        note: streak["note"],
      };
    });

    setDates(datesObj);
  }, []);
  /**
   * TODO:
   * Figure how to identify streaks for period view
   */

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Progress</Text>
        </View>
      </SafeAreaView>

      <Calendar
        onDayPress={handleSelectDay}
        initialDate={today}
        pastScrollRange={5}
        futureScrollRange={1}
        pagingEnabled={true}
        scrollEnabled={true}
        horizontal={true}
        theme={styles.calendar}
        disableAllTouchEventsForDisabledDays={true}
        // markingType={"period"}
        style={{ height: 400 }}
        // markedDates={{
        //   "2022-12-15": { marked: true, dotColor: "#50cebb" },
        //   "2022-12-16": { marked: true, dotColor: "#50cebb" },
        //   "2022-12-21": { startingDay: true, color: "#50cebb", textColor: "white" },
        //   "2022-12-22": { color: "#70d7c7", textColor: "white" },
        //   "2022-12-23": { color: "#70d7c7", textColor: "white", marked: true, dotColor: "white" },
        //   "2022-12-24": { color: "#70d7c7", textColor: "white" },
        //   "2022-12-17": { endingDay: true, color: "#50cebb", textColor: "white" },
        // }}
        markedDates={dates}
        enableSwipeMonths={true}
        hideArrows={true}
      />

      <SafeAreaView style={styles.safeArea}>
        <View>
          <Text style={styles.subTitle}>Notes: {clickedDate}</Text>
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
  subTitle: {
    fontSize: 25,
    color: palette.primary,
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
    todayTextColor: palette.primary,
    monthTextColor: palette.primary,
    textSectionTitleColor: "darkgrey",
    textSectionTitleDisabledColor: palette.black,
    textDayFontWeight: "500",
    textDayHeaderFontWeight: "500",
    textMonthFontSize: 25,
    dotColor: "#00adf5",
    indicatorColor: "blue",
    textMonthFontWeight: "800",
    selectedDotColor: "#ffffff",
    todayTextColor: palette.primary,
    "stylesheet.calendar.header": {
      header: {
        alignItems: "flex-start",
      },
    },
  },
});
