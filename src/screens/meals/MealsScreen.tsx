import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import MealCard from "./components/MealCard";
import colors from "../../styles/colors";

export default function MealsScreen() {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <FlatList
      data={data}
      renderItem={({ item: index }) => (
        <TouchableOpacity onPress={() => console.log(index)}>
          <MealCard />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
