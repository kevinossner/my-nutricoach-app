import { TextStyle } from "react-native";
import colors from "./colors";

export default {
  h1: {
    fontSize: 28,
    color: colors.darkPrimary,
    fontWeight: "700",
    padding: 8,
  } as TextStyle,
  h2: {
    fontSize: 22,
    color: colors.primaryText,
    fontWeight: "600",
    padding: 8,
  } as TextStyle,
  h3: {
    fontSize: 18,
    color: colors.mediumGrey,
    fontWeight: "500",
    padding: 8,
  } as TextStyle,
  primaryText: {
    fontSize: 16,
    color: colors.primaryText,
    padding: 8,
  } as TextStyle,
  secondaryText: {
    fontSize: 14,
    color: colors.mediumGrey,
    padding: 8,
  } as TextStyle,
};
