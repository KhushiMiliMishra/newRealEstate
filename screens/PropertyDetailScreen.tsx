import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Share,
  Alert,
  Linking,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../theme/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { getPropertyById } from "../services/propertyService";

const { width } = Dimensions.get("window");

export default function PropertyDetailScreen({
  route,
  navigation,
}: any) {
  const { colors, isDark } = useTheme();
  const { toggleShortlist, isShortlisted, chatRooms } = useAuth();

  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [priceAlert, setPriceAlert] = useState(false);

  const propertyId = route.params?.propertyId;

  useEffect(() => {
    loadProperty();
  }, []);

  const loadProperty = async () => {
    try {
      const data = await getPropertyById(propertyId);
      

      console.log("PROPERTY DATA:", data);

      setProperty(data);
    } catch (error) {
      console.error("Error loading property", error);

      Alert.alert(
        "Error",
        "Failed to load property details"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </View>
    );
  }

  if (!property) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>No Property Found</Text>
      </View>
    );
  }
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this amazing property: ${property.title} at ${property.location} listed for ${property.price} on PropVault!`,
      });
    } catch (error) {
      console.warn(error);
    }
  };

  const handleChatAgent = () => {
    // Look for chat room with this agent
    const room = chatRooms.find((r: any) => r.agentName === property.agentName);
    if (room) {
      navigation.navigate("ChatDetail", { roomId: room.id });
    } else {
      // Create new roomId, navigate
      navigation.navigate("ChatDetail", { 
        roomId: "cr_new_" + property.id,
        agentName: property.agentName,
        agentAvatar: property.agentImage,
        propertyTitle: property.title,
        propertyPrice: property.price,
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available":
        return { text: "Available", color: isDark ? "rgba(34, 197, 94, 0.15)" : "#E8F5E9", textColor: "#22C55E" };
      case "Sold":
        return { text: "Sold", color: isDark ? "rgba(239, 68, 68, 0.15)" : "#FFEBEE", textColor: "#EF4444" };
      case "Rented":
        return { text: "Rented", color: isDark ? "rgba(245, 158, 11, 0.15)" : "#FFF3E0", textColor: "#F59E0B" };
      case "Reserved":
        return { text: "Reserved", color: isDark ? "rgba(59, 130, 246, 0.15)" : "#E3F2FD", textColor: "#3B82F6" };
      default:
        return { text: "Available", color: isDark ? "rgba(34, 197, 94, 0.15)" : "#E8F5E9", textColor: "#22C55E" };
    }
  };

  const badgeConfig = getStatusBadge(property?.status || "Available");

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* HERO IMAGE CAROUSEL */}
        <View style={styles.carouselContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(event) => {
              const slide = Math.round(event.nativeEvent.contentOffset.x / width);
              if (slide !== activeImageIndex) {
                setActiveImageIndex(slide);
              }
            }}
            scrollEventThrottle={16}
          >
            {property.images?.map((imgUrl: string, index: number) => (
              <Image 
                key={index} 
                source={{ uri: imgUrl }} 
                style={[styles.image, { width }]} 
              />
            ))}
          </ScrollView>

          {/* BACK BUTTON */}
          <TouchableOpacity 
            style={[styles.backBtn, { backgroundColor: "rgba(15, 23, 42, 0.65)" }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>

          {/* ACTION BUTTONS */}
          <View style={styles.actionHeaderBtns}>
            <TouchableOpacity 
              style={[styles.circleBtn, { backgroundColor: "rgba(15, 23, 42, 0.65)" }]}
              onPress={handleShare}
            >
              <Ionicons name="share-social-outline" size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.circleBtn, { backgroundColor: "rgba(15, 23, 42, 0.65)", marginLeft: 10 }]}
              onPress={() => toggleShortlist(property.id)}
            >
              <Ionicons 
                name={isShortlisted(property.id) ? "heart" : "heart-outline"} 
                size={20} 
                color={isShortlisted(property.id) ? "#EF4444" : "#fff"} 
              />
            </TouchableOpacity>
          </View>

          {/* INDICATOR DOTS */}
          <View style={styles.dotsRow}>
            {property.images?.map((_: string, index: number) => (
              <View 
                key={index}
                style={[
                  styles.dot, 
                  activeImageIndex === index 
                    ? { backgroundColor: colors.accent, width: 18 } 
                    : { backgroundColor: "rgba(255,255,255,0.4)" }
                ]}
              />
            ))}
          </View>
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          <View style={styles.rowTitleBadge}>
            <View style={[styles.statusBadge, { backgroundColor: badgeConfig.color }]}>
              <Text style={[styles.statusText, { color: badgeConfig.textColor }]}>
                {badgeConfig.text}
              </Text>
            </View>

            <TouchableOpacity 
              style={[styles.priceAlertBtn, { borderColor: colors.border, backgroundColor: colors.cardBg }]}
              onPress={() => {
                setPriceAlert(!priceAlert);
                Alert.alert("Price Alert", priceAlert ? "Price alert disabled" : "You will be notified when this property price drops!");
              }}
            >
              <Ionicons 
                name={priceAlert ? "notifications" : "notifications-outline"} 
                size={14} 
                color={priceAlert ? colors.accent : colors.secondary} 
              />
              <Text style={[styles.priceAlertText, { color: colors.text }]}>Alerts</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.titlePriceRow}>
            <Text style={[styles.title, { color: colors.text }]}>{property.title}</Text>
            <Text style={[styles.priceText, { color: colors.primary }]}>{property.price}</Text>
          </View>

          <Text style={[styles.location, { color: colors.mutedText }]}>
            📍 {property.location}
          </Text>

          {/* PROPERTY STATS */}
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
              <Ionicons name="bed-outline" size={20} color={colors.secondary} style={{ marginBottom: 6 }} />
              <Text style={[styles.statValue, { color: colors.text }]}>{property.bhk}</Text>
              <Text style={[styles.statLabel, { color: colors.mutedText }]}>Configuration</Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
              <Ionicons name="resize-outline" size={20} color={colors.secondary} style={{ marginBottom: 6 }} />
              <Text style={[styles.statValue, { color: colors.text }]}>{property.area}</Text>
              <Text style={[styles.statLabel, { color: colors.mutedText }]}>Super Area</Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
              <Ionicons name="calendar-outline" size={20} color={colors.secondary} style={{ marginBottom: 6 }} />
              <Text style={[styles.statValue, { color: colors.text }]}>{property.age}</Text>
              <Text style={[styles.statLabel, { color: colors.mutedText }]}>Property Age</Text>
            </View>
          </View>

          {/* DESCRIPTION */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Description</Text>
          <Text style={[styles.description, { color: colors.mutedText }]}>
            {property.description}
          </Text>

          {/* AMENITIES */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Premium Amenities</Text>
          <View style={styles.amenities}>
            {property.amenities?.map((item: string, index: number) => (
              <View key={index} style={[styles.amenityChip, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
                <Ionicons name="checkmark-circle-outline" size={14} color={colors.accent} style={{ marginRight: 6 }} />
                <Text style={[styles.amenityText, { color: colors.text }]}>{item}</Text>
              </View>
            ))}
          </View>

          {/* EXTERNAL LOCATION SECTION */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Property Location</Text>
          <View style={[styles.locationCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <View style={styles.locationHeaderRow}>
              <Ionicons name="location" size={22} color={colors.secondary} />
              <Text style={[styles.locationSubText, { color: colors.text }]}>{property.location}</Text>
            </View>
            
            <View style={styles.coordsRow}>
              <View style={styles.coordBox}>
                <Text style={[styles.coordLabel, { color: colors.mutedText }]}>Latitude</Text>
                <Text style={[styles.coordValue, { color: colors.text }]}>{property.latitude || 13.0827}</Text>
              </View>
              <View style={styles.coordBox}>
                <Text style={[styles.coordLabel, { color: colors.mutedText }]}>Longitude</Text>
                <Text style={[styles.coordValue, { color: colors.text }]}>{property.longitude || 80.2707}</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.mapsBtn, { backgroundColor: colors.primary }]}
              onPress={() => {
                const lat = property.latitude || 13.0827;
                const lng = property.longitude || 80.2707;
                const label = encodeURIComponent(property.title);
                const url = Platform.select({
                  ios: `maps://?q=${label}&ll=${lat},${lng}`,
                  android: `geo:0,0?q=${lat},${lng}(${label})`,
                  default: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
                });
                Linking.openURL(url || "").catch((err) => console.error("Could not open Google Maps", err));
              }}
            >
              <Ionicons name="map" size={18} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.mapsBtnText}>Open in Google Maps</Text>
            </TouchableOpacity>
          </View>

          {/* FLOOR PLANS */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Floor Plan</Text>
          <TouchableOpacity 
            style={[styles.floorPlanCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
            onPress={() => Alert.alert("Floor Plan", "Loading high-resolution architectural layout PDF...")}
          >
            <Ionicons name="document-text-outline" size={24} color={colors.secondary} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={[styles.floorPlanTitle, { color: colors.text }]}>Architectural Blueprints</Text>
              <Text style={[styles.floorPlanSubtitle, { color: colors.mutedText }]}>Download detailed BHK layout (PDF)</Text>
            </View>
            <Ionicons name="download-outline" size={20} color={colors.text} />
          </TouchableOpacity>

          {/* AGENT CARD */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Listed By Agent</Text>
          <View style={[styles.agentCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <TouchableOpacity onPress={() => navigation.navigate("AgentProfile", { agentName: property.agentName, agentAvatar: property.agentImage })}>
              <Image source={{ uri: property.agentImage }} style={styles.agentAvatar} />
            </TouchableOpacity>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.agentName, { color: colors.text }]}>{property.agentName}</Text>
              <Text style={[styles.agentRole, { color: colors.mutedText }]}>{property.agentRole}</Text>
              <View style={styles.agentRatingRow}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={[styles.agentRatingText, { color: colors.text }]}> 4.8 (120 reviews)</Text>
              </View>
            </View>

            <TouchableOpacity style={[styles.chatBtn, { backgroundColor: colors.secondary }]} onPress={handleChatAgent}>
              <Ionicons name="chatbubble-ellipses" size={16} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.chatText}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* STICKY CTA */}
      <View style={[styles.ctaContainer, { backgroundColor: colors.cardBg, borderTopColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.ctaButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate("ScheduleViewing", {
            propertyId: property.id,
            propertyTitle: property.title,
            propertyPrice: property.price,
            propertyLocation: property.location,
            agentName: property.agentName,
          })}
        >
          <Ionicons name="calendar-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.ctaText}>Schedule Site Viewing</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  carouselContainer: {
    position: "relative",
    height: 320,
  },

  image: {
    height: 320,
    resizeMode: "cover",
  },

  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  actionHeaderBtns: {
    position: "absolute",
    top: 50,
    right: 20,
    flexDirection: "row",
  },

  circleBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  dotsRow: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    flexDirection: "row",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },

  content: {
    padding: 20,
  },

  rowTitleBadge: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "800",
  },

  priceAlertBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 2,
    elevation: 1,
  },

  priceAlertText: {
    fontSize: 11,
    fontWeight: "700",
    marginLeft: 6,
  },

  titlePriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 6,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    flex: 1,
    marginRight: 12,
  },

  priceText: {
    fontSize: 22,
    fontWeight: "900",
  },

  location: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  statCard: {
    flex: 1,
    borderWidth: 1,
    marginHorizontal: 4,
    padding: 14,
    borderRadius: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.01,
    shadowRadius: 4,
    elevation: 1,
  },

  statValue: {
    fontWeight: "800",
    fontSize: 14,
  },

  statLabel: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: "600",
  },

  sectionTitle: {
    marginTop: 24,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  description: {
    lineHeight: 22,
    fontSize: 13,
  },

  amenities: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  amenityChip: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },

  amenityText: {
    fontSize: 12,
    fontWeight: "700",
  },

  locationCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },

  locationHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  locationSubText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "700",
  },

  coordsRow: {
    flexDirection: "row",
    marginBottom: 16,
  },

  coordBox: {
    flex: 1,
  },

  coordLabel: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 2,
  },

  coordValue: {
    fontSize: 14,
    fontWeight: "800",
  },

  mapsBtn: {
    flexDirection: "row",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  mapsBtnText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 14,
  },

  floorPlanCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 2,
    elevation: 1,
  },

  floorPlanTitle: {
    fontSize: 14,
    fontWeight: "800",
  },

  floorPlanSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },

  agentCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },

  agentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  agentName: {
    fontWeight: "800",
    fontSize: 15,
  },

  agentRole: {
    fontSize: 12,
    marginTop: 2,
  },

  agentRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  agentRatingText: {
    fontSize: 11,
    fontWeight: "700",
  },

  chatBtn: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },

  chatText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 12,
  },

  ctaContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    elevation: 10,
  },

  ctaButton: {
    flexDirection: "row",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  ctaText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
  },
});