import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../../../styles/colors";
import containers from "../../../styles/containers";
import { Meal } from "../../../types/MealType";

export default function MealCard({ meal }: { meal: Meal }) {
  return (
    <View style={styles.container}>
      <Text style={containers.h2}>{meal.name}</Text>
      <Text style={containers.h3}>Calories: {meal.calories}</Text>
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
    shadowRadius: 5,
    elevation: 5, // Shadow for Android
  },
});
