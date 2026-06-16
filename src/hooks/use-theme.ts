import { useColorScheme } from "react-native";
import { Colors } from "@/constants/theme";

export function useTheme() {
  const scheme = useColorScheme();

  const isDark = scheme === "dark";

  return {
    scheme,
    isDark,
    colors: isDark ? Colors.dark : Colors.light,
  };
}