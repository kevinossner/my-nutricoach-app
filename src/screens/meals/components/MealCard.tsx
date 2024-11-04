import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../../../styles/colors";
import containers from "../../../styles/containers";

export default function MealCard() {
  return (
    <View style={styles.container}>
      <Text style={containers.h2}>Meal 1</Text>
      <Text style={containers.h3}>Description</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 15, // Rounded corners
    padding: 20,
    margin: 10,
    shadowColor: colors.darkPrimary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Shadow for Android
  },
});
