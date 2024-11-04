import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  BottomTabBarButtonProps,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import buttons from "./src/styles/buttons";

import colors from "./src/styles/colors";
import Home from "./src/screens/Home";
import Ionicons from "@expo/vector-icons/Ionicons";
import MealsScreen from "./src/screens/meals/MealsScreen";

export default function App() {
  const Tab = createBottomTabNavigator();
  function EmptyScreen() {
    return null;
  }

  const ChatButton: React.FC<BottomTabBarButtonProps> = () => {
    return (
      <TouchableOpacity
        style={styles.middleButton}
        onPress={() => Alert.alert("AI Coach", "Work in progress...")}
      >
        <Ionicons name="chatbubble-ellipses" size={24} color={colors.white} />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.safeArea} />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Meals") {
                iconName = focused ? "fast-food" : "fast-food-outline";
              } else {
                iconName = "help";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.darkGrey,
            tabBarStyle: { backgroundColor: colors.white },
          })}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Chat"
            component={EmptyScreen}
            options={{
              tabBarButton: (props) => <ChatButton {...props} />,
            }}
          />
          <Tab.Screen
            name="Meals"
            component={MealsScreen}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
  },
  middleButton: {
    ...buttons.roundedButton,
    top: -20,
  },
});
