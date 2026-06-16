import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../theme/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function SettingsScreen({ navigation }: any) {
  const { colors, isDark, toggleTheme } = useTheme();
  const { logout } = useAuth();

  const [notifications, setNotifications] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          logout();
          navigation.replace("Login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <ScrollView contentContainerStyle={styles.scroll}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.backBtn, { backgroundColor: colors.surface }]}
          >
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </TouchableOpacity>

          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Settings
          </Text>

          <View style={{ width: 40 }} />
        </View>

        {/* ACCOUNT */}
        <Text style={[styles.sectionTitle, { color: colors.mutedText }]}>
          Account Settings
        </Text>

        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <MenuItem icon="person-outline" title="Edit Profile" colors={colors} />
          <Divider colors={colors} />
          <MenuItem icon="lock-closed-outline" title="Change Password" colors={colors} />
          <Divider colors={colors} />
          <MenuItem icon="shield-checkmark-outline" title="Privacy" colors={colors} />
        </View>

        {/* PREFERENCES */}
        <Text style={[styles.sectionTitle, { color: colors.mutedText }]}>
          Preferences
        </Text>

        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <ToggleItem
            icon="moon-outline"
            title="Dark Mode"
            value={isDark}
            onValueChange={toggleTheme}
            colors={colors}
          />
          <Divider colors={colors} />

          <ToggleItem
            icon="notifications-outline"
            title="Notifications"
            value={notifications}
            onValueChange={setNotifications}
            colors={colors}
          />
          <Divider colors={colors} />

          <ToggleItem
            icon="location-outline"
            title="Location"
            value={locationEnabled}
            onValueChange={setLocationEnabled}
            colors={colors}
          />
        </View>

        {/* SUPPORT */}
        <Text style={[styles.sectionTitle, { color: colors.mutedText }]}>
          Support
        </Text>

        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <MenuItem icon="help-circle-outline" title="Help Center" colors={colors} />
          <Divider colors={colors} />
          <MenuItem icon="document-text-outline" title="Terms" colors={colors} />
          <Divider colors={colors} />
          <MenuItem icon="information-circle-outline" title="Version v1.0.0" colors={colors} />
        </View>

        {/* LOGOUT */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- MENU ITEM ---------------- */
function MenuItem({ icon, title, colors }: any) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.row}>
        <Ionicons name={icon} size={20} color={colors.mutedText} />
        <Text style={[styles.menuText, { color: colors.text }]}>{title}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color={colors.mutedText} />
    </TouchableOpacity>
  );
}

/* ---------------- TOGGLE ITEM ---------------- */
function ToggleItem({ icon, title, value, onValueChange, colors }: any) {
  return (
    <View style={styles.menuItem}>
      <View style={styles.row}>
        <Ionicons name={icon} size={20} color={colors.mutedText} />
        <Text style={[styles.menuText, { color: colors.text }]}>{title}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: colors.border,
          true: colors.primary,
        }}
        thumbColor={value ? colors.accent : "#fff"}
      />
    </View>
  );
}

/* ---------------- DIVIDER ---------------- */
function Divider({ colors }: any) {
  return (
    <View
      style={{
        height: 1,
        marginHorizontal: 12,
        backgroundColor: colors.border,
      }}
    />
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1 },

  scroll: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
  },

  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },

  card: {
    borderRadius: 14,
    paddingVertical: 6,
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 14,
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuText: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: "600",
  },

  logoutButton: {
    marginTop: 25,
    backgroundColor: "#EF4444",
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
  },
});