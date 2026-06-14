import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ScheduleViewingScreen from "../screens/ScheduleViewingScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import ChatDetailScreen from "../screens/ChatDetailScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import SearchScreen from "../screens/SearchScreen";
import PropertyDetailScreen from "../screens/PropertyDetailScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AgentProfileScreen from "../screens/AgentProfileScreen";



import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* AUTH FLOW */}
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />
      
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
      name="ChatDetail"
      component={ChatDetailScreen}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />

      {/* MAIN APP */}
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
      />

      {/* SEARCH SCREEN */}
      <Stack.Screen
        name="Search"
        component={SearchScreen}
      />

      {/* PROPERTY DETAIL */}
      <Stack.Screen
        name="PropertyDetail"
        component={PropertyDetailScreen}
      />

      <Stack.Screen
  name="ScheduleViewing"
  component={ScheduleViewingScreen}
/>

<Stack.Screen
  name="Settings"
  component={SettingsScreen}
/>

<Stack.Screen
  name="AgentProfile"
  component={AgentProfileScreen}
/>

<Stack.Screen
  name="EditProfile"
  component={EditProfileScreen}
/>

<Stack.Screen
  name="Notifications"
  component={NotificationsScreen}
/>
    </Stack.Navigator>
  );
}