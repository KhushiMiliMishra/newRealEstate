import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function ProfileScreen({ navigation }: any) {
  const { colors, isDark } = useTheme();
  const { user, profile, shortlistedProperties, viewingRequests, savedSearches, logout } = useAuth();

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
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* PROFILE HEADER */}
        <View style={styles.profileHeader}>
          <View style={[styles.cover, { backgroundColor: colors.primary }]}>
            {/* Visual gradient effect for a luxury look */}
            <View style={styles.coverOverlay} />
          </View>

          <Image
            source={{
              uri: "https://i.pravatar.cc/300?img=60",
            }}
            style={[styles.avatar, { borderColor: colors.cardBg }]}
          />

          <Text style={[styles.name, { color: colors.text }]}>
            {user?.fullName || "Guest Seeker"}
          </Text>

          <Text style={[styles.email, { color: colors.mutedText }]}>
            {user?.email || "seeker@propvault.com"}
          </Text>

          <Text style={[styles.phone, { color: colors.secondary }]}>
            {user?.phone || "+91 98765 43210"}
          </Text>

          <TouchableOpacity 
            style={[styles.editButton, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Ionicons
              name="create-outline"
              size={15}
              color="#fff"
            />
            <Text style={styles.editText}>
              Edit Preferences
            </Text>
          </TouchableOpacity>
        </View>

        {/* STATS */}
        <View style={styles.statsContainer}>
          <TouchableOpacity 
            style={[styles.statCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
            onPress={() => navigation.navigate("Saved")}
          >
            <Text style={[styles.statNumber, { color: colors.primary }]}>
              {shortlistedProperties.length}
            </Text>
            <Text style={[styles.statLabel, { color: colors.mutedText }]}>
              Shortlisted
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.statCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
            onPress={() => navigation.navigate("Saved")}
          >
            <Text style={[styles.statNumber, { color: colors.primary }]}>
              {viewingRequests.length}
            </Text>
            <Text style={[styles.statLabel, { color: colors.mutedText }]}>
              Visits Scheduled
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.statCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
            onPress={() => navigation.navigate("Saved")}
          >
            <Text style={[styles.statNumber, { color: colors.primary }]}>
              {savedSearches.length}
            </Text>
            <Text style={[styles.statLabel, { color: colors.mutedText }]}>
              Searches
            </Text>
          </TouchableOpacity>
        </View>

        {/* CUSTOMER PREFERENCES CARD */}
        {profile && (
          <View style={[styles.preferencesCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <View style={styles.prefHeaderRow}>
              <Ionicons name="options" size={18} color={colors.accent} />
              <Text style={[styles.prefCardTitle, { color: colors.text }]}>Search Preferences</Text>
            </View>

            <View style={styles.prefItem}>
              <Text style={[styles.prefLabel, { color: colors.mutedText }]}>Target Locality</Text>
              <Text style={[styles.prefValue, { color: colors.text }]}>{profile.preferredLocality}</Text>
            </View>

            <View style={styles.prefGrid}>
              <View style={styles.prefGridCol}>
                <Text style={[styles.prefLabel, { color: colors.mutedText }]}>Property Type</Text>
                <Text style={[styles.prefValue, { color: colors.text }]}>{profile.preferredPropertyType}</Text>
              </View>
              <View style={styles.prefGridCol}>
                <Text style={[styles.prefLabel, { color: colors.mutedText }]}>Deal Mode</Text>
                <Text style={[styles.prefValue, { color: colors.text }]}>{profile.preferredTransactionType}</Text>
              </View>
            </View>

            <View style={styles.prefItem}>
              <Text style={[styles.prefLabel, { color: colors.mutedText }]}>Budget Limits (INR)</Text>
              <Text style={[styles.prefValue, { color: colors.text }]}>
                ₹{(profile.minBudget / 100000).toFixed(0)} L — ₹{(profile.maxBudget / 10000000).toFixed(1)} Cr
              </Text>
            </View>
          </View>
        )}

        {/* ACCOUNT LIST */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Engagement
        </Text>

        <View style={[styles.menuGroupCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <MenuItem
            icon="heart-outline"
            title="Shortlisted Properties"
            colors={colors}
            onPress={() => navigation.navigate("Saved")}
          />
          <View style={[styles.menuDivider, { backgroundColor: colors.border }]} />
          
          <MenuItem
            icon="calendar-outline"
            title="Scheduled Visits"
            colors={colors}
            onPress={() => navigation.navigate("Saved")}
          />
          <View style={[styles.menuDivider, { backgroundColor: colors.border }]} />
          
          <MenuItem
            icon="search-outline"
            title="Saved Searches"
            colors={colors}
            onPress={() => navigation.navigate("Saved")}
          />
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          App Settings
        </Text>

        <View style={[styles.menuGroupCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <MenuItem
            icon="settings-outline"
            title="Preferences & Dark Mode"
            colors={colors}
            onPress={() => navigation.navigate("Settings")}
          />
          <View style={[styles.menuDivider, { backgroundColor: colors.border }]} />
          
          <MenuItem
            icon="notifications-outline"
            title="Notification Settings"
            colors={colors}
            onPress={() => navigation.navigate("Settings")}
          />
        </View>

        {/* LOGOUT */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons
            name="log-out-outline"
            size={18}
            color="#fff"
          />

          <Text style={styles.logoutText}>
            Logout Account
          </Text>
        </TouchableOpacity>

        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function MenuItem({
  icon,
  title,
  colors,
  onPress,
}: {
  icon: any;
  title: string;
  colors: any;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
    >
      <View style={styles.menuLeft}>
        <Ionicons
          name={icon}
          size={18}
          color={colors.secondary}
        />
        <Text style={[styles.menuText, { color: colors.text }]}>
          {title}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={16}
        color={colors.mutedText}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },

  cover: {
    width: "100%",
    height: 130,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: "hidden",
  },

  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginTop: -48,
    borderWidth: 4,
  },

  name: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 12,
  },

  email: {
    fontSize: 13,
    marginTop: 3,
  },

  phone: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
  },

  editButton: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },

  editText: {
    color: "#fff",
    fontWeight: "800",
    marginLeft: 6,
    fontSize: 12,
  },

  statsContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "space-between",
    marginBottom: 20,
  },

  statCard: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "800",
  },

  statLabel: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: "600",
  },

  preferencesCard: {
    marginHorizontal: 20,
    borderRadius: 22,
    borderWidth: 1,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },

  prefHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  prefCardTitle: {
    fontSize: 14,
    fontWeight: "800",
    marginLeft: 8,
  },

  prefItem: {
    marginBottom: 10,
  },

  prefLabel: {
    fontSize: 10,
    fontWeight: "700",
  },

  prefValue: {
    fontSize: 13,
    fontWeight: "800",
    marginTop: 2,
  },

  prefGrid: {
    flexDirection: "row",
    marginBottom: 10,
  },

  prefGridCol: {
    flex: 1,
  },

  sectionTitle: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    opacity: 0.7,
  },

  menuGroupCard: {
    marginHorizontal: 20,
    borderRadius: 22,
    borderWidth: 1,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 2,
    elevation: 1,
  },

  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
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
    fontWeight: "700",
  },

  menuDivider: {
    height: 0.5,
    marginHorizontal: 16,
    opacity: 0.5,
  },

  logoutButton: {
    marginHorizontal: 20,
    marginTop: 25,
    backgroundColor: "#EF4444",
    borderRadius: 16,
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
    fontWeight: "800",
    marginLeft: 8,
    fontSize: 14,
  },
});