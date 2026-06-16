import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { properties } from "../data/properties";

export default function AgentProfileScreen({ route, navigation }: any) {
  const { colors, isDark } = useTheme();

  // Route parameters or fallbacks
  const agentName = route.params?.agentName || "Sarah Wilson";
  const agentAvatar = route.params?.agentAvatar || "https://i.pravatar.cc/300?img=5";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>

          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Agent Profile
          </Text>

          <TouchableOpacity style={styles.backBtn}>
            <Ionicons
              name="share-social-outline"
              size={22}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>

        {/* AGENT CARD */}
        <View style={[styles.agentCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Image
            source={{ uri: agentAvatar }}
            style={styles.avatar}
          />

          <Text style={[styles.agentName, { color: colors.text }]}>
            {agentName}
          </Text>

          <Text style={[styles.agentRole, { color: colors.mutedText }]}>
            Senior Property Consultant • PropVault
          </Text>

          <View style={styles.ratingRow}>
            <Ionicons
              name="star"
              size={18}
              color="#FFD700"
            />
            <Text style={[styles.rating, { color: colors.text }]}>
              4.9 (248 Reviews)
            </Text>
          </View>
        </View>

        {/* STATS */}
        <View style={styles.statsContainer}>
          <View style={[styles.statBox, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              8+
            </Text>
            <Text style={[styles.statLabel, { color: colors.mutedText }]}>
              Years Exp
            </Text>
          </View>

          <View style={[styles.statBox, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              320+
            </Text>
            <Text style={[styles.statLabel, { color: colors.mutedText }]}>
              Sold
            </Text>
          </View>

          <View style={[styles.statBox, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              98%
            </Text>
            <Text style={[styles.statLabel, { color: colors.mutedText }]}>
              Success
            </Text>
          </View>
        </View>

        {/* ABOUT */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          About Agent
        </Text>

        <View style={[styles.sectionCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Text style={[styles.description, { color: colors.mutedText }]}>
            {agentName} specializes in luxury villas, premium apartments, and investment properties. With a deep understanding of local Chennai micro-markets (OMR, ECR, and Anna Nagar), they help buyers navigate their home-buying journey seamlessly.
          </Text>
        </View>

        {/* CONTACT */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Contact Information
        </Text>

        <View style={[styles.sectionCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <InfoRow
            icon="call-outline"
            text="+91 98765 43210"
            colors={colors}
          />

          <InfoRow
            icon="mail-outline"
            text={`${agentName.toLowerCase().replace(" ", ".")}@propvault.com`}
            colors={colors}
          />

          <InfoRow
            icon="location-outline"
            text="Chennai, Tamil Nadu"
            colors={colors}
          />
        </View>

        {/* ACTIVE LISTINGS */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Active Listings
        </Text>

        <FlatList
          horizontal
          data={properties}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.propertyCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
              onPress={() =>
                navigation.navigate("PropertyDetail", { propertyId: item.id })
              }
            >
              <Image
                source={{ uri: item.image }}
                style={styles.propertyImage}
              />

              <View style={styles.propertyContent}>
                <Text style={[styles.price, { color: colors.primary }]}>
                  {item.price}
                </Text>

                <Text
                  numberOfLines={1}
                  style={[styles.propertyTitleText, { color: colors.text }]}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* BOTTOM ACTIONS */}
      <View style={[styles.bottomBar, { backgroundColor: colors.cardBg, borderTopColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.messageBtn, { borderColor: colors.primary }]}
          onPress={() =>
            navigation.navigate("Messages")
          }
        >
          <Ionicons
            name="chatbubble-outline"
            size={20}
            color={colors.primary}
          />

          <Text style={[styles.messageText, { color: colors.primary }]}>
            Message
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.scheduleBtn, { backgroundColor: colors.primary }]}
          onPress={() =>
            navigation.navigate("ScheduleViewing", {
              agentName: agentName,
            })
          }
        >
          <Text style={styles.scheduleText}>
            Schedule Visit
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function InfoRow({
  icon,
  text,
  colors,
}: {
  icon: any;
  text: string;
  colors: any;
}) {
  return (
    <View style={styles.infoRow}>
      <Ionicons
        name={icon}
        size={18}
        color={colors.secondary}
      />
      <Text style={[styles.infoText, { color: colors.text }]}>
        {text}
      </Text>
    </View>
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
    paddingVertical: 10,
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

  agentCard: {
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 3,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  agentName: {
    marginTop: 14,
    fontSize: 20,
    fontWeight: "800",
  },

  agentRole: {
    marginTop: 4,
    fontSize: 13,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  rating: {
    marginLeft: 6,
    fontWeight: "700",
    fontSize: 13,
  },

  statsContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 16,
    justifyContent: "space-between",
  },

  statBox: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 2,
    elevation: 1,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "800",
  },

  statLabel: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: "600",
  },

  sectionTitle: {
    marginTop: 24,
    marginBottom: 10,
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  sectionCard: {
    marginHorizontal: 20,
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
  },

  description: {
    lineHeight: 22,
    fontSize: 13,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  infoText: {
    marginLeft: 12,
    fontSize: 13,
    fontWeight: "600",
  },

  propertyCard: {
    width: 200,
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
    marginRight: 12,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },

  propertyImage: {
    width: "100%",
    height: 120,
  },

  propertyContent: {
    padding: 12,
  },

  price: {
    fontSize: 14,
    fontWeight: "800",
  },

  propertyTitleText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "700",
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
  },

  messageBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 16,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 14,
  },

  messageText: {
    marginLeft: 8,
    fontWeight: "700",
    fontSize: 14,
  },

  scheduleBtn: {
    flex: 2,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  scheduleText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 14,
  },
});