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

interface Property {
  propertyId: number;
  title: string;
  city: string;
  address?: string;
  price: number;
  bhk: number;
  bathrooms: number;
  balconies?: number;
  areaSqft: number;
  propertyType?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
}

const categories = [
  { name: "Apartment", icon: "business-outline" },
  { name: "Villa", icon: "home-outline" },
  { name: "Plot", icon: "map-outline" },
  { name: "Commercial", icon: "briefcase-outline" },
];

export default function HomeScreen({ navigation }: any) {
  const { colors, isDark } = useTheme();

  const {
    user,
    profile,
    toggleShortlist,
    isShortlisted,
    savedSearches,
  } = useAuth();

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

const loadProperties = async () => {
  try {
    const data = await getAllProperties();

    console.log("API DATA =", data);
    console.log("COUNT =", data?.length);

    setProperties(data || []);
  } catch (error) {
    console.log("Property Load Error:", error);
  } finally {
    setLoading(false);
  }
};

  const handleOpenMap = () => {
    const query = encodeURIComponent("premium real estate Chennai");

    const url = Platform.select({
      ios: `maps://?q=${query}`,
      android: `geo:0,0?q=${query}`,
      default: `https://www.google.com/maps/search/?api=1&query=${query}`,
    });

    Linking.openURL(url!).catch((err) =>
      console.error("Map Error:", err)
    );
  };

  const getPropertyStats = (property: Property) => {
    return {
      beds: `${property.bhk} Beds`,
      baths: `${property.bathrooms} Baths`,
      area: `${property.areaSqft} sq.ft`,
    };
  };

const getImage = (property: Property) => {
  console.log(
    property.propertyId,
    property.image1
  );

  return property.image1 ||
    "https://via.placeholder.com/600x400?text=NO+IMAGE";
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
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text
              style={[
                styles.greeting,
                { color: colors.mutedText },
              ]}
            >
              Good Morning 👋
            </Text>

            <Text
              style={[
                styles.username,
                { color: colors.text },
              ]}
            >
              {user?.fullName || "PropVault Seeker"}
            </Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity
              style={[
                styles.notificationBtn,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: colors.border,
                },
              ]}
              onPress={() =>
                navigation.navigate("Notifications")
              }
            >
              <Ionicons
                name="notifications-outline"
                size={20}
                color={colors.text}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.avatarBox,
                { backgroundColor: colors.primary },
              ]}
              onPress={() => navigation.navigate("Profile")}
            >
              <Text style={styles.avatarText}>
                {user?.fullName
                  ? user.fullName.charAt(0)
                  : "U"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SEARCH */}

        <View style={styles.searchContainer}>
          <TouchableOpacity
            style={[
              styles.searchBox,
              {
                backgroundColor: colors.cardBg,
                borderColor: colors.border,
              },
            ]}
            onPress={() => navigation.navigate("Search")}
          >
            <Ionicons
              name="search-outline"
              size={20}
              color={colors.mutedText}
            />

            <Text
              style={[
                styles.searchText,
                { color: colors.mutedText },
              ]}
            >
              Search location, property type...
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.mapBtn,
              { backgroundColor: colors.primary },
            ]}
            onPress={handleOpenMap}
          >
            <Ionicons
              name="map-outline"
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* PROPERTY TYPES */}

        <View style={styles.sectionHeader}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text },
            ]}
          >
            Property Types
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((item) => (
            <TouchableOpacity
              key={item.name}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: colors.border,
                },
              ]}
            >
              <Ionicons
                name={item.icon as any}
                size={16}
                color={colors.primary}
              />

              <Text
                style={[
                  styles.categoryText,
                  { color: colors.text },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* FEATURED */}

        <View style={styles.sectionHeader}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text },
            ]}
          >
            Featured Listings
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {properties.map((item) => {
            const specs = getPropertyStats(item);

            return (
              <Pressable
                key={item.propertyId}
                style={[
                  styles.featureCard,
                  {
                    backgroundColor: colors.cardBg,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() =>
                  navigation.navigate(
                    "PropertyDetail",
                    {
                      propertyId: item.propertyId,
                    }
                  )
                }
              >
                <Image
                  source={{ uri: getImage(item) }}
                  style={styles.featureImg}
                />

                <TouchableOpacity
                  style={styles.favoriteBtn}
                  onPress={() =>
                    toggleShortlist(
                      String(item.propertyId)
                    )
                  }
                >
                  <Ionicons
                    name={
                      isShortlisted(
                        String(item.propertyId)
                      )
                        ? "heart"
                        : "heart-outline"
                    }
                    size={20}
                    color="#EF4444"
                  />
                </TouchableOpacity>

                <View style={styles.featureContent}>
                  <Text
                    style={[
                      styles.price,
                      { color: colors.primary },
                    ]}
                  >
                    ₹
                    {Number(
                      item.price
                    ).toLocaleString("en-IN")}
                  </Text>

                  <Text
                    style={[
                      styles.title,
                      { color: colors.text },
                    ]}
                  >
                    {item.title}
                  </Text>

                  <Text
                    style={[
                      styles.location,
                      { color: colors.mutedText },
                    ]}
                  >
                    📍 {item.city}
                  </Text>

                  <View style={styles.specRow}>
                    <Text>{specs.beds}</Text>
                    <Text>{specs.baths}</Text>
                    <Text>{specs.area}</Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
                {/* RECOMMENDED FOR YOU */}

        <View style={styles.sectionHeader}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text },
            ]}
          >
            Recommended For You
          </Text>
        </View>

        {properties.map((item) => {
          const specs = getPropertyStats(item);

          return (
            <Pressable
              key={`recommended-${item.propertyId}`}
              style={[
                styles.card,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: colors.border,
                },
              ]}
              onPress={() =>
                navigation.navigate(
                  "PropertyDetail",
                  {
                    propertyId: item.propertyId,
                  }
                )
              }
            >
              <Image
                source={{ uri: getImage(item) }}
                style={styles.cardImg}
              />

              <View style={styles.cardContent}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={[
                      styles.price,
                      { color: colors.primary },
                    ]}
                  >
                    ₹
                    {Number(
                      item.price
                    ).toLocaleString("en-IN")}
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      toggleShortlist(
                        String(item.propertyId)
                      )
                    }
                  >
                    <Ionicons
                      name={
                        isShortlisted(
                          String(item.propertyId)
                        )
                          ? "heart"
                          : "heart-outline"
                      }
                      size={20}
                      color={
                        isShortlisted(
                          String(item.propertyId)
                        )
                          ? "#EF4444"
                          : colors.mutedText
                      }
                    />
                  </TouchableOpacity>
                </View>

                <Text
                  style={[
                    styles.title,
                    { color: colors.text },
                  ]}
                >
                  {item.title}
                </Text>

                <Text
                  style={[
                    styles.location,
                    { color: colors.mutedText },
                  ]}
                >
                  📍 {item.city}
                </Text>

                <View
                  style={styles.recommendedSpecs}
                >
                  <Text
                    style={[
                      styles.recommendedSpecText,
                      {
                        color: colors.secondary,
                      },
                    ]}
                  >
                    {item.bhk} BHK •{" "}
                    {item.areaSqft} sq.ft
                  </Text>

                  <Text
                    style={styles.availableText}
                  >
                    Available
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        })}

        {/* BANNER */}

        <View
          style={[
            styles.banner,
            {
              backgroundColor:
                colors.primary,
            },
          ]}
        >
          <Text style={styles.bannerTitle}>
            Low Interest Home Loans
          </Text>

          <Text
            style={styles.bannerSubtitle}
          >
            Exclusive mortgage offers
            up to 7.5% interest rate
            for PropVault users.
          </Text>

          <TouchableOpacity
            style={[
              styles.bannerButton,
              {
                backgroundColor:
                  colors.accent,
              },
            ]}
            onPress={() =>
              Linking.openURL(
                "https://www.homeloans.co.in"
              )
            }
          >
            <Text
              style={
                styles.bannerButtonText
              }
            >
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

  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    marginRight: 10,
    borderWidth: 1,
  },

  categoryText: {
    fontWeight: "700",
    fontSize: 13,
  },

  featureCard: {
    width: 270,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    marginRight: 16,
  },

  featureImg: {
    width: "100%",
    height: 160,
  },

  favoriteBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  featureContent: {
    padding: 15,
  },

  price: {
    fontSize: 18,
    fontWeight: "800",
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 4,
  },

  location: {
    fontSize: 12,
    marginTop: 4,
  },

  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  card: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 12,
  },

  cardImg: {
    width: 110,
    height: 110,
  },

  cardContent: {
    flex: 1,
    padding: 12,
  },

  recommendedSpecs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  recommendedSpecText: {
    fontSize: 12,
    fontWeight: "700",
  },

  availableText: {
    color: "#22C55E",
    fontSize: 12,
    fontWeight: "700",
  },

  banner: {
    marginTop: 24,
    borderRadius: 24,
    padding: 20,
  },

  bannerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },

  bannerSubtitle: {
    color: "#fff",
    marginTop: 8,
    fontSize: 14,
    lineHeight: 22,
  },

  bannerButton: {
    marginTop: 16,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },

  bannerButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});