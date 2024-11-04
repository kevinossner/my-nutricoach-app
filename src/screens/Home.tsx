import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors";
import containers from "../styles/containers";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={containers.h1}>Work in Progress...</Text>
      <Text style={containers.h2}>Stay tuned!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
