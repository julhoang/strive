import React, { useLayoutEffect } from "react";
import { Button, View, Text, StyleSheet, FlatList } from "react-native";

import { palette } from "../Styles";

export default function DayView() {
  const DATA = [
    {
      id: "Day1",
      date: "Sat",
      day: 11,
    },
    {
      id: "Day2",
      date: "Sun",
      day: 12,
    },
    {
      id: "Day3",
      date: "Mon",
      day: 13,
    },
    {
      id: "Day4",
      date: "Tues",
      day: 14,
    },
    {
      id: "Day5",
      date: "Wed",
      day: 15,
    },
  ];

  const renderItem = ({ item }) => <Item date={item.date} day={item.day} />;

  const Item = ({ date, day }) => (
    <View style={styles.dayWidget}>
      <View>
        <Text style={styles.dayWidgetDate}>{date}</Text>
        <Text style={styles.dayWidgetDay}>{day}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      horizontal={true}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = {
  dayWidget: {
    borderColor: palette.primary,
    margin: 0.5,
    borderWidth: 2,
    flexDirection: "row",
    marginTop: 15,
    marginRight: 15,
    borderRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  dayWidgetDay: {
    color: palette.primary,
    fontSize: 25,
    fontWeight: "500",
    paddingTop: 3,
  },
  dayWidgetDate: {
    color: palette.grey,
  },
};
