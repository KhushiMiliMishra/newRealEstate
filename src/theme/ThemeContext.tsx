import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors, ThemeColors } from "@/constants/theme";

type ThemeType = "light" | "dark";

type ThemeContextType = {
  theme: ThemeType;
  colors: ThemeColors;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (t: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: any) => {
  const system = useColorScheme();

  const [theme, setThemeState] = useState<ThemeType>(
    system === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("theme");

      if (saved === "light" || saved === "dark") {
        setThemeState(saved);
      } else {
        setThemeState(system === "dark" ? "dark" : "light");
      }
    })();
  }, [system]);

  const setTheme = async (t: ThemeType) => {
    setThemeState(t);
    await AsyncStorage.setItem("theme", t);
  };

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
  };

  const value: ThemeContextType = {
    theme,
    colors: theme === "dark" ? Colors.dark : Colors.light,
    isDark: theme === "dark",
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
};