import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { properties } from "../data/properties";

export default function SavedScreen({ navigation }: any) {
  const { colors, isDark } = useTheme();
  const { shortlistedProperties, toggleShortlist, savedSearches, deleteSavedSearch } = useAuth();
  const [activeTab, setActiveTab] = useState<"properties" | "searches">("properties");

  // Get matching properties from shortlisted IDs
  const savedListings = properties.filter((p) => shortlistedProperties.includes(p.id));

  const getStatusBadge = (id: string) => {
    const statuses: Record<string, string> = {
      "1": "🟢 Available",
      "2": "🔵 Reserved",
      "3": "🟠 Rented",
    };
    return statuses[id] || "🟢 Available";
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Saved Hub</Text>
          <Text style={[styles.subtitle, { color: colors.mutedText }]}>
            {activeTab === "properties" 
              ? `${savedListings.length} shortlisted listings`
              : `${savedSearches.length} saved searches`
            }
          </Text>
        </View>

        <TouchableOpacity 
          style={[styles.plusSearchBtn, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
          onPress={() => navigation.navigate("Search")}
        >
          <Ionicons name="search" size={18} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      {/* SEGMENTED CONTROL */}
      <View style={[styles.tabContainer, { backgroundColor: isDark ? "#1E2937" : "#E2E8F0" }]}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "properties" && [styles.activeTab, { backgroundColor: colors.cardBg }],
          ]}
          onPress={() => setActiveTab("properties")}
        >
          <Ionicons 
            name="home" 
            size={14} 
            color={activeTab === "properties" ? colors.primary : colors.mutedText} 
            style={{ marginRight: 6 }} 
          />
          <Text style={[
            styles.tabText, 
            { color: activeTab === "properties" ? colors.text : colors.mutedText },
            activeTab === "properties" && { fontWeight: "800" }
          ]}>
            Properties ({savedListings.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "searches" && [styles.activeTab, { backgroundColor: colors.cardBg }],
          ]}
          onPress={() => setActiveTab("searches")}
        >
          <Ionicons 
            name="funnel" 
            size={13} 
            color={activeTab === "searches" ? colors.primary : colors.mutedText} 
            style={{ marginRight: 6 }} 
          />
          <Text style={[
            styles.tabText, 
            { color: activeTab === "searches" ? colors.text : colors.mutedText },
            activeTab === "searches" && { fontWeight: "800" }
          ]}>
            Searches ({savedSearches.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* TAB CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeTab === "properties" ? (
          /* PROPERTIES LIST */
          savedListings.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={[styles.emptyIconBox, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
                <Ionicons name="heart-outline" size={50} color={colors.accent} />
              </View>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>No Saved Properties</Text>
              <Text style={[styles.emptySubtitle, { color: colors.mutedText }]}>
                Tap the heart icon on any property card to save it for quick review later.
              </Text>
              <TouchableOpacity
                style={[styles.exploreBtn, { backgroundColor: colors.primary }]}
                onPress={() => navigation.navigate("Home")}
              >
                <Text style={styles.exploreText}>Explore Listings</Text>
              </TouchableOpacity>
            </View>
          ) : (
            savedListings.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.95}
                style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
                onPress={() => navigation.navigate("PropertyDetail", { propertyId: item.id })}
              >
                <View>
                  <Image source={{ uri: item.image }} style={styles.cardImage} />
                  <TouchableOpacity 
                    style={[styles.favoriteBtn, { backgroundColor: colors.cardBg }]}
                    onPress={() => toggleShortlist(item.id)}
                  >
                    <Ionicons name="heart" size={18} color="#EF4444" />
                  </TouchableOpacity>

                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{getStatusBadge(item.id)}</Text>
                  </View>
                </View>

                <View style={styles.cardContent}>
                  <Text style={[styles.propertyTitle, { color: colors.text }]} numberOfLines={1}>
                    {item.title}
                  </Text>

                  <Text style={[styles.location, { color: colors.mutedText }]} numberOfLines={1}>
                    📍 {item.location}
                  </Text>

                  <View style={[styles.divider, { backgroundColor: colors.border }]} />

                  <View style={styles.footerRow}>
                    <View style={styles.infoCol}>
                      <Text style={[styles.footerPrice, { color: colors.primary }]}>
                        {item.price}
                      </Text>
                      <Text style={[styles.bhkText, { color: colors.mutedText }]}>
                        {item.bhk} Configuration
                      </Text>
                    </View>

                    <TouchableOpacity 
                      style={[styles.removeBtn, { borderColor: "#EF4444" }]}
                      onPress={() => toggleShortlist(item.id)}
                    >
                      <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )
        ) : (
          /* SEARCHES LIST */
          savedSearches.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={[styles.emptyIconBox, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
                <Ionicons name="search-outline" size={50} color={colors.accent} />
              </View>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>No Saved Searches</Text>
              <Text style={[styles.emptySubtitle, { color: colors.mutedText }]}>
                Save search filters to receive immediate price alerts and easily re-run searches.
              </Text>
              <TouchableOpacity
                style={[styles.exploreBtn, { backgroundColor: colors.primary }]}
                onPress={() => navigation.navigate("Search")}
              >
                <Text style={styles.exploreText}>Create New Search</Text>
              </TouchableOpacity>
            </View>
          ) : (
            savedSearches.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.searchCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
                onPress={() => navigation.navigate("Search", { locality: item.locality, category: item.propertyType })}
              >
                <View style={styles.searchLeft}>
                  <View style={[styles.searchIconBox, { backgroundColor: isDark ? "#0B1120" : "#EEF2FF" }]}>
                    <Ionicons name="search" size={18} color={colors.primary} />
                  </View>

                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={[styles.searchTitleText, { color: colors.text }]}>
                      {item.title}
                    </Text>
                    <Text style={[styles.searchSpecText, { color: colors.mutedText }]} numberOfLines={1}>
                      {item.locality} • {item.propertyType} • {item.bhk}
                    </Text>
                    <Text style={[styles.searchBudgetText, { color: colors.secondary }]}>
                      Budget: ₹{(item.minBudget / 100000).toFixed(0)}L — ₹{(item.maxBudget / 10000000).toFixed(1)}Cr
                    </Text>
                  </View>
                </View>

                <TouchableOpacity 
                  style={styles.deleteSearchBtn}
                  onPress={() => deleteSavedSearch(item.id)}
                >
                  <Ionicons name="trash-outline" size={18} color="#EF4444" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          )
        )}
        <View style={{ height: 100 }} />
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
    marginTop: 20,
    marginBottom: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
  },

  subtitle: {
    marginTop: 3,
    fontSize: 13,
  },

  plusSearchBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 2,
    elevation: 1,
  },

  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    padding: 4,
    borderRadius: 14,
    marginBottom: 15,
  },

  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
  },

  activeTab: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  tabText: {
    fontSize: 12,
    fontWeight: "600",
  },

  scrollContent: {
    paddingHorizontal: 20,
  },

  card: {
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },

  cardImage: {
    width: "100%",
    height: 170,
    resizeMode: "cover",
  },

  favoriteBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  statusBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#0F172A",
  },

  cardContent: {
    padding: 16,
  },

  propertyTitle: {
    fontSize: 15,
    fontWeight: "800",
  },

  location: {
    fontSize: 12,
    marginTop: 4,
  },

  divider: {
    height: 0.5,
    marginVertical: 12,
    opacity: 0.5,
  },

  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  infoCol: {
    flex: 1,
  },

  footerPrice: {
    fontSize: 18,
    fontWeight: "900",
  },

  bhkText: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },

  removeBtn: {
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },

  removeText: {
    color: "#EF4444",
    fontWeight: "800",
    fontSize: 11,
  },

  /* SEARCH CARD */
  searchCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },

  searchLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  searchIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  searchTitleText: {
    fontSize: 14,
    fontWeight: "800",
  },

  searchSpecText: {
    fontSize: 11,
    marginTop: 2,
  },

  searchBudgetText: {
    fontSize: 11,
    fontWeight: "700",
    marginTop: 2,
  },

  deleteSearchBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  /* EMPTY STATES */
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },

  emptyIconBox: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 4,
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
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  exploreText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 14,
  },
});