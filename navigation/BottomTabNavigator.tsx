import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../theme/ThemeContext";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MessagesScreen from "../screens/MessagesScreen";
import SavedScreen from "../screens/SavedScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const { colors, isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: isDark ? "#64748B" : "#94A3B8",

        tabBarStyle: {
          position: "absolute",
          height: Platform.OS === "ios" ? 88 : 72,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.cardBg,
          paddingTop: 8,
          paddingBottom: Platform.OS === "ios" ? 28 : 12,
          elevation: 10,
          shadowColor: "#0F172A",
          shadowOffset: { width: 0, height: -6 },
          shadowOpacity: isDark ? 0.15 : 0.03,
          shadowRadius: 12,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
          marginTop: 2,
        },

        tabBarIcon: ({ color, size, focused }) => {
          let iconName: any;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;

            case "Search":
              iconName = focused ? "search" : "search-outline";
              break;

            case "Saved":
              iconName = focused ? "heart" : "heart-outline";
              break;

            case "Messages":
              iconName = focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline";
              break;

            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;

            default:
              iconName = "ellipse";
          }

          return (
            <View style={styles.iconContainer}>
              {focused && (
                <View style={[styles.activeDotIndicator, { backgroundColor: colors.primary }]} />
              )}
              <Ionicons
                name={iconName}
                size={22}
                color={color}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
      />

      <Tab.Screen
        name="Saved"
        component={SavedScreen}
      />

      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: 30,
    width: 40,
  },
  activeDotIndicator: {
    position: "absolute",
    top: -8,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});