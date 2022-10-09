import React, { useLayoutEffect } from "react";
import { Button, View, Text, SafeAreaView, StyleSheet, FlatList, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { palette } from "../Styles";

export default function ProgressScreen() {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Progress</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

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
});
