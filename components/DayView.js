import React, { useLayoutEffect } from "react";
import { Button, View, Text, StyleSheet, FlatList } from "react-native";

import { palette } from "../Styles";

const streakCount = 3;
const weekday = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

export default function DayView() {
  const todayDate = new Date().getDate(); // 0 - 30
  const todayDay = new Date().getDay(); // 0 - 6
  var DATA = [];

  // set up Streaks
  for (let i = 0; i < streakCount; i++) {
    var date = new Date();
    date.setDate(todayDate - streakCount + i);
    if (date.getDate() <= 9) {
      date = "0" + date.getDate().toString(); // format string
    } else {
      date = date.getDate().toString();
    }

    DATA.push({
      id: "day-" + i,
      date: date,
      day: weekday[(todayDay - streakCount + i) % 7],
      type: "streak",
    });
  }

  let todayDateString = todayDate < 9 ? "0" + todayDate.toString() : todayDate.toString();
  // set up Today
  DATA.push({
    id: "today",
    date: todayDateString,
    day: weekday[todayDay],
    type: "today",
  });

  // set up the next 4 days
  for (let i = 1; i < 3; i++) {
    var date = new Date();
    date.setDate(todayDate + +i);
    if (date.getDate() <= 9) {
      date = "0" + date.getDate().toString();
    } else {
      date = date.getDate().toString();
    }

    DATA.push({
      id: "day-" + (streakCount + i),
      date: date,
      day: weekday[(todayDay + i) % 7],
      type: "inActive",
    });
  }

  const renderItem = ({ item }) => <Item type={item.type} date={item.date} day={item.day} />;

  return (
    // <FlatList
    //   horizontal={true}
    //   data={DATA}
    //   renderItem={renderItem}
    //   keyExtractor={(item) => item.id}
    //   showsHorizontalScrollIndicator={false}
    // />
    <View>
      {DATA.forEach((item) => {
        return <Item type={item.type} date={item.date} day={item.day} />;
      })}
    </View>
  );
}

function Item({ date, day, type }) {
  return (
    <View>
      <View style={styles.dayCard}>
        <Text style={styles.dayWidgetDay}>{day}</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.divider} />
      </View>

      <View style={styles.dayCard}>
        <View style={styles.dateBorder}>
          <Text style={styles.dayWidgetDate}>{date}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = {
  dayCard: {
    margin: 0,
    // borderWidth: 0.5,
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  dayWidgetDay: {
    color: palette.grey,
  },
  dayWidgetDate: {
    fontSize: 16,
    fontWeight: "500",
    margin: "0 auto",
    padding: 7,
    color: palette.white,
  },
  dateBorder: {
    borderRadius: 80,
    backgroundColor: palette.primary,
  },
  divider: {
    borderWidth: 0.25,
    borderBottomColor: palette.grey,
    flex: 1,
    height: 2,
    marginTop: 2,
    marginBottom: 5,
    marginRight: 0.85,
  },
};
