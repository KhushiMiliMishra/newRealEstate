import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  StatusBar,
  Linking,
  Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { getAllProperties } from "../services/propertyService";

const categories = [
  { name: "Apartment", icon: "business-outline" },
  { name: "Villa", icon: "home-outline" },
  { name: "Plot", icon: "map-outline" },
  { name: "Commercial", icon: "briefcase-outline" },
];

export default function HomeScreen({ navigation }: any) {
  const { colors, isDark } = useTheme();
  const [properties, setProperties] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
  const { user, profile, toggleShortlist, isShortlisted, savedSearches } = useAuth();

  useEffect(() => {
  loadProperties();
}, []);

const loadProperties = async () => {
  try {
    const data = await getAllProperties();

    console.log("PROPERTIES FROM API:", data);

    const formatted = data.map((property: any) => ({
      id: property.propertyId.toString(),
      title: property.title,
      location: property.city || "Location Not Available",
      price: `₹${Number(property.price).toLocaleString()}`,
      image:
        property.image1 && property.image1.trim() !== ""
          ? property.image1
          : "https://picsum.photos/600/400",
      bhk: `${property.bhk} BHK`,
      bathrooms: property.bathrooms,
      areaSqft: property.areaSqft,
      propertyAge: property.propertyAge,
    }));

    setProperties(formatted);
  } catch (error) {
    console.log("Error loading properties:", error);
  } finally {
    setLoading(false);
  }
};
  
  const handleOpenMap = () => {
    // Open external Google Maps search for premium properties in Chennai
    const query = encodeURIComponent("premium real estate Chennai");
    const url = Platform.select({
      ios: `maps://?q=${query}`,
      android: `geo:0,0?q=${query}`,
      default: `https://www.google.com/maps/search/?api=1&query=${query}`,
    });
    Linking.openURL(url).catch((err) => console.error("An error occurred opening maps:", err));
  };


  if (loading) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Loading Properties...</Text>
    </View>
  );
}
  return (
    
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.mutedText }]}>
              Good Morning 👋
            </Text>
            <Text style={[styles.username, { color: colors.text }]}>
              {user?.fullName || "PropVault Seeker"}
            </Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={[styles.notificationBtn, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
              onPress={() => navigation.navigate("Notifications")}
            >
              <Ionicons
                name="notifications-outline"
                size={20}
                color={colors.text}
              />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.avatarBox, { backgroundColor: colors.primary }]}
              onPress={() => navigation.navigate("Profile")}
            >
              <Text style={styles.avatarText}>
                {user?.fullName ? user.fullName.charAt(0) : "U"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SEARCH BAR & MAP TOGGLE */}
        <View style={styles.searchContainer}>
          <TouchableOpacity
            style={[styles.searchBox, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
            onPress={() => navigation.navigate("Search")}
          >
            <Ionicons
              name="search-outline"
              size={20}
              color={colors.mutedText}
            />
            <Text style={[styles.searchText, { color: colors.mutedText }]}>
              Search location, property type...
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.mapBtn, { backgroundColor: colors.primary }]}
            onPress={handleOpenMap}
          >
            <Ionicons
              name="map-outline"
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* PREFERENCES BANNER */}
        {profile && (
          <View style={[styles.prefBanner, { backgroundColor: isDark ? "#1E293B" : "#E2E8F0", borderColor: colors.border }]}>
            <View style={styles.prefHeader}>
              <Ionicons name="sparkles" size={15} color={colors.accent} />
              <Text style={[styles.prefTitle, { color: colors.text }]}>Matched Preferences</Text>
            </View>
            <Text style={[styles.prefText, { color: colors.mutedText }]}>
              Locality: <Text style={{fontWeight: "700", color: colors.text}}>{profile.preferredLocality}</Text> • Budget: <Text style={{fontWeight: "700", color: colors.text}}>₹{(profile.minBudget/100000).toFixed(0)}L - ₹{(profile.maxBudget/10000000).toFixed(1)}Cr</Text>
            </Text>
          </View>
        )}

        {/* PROPERTY TYPES */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Property Types</Text>
        </View>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {categories.map((item) => (
            <TouchableOpacity
              key={item.name}
              style={[styles.categoryChip, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
              onPress={() => navigation.navigate("Search", { category: item.name })}
            >
              <Ionicons name={item.icon as any} size={15} color={colors.accent} style={{ marginRight: 8 }} />
              <Text style={[styles.categoryText, { color: colors.text }]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* SAVED SEARCHES */}
        {savedSearches.length > 0 && (
          <View style={{ marginTop: 8 }}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Saved Searches</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.savedSearchesScroll}>
              {savedSearches.map((search) => (
                <TouchableOpacity
                  key={search.id}
                  style={[styles.searchChip, { backgroundColor: isDark ? "#1F2937" : "#F1F5F9", borderColor: colors.border }]}
                  onPress={() => navigation.navigate("Search", { locality: search.locality, category: search.propertyType })}
                >
                  <Ionicons name="search" size={12} color={colors.primary} style={{ marginRight: 6 }} />
                  <Text style={[styles.searchChipText, { color: colors.text }]}>
                    {search.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* FEATURED PROPERTIES */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Featured Listings</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Text style={[styles.seeAllText, { color: colors.secondary }]}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.featuredScroll}
        >
          {properties.slice(-7).map((item) => {
            const specs = { beds: item.bhk, baths: `${item.bathrooms} Baths`, area: `${item.areaSqft} sqft`, };
            return (
              <Pressable
                key={item.id}
                style={[styles.featureCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
               onPress={() => navigation.navigate("PropertyDetail", {propertyId: Number(item.id),
  })
}
              >
                <View>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.featureImg}
                  />
                  <TouchableOpacity 
                    style={[styles.favoriteBtn, { backgroundColor: colors.cardBg }]}
                    onPress={() => toggleShortlist(item.id)}
                  >
                    <Ionicons
                      name={isShortlisted(item.id) ? "heart" : "heart-outline"}
                      size={18}
                      color={isShortlisted(item.id) ? "#EF4444" : colors.text}
                    />
                  </TouchableOpacity>

                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>🟢 Available</Text>
                  </View>
                </View>

                <View style={styles.featureContent}>
                  <Text style={[styles.price, { color: colors.primary }]}>
                    {item.price}
                  </Text>

                  <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
                    {item.title}
                  </Text>

                  <Text style={[styles.location, { color: colors.mutedText }]} numberOfLines={1}>
                    📍 {item.location}
                  </Text>

                  <View style={[styles.divider, { backgroundColor: colors.border }]} />

                  {/* Beds, Baths & Area specs inside card */}
                  <View style={styles.specRow}>
                    <Text style={[styles.specText, { color: colors.mutedText }]}>🛏 {specs.beds}</Text>
                    <Text style={[styles.specText, { color: colors.mutedText }]}>🛁 {specs.baths}</Text>
                    <Text style={[styles.specText, { color: colors.mutedText }]}>📐 {specs.area}</Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* RECOMMENDED SECTION */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recommended For You</Text>
        </View>

        {properties.slice(0, 5).map((item) => {
          const specs = {area: `${item.areaSqft} sqft`,};
          return (
            <Pressable
              key={item.id}
              style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
              onPress={() =>navigation.navigate("PropertyDetail", {propertyId: Number(item.id),
  })
}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.cardImg}
              />

              <View style={styles.cardContent}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={[styles.price, { color: colors.primary }]}>
                    {item.price}
                  </Text>
                  <TouchableOpacity onPress={() => toggleShortlist(item.id)}>
                    <Ionicons
                      name={isShortlisted(item.id) ? "heart" : "heart-outline"}
                      size={18}
                      color={isShortlisted(item.id) ? "#EF4444" : colors.mutedText}
                    />
                  </TouchableOpacity>
                </View>

                <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
                  {item.title}
                </Text>

                <Text style={[styles.location, { color: colors.mutedText }]} numberOfLines={1}>
                  📍 {item.location}
                </Text>

                <View style={styles.recommendedSpecs}>
                  <Text
                    style={[
                      styles.recommendedSpecText,
                      { color: colors.secondary },
                    ]}
                  >
                    {item.bhk} • {item.areaSqft} sqft
                  </Text>
                  <Text style={styles.availableText}>🟢 Available</Text>
                </View>
              </View>
            </Pressable>
          );
        })}

        {/* PROMO BANNER */}
        <View style={[styles.banner, { backgroundColor: colors.primary }]}>
          <Text style={styles.bannerTitle}>
            Low Interest Home Loans
          </Text>

          <Text style={styles.bannerSubtitle}>
            Exclusive mortgage offers up to 7.5% interest rate for PropVault users.
          </Text>

          <TouchableOpacity 
            style={[styles.bannerButton, { backgroundColor: colors.accent }]}
            onPress={() => Linking.openURL("https://www.homeloans.co.in").catch((err) => console.log(err))}
          >
            <Text style={styles.bannerButtonText}>
              Explore Offers
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  header: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  greeting: {
    fontSize: 13,
    fontWeight: "700",
  },

  username: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 2,
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  avatarBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  searchContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },

  searchBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 52,
    alignItems: "center",
    flexDirection: "row",
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },

  searchText: {
    marginLeft: 10,
    fontSize: 14,
  },

  mapBtn: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },

  prefBanner: {
    marginTop: 18,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderStyle: "dashed",
  },

  prefHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  prefTitle: {
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 6,
    letterSpacing: 0.5,
  },

  prefText: {
    fontSize: 12,
  },

  categoryScroll: {
    marginTop: 10,
    paddingBottom: 5,
  },

  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    marginRight: 10,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.01,
    shadowRadius: 2,
    elevation: 1,
    height: 44,
  },

  categoryText: {
    fontWeight: "700",
    fontSize: 13,
  },

  savedSearchesScroll: {
    marginTop: 8,
  },

  searchChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    marginRight: 8,
    borderWidth: 0.5,
  },

  searchChipText: {
    fontSize: 12,
    fontWeight: "700",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
  },

  seeAllText: {
    fontWeight: "800",
    fontSize: 13,
  },

  featuredScroll: {
    paddingBottom: 8,
  },

  featureCard: {
    width: 270,
    borderRadius: 24,
    borderWidth: 1,
    overflow: "hidden",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },

  featureImg: {
    width: "100%",
    height: 150,
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
    shadowOffset: { width: 0, height: 2 },
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

  featureContent: {
    padding: 16,
  },

  price: {
    fontSize: 18,
    fontWeight: "800",
  },

  title: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 4,
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

  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  specText: {
    fontSize: 11,
    fontWeight: "600",
  },

  card: {
    flexDirection: "row",
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },

  cardImg: {
    width: 100,
    height: 100,
  },

  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },

  recommendedSpecs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },

  recommendedSpecText: {
    fontSize: 11,
    fontWeight: "700",
  },

  availableText: {
    fontSize: 11,
    color: "#22C55E",
    fontWeight: "800",
  },

  banner: {
    marginTop: 25,
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  bannerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },

  bannerSubtitle: {
    color: "#F8FAFC",
    marginTop: 6,
    fontSize: 13,
    lineHeight: 20,
    opacity: 0.9,
  },

  bannerButton: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  bannerButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});