import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import MealCard from "./components/MealCard";
import colors from "../../styles/colors";
import buttons from "../../styles/buttons";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import { Meal } from "../../types/MealType";
import { useIsFocused } from "@react-navigation/native";

export default function MealsScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraIsOpen, setCameraIsOpen] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      setCameraIsOpen(false);
    }
  }, [isFocused]);

  const handleBarCodeScanned = ({ type, data }: BarcodeScanningResult) => {
    setCameraIsOpen(false);
    const url = `https://world.openfoodfacts.org/api/v3/product/${data}.json`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return new Promise<number | null>((resolve) => {
          Alert.prompt(
            "Amount",
            `Enter amount in ${data.product.product_quantity_unit || "units"}`,
            [
              {
                text: "Cancel",
                onPress: () => resolve(null),
                style: "cancel",
              },
              {
                text: "OK",
                onPress: (quantity?: string) => {
                  if (quantity !== undefined && !isNaN(Number(quantity))) {
                    resolve(Number(quantity));
                  } else {
                    resolve(null);
                  }
                },
              },
            ],
            "plain-text"
          );
        }).then((quantity) => {
          if (quantity !== null) {
            const newMeal = {
              name: data.product.product_name,
              calories: Number(
                (
                  (data.product.nutriments["energy-kcal_100g"] / 100) *
                  quantity
                ).toFixed(1)
              ),
              carbs: Number(
                (
                  (data.product.nutriments["carbohydrates_100g"] / 100) *
                  quantity
                ).toFixed(1)
              ),
              proteins: Number(
                (
                  (data.product.nutriments["proteins_100g"] / 100) *
                  quantity
                ).toFixed(1)
              ),
              fats: Number(
                (
                  (data.product.nutriments["fat_100g"] / 100) *
                  quantity
                ).toFixed(1)
              ),
            };
            setMeals((prevMeals) => [...prevMeals, newMeal]);
          } else {
            Alert.alert("Ungültige Menge", "Bitte gib eine gültige Menge an.");
          }
        });
      })
      .catch((error) => {
        Alert.alert("Error", `${error}`);
      });
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.grantPermission}>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  if (cameraIsOpen) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          barcodeScannerSettings={{
            barcodeTypes: ["ean8", "ean13"],
          }}
          onBarcodeScanned={handleBarCodeScanned}
        />

        {/* Close button overlay */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setCameraIsOpen(false)}
        >
          <Ionicons name="close" size={32} color={colors.lightGrey} />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {}}>
            <MealCard meal={item} />
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setCameraIsOpen(!cameraIsOpen)}
      >
        <Ionicons name="add" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  addButton: {
    ...buttons.roundedButton,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  grantPermission: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
