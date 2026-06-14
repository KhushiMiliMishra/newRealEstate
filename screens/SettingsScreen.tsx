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
  const { colors, theme, isDark, toggleTheme } = useTheme();
  const { logout } = useAuth();
  
  const [notifications, setNotifications] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out of PropVault?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Logout", 
        style: "destructive",
        onPress: () => {
          logout();
          navigation.replace("Login");
        } 
      }
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons
              name="arrow-back"
              size={22}
              color={colors.text}
            />
          </TouchableOpacity>

          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Settings
          </Text>

          <View style={{ width: 40 }} />
        </View>

        {/* ACCOUNT SECTION */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Account Settings
        </Text>

        <View style={[styles.sectionCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <MenuItem
            icon="person-outline"
            title="Edit Preferences"
            colors={colors}
            onPress={() => navigation.navigate("EditProfile")}
          />
          <View style={[styles.itemDivider, { backgroundColor: colors.border }]} />
          
          <MenuItem
            icon="lock-closed-outline"
            title="Change Password"
            colors={colors}
            onPress={() => Alert.alert("Change Password", "Security password reset link will be sent to your registered email.")}
          />
          <View style={[styles.itemDivider, { backgroundColor: colors.border }]} />

          <MenuItem
            icon="shield-checkmark-outline"
            title="Privacy Settings"
            colors={colors}
          />
        </View>

        {/* PREFERENCES SECTION */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Preferences
        </Text>

        <View style={[styles.sectionCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <ToggleItem
            icon="moon-outline"
            title="Dark Mode"
            value={isDark}
            onValueChange={toggleTheme}
            colors={colors}
          />
          <View style={[styles.itemDivider, { backgroundColor: colors.border }]} />

          <ToggleItem
            icon="notifications-outline"
            title="Push Notifications"
            value={notifications}
            onValueChange={setNotifications}
            colors={colors}
          />
          <View style={[styles.itemDivider, { backgroundColor: colors.border }]} />

          <ToggleItem
            icon="location-outline"
            title="Location Access"
            value={locationEnabled}
            onValueChange={setLocationEnabled}
            colors={colors}
          />
          <View style={[styles.itemDivider, { backgroundColor: colors.border }]} />

          <MenuItem
            icon="language-outline"
            title="Language"
            rightText="English (US)"
            colors={colors}
          />
        </View>

        {/* LEGAL & HELP */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Legal & Support
        </Text>

        <View style={[styles.sectionCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <MenuItem
            icon="help-circle-outline"
            title="Help Center & FAQs"
            colors={colors}
          />
          <View style={[styles.itemDivider, { backgroundColor: colors.border }]} />

          <MenuItem
            icon="document-text-outline"
            title="Terms & Conditions"
            colors={colors}
          />
          <View style={[styles.itemDivider, { backgroundColor: colors.border }]} />

          <MenuItem
            icon="information-circle-outline"
            title="App Version"
            rightText="v1.1.0"
            colors={colors}
          />
        </View>

        {/* LOGOUT */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons
            name="log-out-outline"
            size={20}
            color="#fff"
          />

          <Text style={styles.logoutText}>
            Logout Account
          </Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- MENU ITEM ---------- */
function MenuItem({
  icon,
  title,
  rightText,
  colors,
  onPress,
}: {
  icon: any;
  title: string;
  rightText?: string;
  colors: any;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} disabled={!onPress}>
      <View style={styles.menuLeft}>
        <Ionicons
          name={icon}
          size={20}
          color={colors.secondary}
        />

        <Text style={[styles.menuText, { color: colors.text }]}>
          {title}
        </Text>
      </View>

      <View style={styles.rightSection}>
        {rightText && (
          <Text style={[styles.rightText, { color: colors.mutedText }]}>
            {rightText}
          </Text>
        )}

        <Ionicons
          name="chevron-forward"
          size={18}
          color={colors.mutedText}
        />
      </View>
    </TouchableOpacity>
  );
}

/* ---------- TOGGLE ITEM ---------- */
function ToggleItem({
  icon,
  title,
  value,
  onValueChange,
  colors,
}: {
  icon: any;
  title: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  colors: any;
}) {
  return (
    <View style={styles.menuItem}>
      <View style={styles.menuLeft}>
        <Ionicons
          name={icon}
          size={20}
          color={colors.secondary}
        />

        <Text style={[styles.menuText, { color: colors.text }]}>
          {title}
        </Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: "#CBD5E1",
          true: colors.primary,
        }}
        thumbColor={value ? colors.secondary : "#F4F3F0"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scroll: {
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
  },

  sectionTitle: {
    marginTop: 18,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    opacity: 0.8,
  },

  sectionCard: {
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 2,
    elevation: 1,
  },

  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuText: {
    marginLeft: 12,
    fontSize: 13,
    fontWeight: "600",
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  rightText: {
    marginRight: 6,
    fontSize: 12,
    fontWeight: "600",
  },

  itemDivider: {
    height: 0.5,
    marginHorizontal: 14,
    opacity: 0.6,
  },

  logoutButton: {
    marginTop: 30,
    backgroundColor: "#EF4444",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
    fontSize: 14,
  },
});