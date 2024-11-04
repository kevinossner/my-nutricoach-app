import { ViewStyle } from "react-native";
import colors from "./colors";

export default {
  roundedButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: colors.darkPrimary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  } as ViewStyle,
};
