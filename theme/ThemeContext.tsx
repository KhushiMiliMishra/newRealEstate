import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightColors, darkColors } from "./colors";

type ThemeType = "light" | "dark";

interface ThemeContextData {
  theme: ThemeType;
  colors: typeof lightColors;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextData>({
  theme: "light",
  colors: lightColors,
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = useColorScheme();
  const [theme, setThemeState] = useState<ThemeType>("light");

  useEffect(() => {
    // Load persisted theme preference on mount
    const loadPersistedTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("user-theme");
        if (savedTheme === "light" || savedTheme === "dark") {
          setThemeState(savedTheme);
        } else if (systemScheme === "light" || systemScheme === "dark") {
          setThemeState(systemScheme);
        }
      } catch (error) {
        console.warn("Failed to load persisted theme", error);
      }
    };
    loadPersistedTheme();
  }, [systemScheme]);

  const toggleTheme = async () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setThemeState(nextTheme);
    try {
      await AsyncStorage.setItem("user-theme", nextTheme);
    } catch (error) {
      console.warn("Failed to persist theme choice", error);
    }
  };

  const setTheme = async (selectedTheme: ThemeType) => {
    setThemeState(selectedTheme);
    try {
      await AsyncStorage.setItem("user-theme", selectedTheme);
    } catch (error) {
      console.warn("Failed to persist theme choice", error);
    }
  };

  const activeColors = theme === "dark" ? darkColors : lightColors;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors: activeColors,
        isDark: theme === "dark",
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
