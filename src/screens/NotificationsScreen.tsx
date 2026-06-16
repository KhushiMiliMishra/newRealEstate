import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function NotificationsScreen({ navigation }: any) {
  const { colors, isDark } = useTheme();
  const { notifications, markNotificationRead } = useAuth();

  const sections: { title: "Today" | "Yesterday" | "Earlier"; items: typeof notifications }[] = [
    { title: "Today", items: notifications.filter((n) => n.section === "Today") },
    { title: "Yesterday", items: notifications.filter((n) => n.section === "Yesterday") },
    { title: "Earlier", items: notifications.filter((n) => n.section === "Earlier") },
  ];

  const getNotificationColor = (icon: string) => {
    switch (icon) {
      case "trending-down":
        return { bg: "#E8F5E9", icon: "#2E7D32" }; // Success / green
      case "calendar":
        return { bg: "#E3F2FD", icon: "#1565C0" }; // Info / blue
      case "chatbubble":
        return { bg: "#E0F7FA", icon: "#00838F" }; // Teal
      case "home":
        return { bg: "#F3E5F5", icon: "#6A1B9A" }; // Purple
      default:
        return { bg: "#FFF3E0", icon: "#EF6C00" }; // Warning / orange
    }
  };

  const hasNotifications = notifications.length > 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color={colors.text}
          />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Notifications
        </Text>

        <View style={{ width: 40 }} />
      </View>

      {/* NOTIFICATIONS LIST */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {!hasNotifications ? (
          <View style={styles.emptyContainer}>
            <View style={[styles.emptyIconBox, { backgroundColor: colors.cardBg }]}>
              <Ionicons name="notifications-off-outline" size={60} color={colors.secondary} />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>All Caught Up!</Text>
            <Text style={[styles.emptySubtitle, { color: colors.mutedText }]}>
              No new notifications. We'll alert you about viewing updates, price drops, and messages.
            </Text>
            <TouchableOpacity
              style={[styles.exploreBtn, { backgroundColor: colors.primary }]}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.exploreText}>Go to Home</Text>
            </TouchableOpacity>
          </View>
        ) : (
          sections.map(
            (section) =>
              section.items.length > 0 && (
                <View key={section.title} style={styles.sectionContainer}>
                  <Text style={[styles.sectionHeader, { color: colors.text }]}>
                    {section.title}
                  </Text>

                  {section.items.map((item) => {
                    const colorsConfig = getNotificationColor(item.icon);
                    return (
                      <View
                        key={item.id}
                        style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
                      >
                        <View style={[styles.iconContainer, { backgroundColor: colorsConfig.bg }]}>
                          <Ionicons
                            name={item.icon as any}
                            size={20}
                            color={colorsConfig.icon}
                          />
                        </View>

                        <View style={styles.content}>
                          <View style={styles.rowNotifTitle}>
                            <Text style={[styles.title, { color: colors.text }]}>
                              {item.title}
                            </Text>
                            <Text style={[styles.dateText, { color: colors.mutedText }]}>
                              {item.date}
                            </Text>
                          </View>

                          <Text style={[styles.message, { color: colors.mutedText }]}>
                            {item.message}
                          </Text>
                        </View>

                        <TouchableOpacity
                          style={styles.closeBtn}
                          onPress={() => markNotificationRead(item.id)}
                        >
                          <Ionicons name="close-circle-outline" size={18} color={colors.mutedText} />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              )
          )
        )}
        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
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

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  sectionContainer: {
    marginBottom: 20,
  },

  sectionHeader: {
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
    opacity: 0.8,
  },

  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  content: {
    flex: 1,
    paddingRight: 6,
  },

  rowNotifTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 13,
    fontWeight: "700",
  },

  dateText: {
    fontSize: 10,
    fontWeight: "500",
  },

  message: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 16,
  },

  closeBtn: {
    padding: 4,
  },

  /* EMPTY STATES */
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },

  emptyIconBox: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
  },

  emptySubtitle: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    marginTop: 8,
    paddingHorizontal: 20,
  },

  exploreBtn: {
    marginTop: 25,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  exploreText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});