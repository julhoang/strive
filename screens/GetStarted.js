import React from "react";
import { Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { palette } from "../Styles";

function GetStarted() {
  const navigation = useNavigation(); // help move between screens

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.logo}>Strive</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("MainContent", { screen: "Home" })}
      >
        <Text style={styles.text}>Get Started</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    marginHorizontal: 15,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "700",
    fontSize: 70,
    fontStyle: "italic",
    color: palette.primary,
    position: "absolute",
    top: "45%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: palette.black,
    width: "90%",
    position: "absolute",
    bottom: 90,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default GetStarted;
