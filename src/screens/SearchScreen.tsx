import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  LayoutAnimation,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { properties } from "../data/properties";

const categories = ["All", "Apartment", "Villa", "Plot", "Commercial"];
const bhkOptions = ["Any", "2 BHK", "3 BHK", "4 BHK"];
const budgetOptions = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Under ₹1 Cr", min: 0, max: 10000000 },
  { label: "₹1 Cr - ₹2 Cr", min: 10000000, max: 20000000 },
  { label: "Above ₹2 Cr", min: 20000000, max: Infinity },
];
const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

export default function SearchScreen({ route, navigation }: any) {
  const { colors, isDark } = useTheme();
  const { toggleShortlist, isShortlisted } = useAuth();

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBHK, setSelectedBHK] = useState("Any");
  const [selectedBudgetIdx, setSelectedBudgetIdx] = useState(0);
  const [selectedSort, setSelectedSort] = useState("featured");
  
  // Collapsible Filters Panel
  const [showFilters, setShowFilters] = useState(false);

  // Handle route params for preset filters
  useEffect(() => {
    if (route.params?.category) {
      setSelectedCategory(route.params.category);
    }
    if (route.params?.locality) {
      setSearchQuery(route.params.locality);
    }
  }, [route.params]);

  // Helper: parse string price like "₹1.2 Cr", "₹95 L" to numbers for comparison
  const parsePrice = (priceStr: string): number => {
    const cleanStr = priceStr.replace(/[^\d.]/g, "");
    const numericVal = parseFloat(cleanStr);
    if (priceStr.includes("Cr")) {
      return numericVal * 10000000;
    } else if (priceStr.includes("L")) {
      return numericVal * 100000;
    }
    return numericVal;
  };

  // Filter listings
  let filteredProperties = properties.filter((item) => {
    // Search Query matches Title or Location
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      selectedCategory === "All" || item.title.includes(selectedCategory) || (selectedCategory === "Apartment" && item.title.includes("Apartment")) || (selectedCategory === "Villa" && item.title.includes("Villa")) || (selectedCategory === "Plot" && item.title.includes("Plot")) || (selectedCategory === "Commercial" && item.title.includes("Commercial"));

    // BHK filter
    const matchesBHK =
      selectedBHK === "Any" || item.bhk === selectedBHK;

    // Price/Budget range filter
    const propertyPriceNum = parsePrice(item.price);
    const budgetLimit = budgetOptions[selectedBudgetIdx];
    const matchesBudget =
      propertyPriceNum >= budgetLimit.min && propertyPriceNum <= budgetLimit.max;

    return matchesQuery && matchesCategory && matchesBHK && matchesBudget;
  });

  // Sort listings
  if (selectedSort === "price_asc") {
    filteredProperties = [...filteredProperties].sort(
      (a, b) => parsePrice(a.price) - parsePrice(b.price)
    );
  } else if (selectedSort === "price_desc") {
    filteredProperties = [...filteredProperties].sort(
      (a, b) => parsePrice(b.price) - parsePrice(a.price)
    );
  }

  const toggleFiltersPanel = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowFilters(!showFilters);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.heading, { color: colors.text }]}>Discover Properties</Text>
          <Text style={[styles.subHeading, { color: colors.mutedText }]}>Find your perfect home</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.filterBtn,
            { backgroundColor: showFilters ? colors.secondary : colors.primary },
          ]}
          onPress={toggleFiltersPanel}
        >
          <Ionicons name="options-outline" size={16} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.filterText}>{showFilters ? "Close" : "Filters"}</Text>
        </TouchableOpacity>
      </View>

      {/* SEARCH BAR */}
      <View style={[styles.searchBox, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
        <Ionicons name="search-outline" size={20} color={colors.mutedText} style={{ marginRight: 10 }} />
        <TextInput
          placeholder="Search location, ECR, Anna Nagar..."
          placeholderTextColor={colors.mutedText}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={[styles.searchInput, { color: colors.text }]}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={18} color={colors.mutedText} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* COLLAPSIBLE FILTERS CARD */}
      {showFilters && (
        <View style={[styles.filtersCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          {/* Price Segment */}
          <Text style={[styles.filterLabel, { color: colors.text }]}>Budget Range</Text>
          <View style={styles.filterRow}>
            {budgetOptions.map((opt, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.filterChip,
                  { backgroundColor: colors.background, borderColor: colors.border },
                  selectedBudgetIdx === idx && { backgroundColor: colors.secondary, borderColor: colors.secondary },
                ]}
                onPress={() => setSelectedBudgetIdx(idx)}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: colors.text },
                    selectedBudgetIdx === idx && { color: "#fff", fontWeight: "700" },
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* BHK Segment */}
          <Text style={[styles.filterLabel, { color: colors.text, marginTop: 12 }]}>Bedrooms (BHK)</Text>
          <View style={styles.filterRow}>
            {bhkOptions.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.filterChip,
                  { backgroundColor: colors.background, borderColor: colors.border },
                  selectedBHK === opt && { backgroundColor: colors.secondary, borderColor: colors.secondary },
                ]}
                onPress={() => setSelectedBHK(opt)}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: colors.text },
                    selectedBHK === opt && { color: "#fff", fontWeight: "700" },
                  ]}
                >
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Sorting options */}
          <Text style={[styles.filterLabel, { color: colors.text, marginTop: 12 }]}>Sort By</Text>
          <View style={styles.filterRow}>
            {sortOptions.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.filterChip,
                  { backgroundColor: colors.background, borderColor: colors.border },
                  selectedSort === opt.value && { backgroundColor: colors.secondary, borderColor: colors.secondary },
                ]}
                onPress={() => setSelectedSort(opt.value)}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: colors.text },
                    selectedSort === opt.value && { color: "#fff", fontWeight: "700" },
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* CATEGORIES HORIZONTAL VIEW */}
      <View style={{ height: 50, marginTop: 8 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setSelectedCategory(item)}
              style={[
                styles.categoryChip,
                { backgroundColor: colors.cardBg, borderColor: colors.border },
                selectedCategory === item && [styles.activeChip, { backgroundColor: colors.primary, borderColor: colors.primary }],
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  { color: colors.text },
                  selectedCategory === item && styles.activeChipText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* RESULTS COUNT */}
      <View style={styles.resultHeader}>
        <Text style={[styles.resultText, { color: colors.primary }]}>
          {filteredProperties.length} Properties Found
        </Text>
      </View>

      {/* LIST OF PROPERTIES */}
      <FlatList
        data={filteredProperties}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyStateContainer}>
            <View style={[styles.emptyIconBox, { backgroundColor: colors.cardBg }]}>
              <Ionicons name="search" size={50} color={colors.secondary} />
            </View>
            <Text style={[styles.emptyStateTitle, { color: colors.text }]}>No Matches Found</Text>
            <Text style={[styles.emptyStateSubtitle, { color: colors.mutedText }]}>
              We couldn't find any properties matching your current filters. Try widening your budget or search term.
            </Text>
            <TouchableOpacity
              style={[styles.resetBtn, { backgroundColor: colors.primary }]}
              onPress={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedBHK("Any");
                setSelectedBudgetIdx(0);
                setSelectedSort("featured");
              }}
            >
              <Text style={styles.resetBtnText}>Clear All Filters</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
            onPress={() =>
              navigation.navigate("PropertyDetail", { propertyId: item.id })
            }
          >
            <View>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
              />

              <TouchableOpacity
                style={[styles.heartBtn, { backgroundColor: colors.cardBg }]}
                onPress={() => toggleShortlist(item.id)}
              >
                <Ionicons
                  name={isShortlisted(item.id) ? "heart" : "heart-outline"}
                  size={18}
                  color={isShortlisted(item.id) ? "#EF4444" : colors.text}
                />
              </TouchableOpacity>

              <View style={styles.quickBadge}>
                <Text style={styles.quickBadgeText}>Available</Text>
              </View>
            </View>

            <View style={styles.cardContent}>
              <View style={styles.priceRow}>
                <Text style={[styles.price, { color: colors.primary }]}>
                  {item.price}
                </Text>
                <Text style={[styles.areaText, { color: colors.mutedText }]}>
                  {item.id === "1" ? "1,850 sq.ft" : item.id === "2" ? "3,200 sq.ft" : "1,100 sq.ft"}
                </Text>
              </View>

              <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
                {item.title}
              </Text>

              <Text style={[styles.location, { color: colors.mutedText }]} numberOfLines={1}>
                📍 {item.location}
              </Text>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              <View style={styles.bottomRow}>
                <View style={[styles.badge, { backgroundColor: colors.secondary }]}>
                  <Text style={styles.badgeText}>
                    {item.bhk}
                  </Text>
                </View>

                <View style={styles.viewRow}>
                  <Text style={[styles.viewText, { color: colors.primary }]}>
                    View Details
                  </Text>
                  <Ionicons name="arrow-forward" size={14} color={colors.primary} style={{ marginLeft: 4 }} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
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
  },

  heading: {
    fontSize: 24,
    fontWeight: "800",
  },

  subHeading: {
    fontSize: 13,
    marginTop: 2,
  },

  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },

  filterText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  searchBox: {
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 52,
    alignItems: "center",
    flexDirection: "row",
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    height: "100%",
  },

  filtersCard: {
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },

  filterLabel: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 8,
  },

  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 4,
  },

  filterChip: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 6,
  },

  chipText: {
    fontSize: 11,
    fontWeight: "600",
  },

  categoryContainer: {
    paddingVertical: 5,
  },

  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 8,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },

  activeChip: {
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },

  categoryText: {
    fontWeight: "700",
    fontSize: 13,
  },

  activeChipText: {
    color: "#fff",
  },

  resultHeader: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 8,
  },

  resultText: {
    fontWeight: "700",
    fontSize: 13,
  },

  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  card: {
    borderRadius: 24,
    marginBottom: 16,
    borderWidth: 1,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 200,
  },

  heartBtn: {
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

  quickBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  quickBadgeText: {
    color: "#1E293B",
    fontSize: 10,
    fontWeight: "800",
  },

  cardContent: {
    padding: 16,
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  price: {
    fontSize: 20,
    fontWeight: "800",
  },

  areaText: {
    fontSize: 12,
    fontWeight: "700",
  },

  title: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "700",
  },

  location: {
    marginTop: 4,
    fontSize: 12,
  },

  divider: {
    height: 0.5,
    marginVertical: 12,
    opacity: 0.5,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 11,
  },

  viewRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  viewText: {
    fontWeight: "700",
    fontSize: 13,
  },

  /* EMPTY STATE */
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },

  emptyIconBox: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 4,
    elevation: 1,
  },

  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "800",
  },

  emptyStateSubtitle: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    marginTop: 8,
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  resetBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  resetBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
});