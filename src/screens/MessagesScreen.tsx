import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function MessagesScreen({ navigation }: any) {
  const { colors, isDark } = useTheme();
  const { chatRooms } = useAuth();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      <Text style={[styles.title, { color: colors.text }]}>
        Messages
      </Text>

      <Text style={[styles.subtitle, { color: colors.mutedText }]}>
        Stay connected with premium property agents
      </Text>

      {chatRooms.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={[styles.emptyIconBox, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <Ionicons name="chatbubble-ellipses-outline" size={50} color={colors.accent} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No Conversations Yet</Text>
          <Text style={[styles.emptySubtitle, { color: colors.mutedText }]}>
            Start a chat with an agent directly from any Property Detail screen to ask questions or negotiate.
          </Text>
        </View>
      ) : (
        <FlatList
          data={chatRooms}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.chatCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
              onPress={() =>
                navigation.navigate("ChatDetail", { roomId: item.id })
              }
            >
              <Image
                source={{ uri: item.agentAvatar }}
                style={styles.avatar}
              />

              <View style={styles.chatContent}>
                <View style={styles.topRow}>
                  <Text style={[styles.agentName, { color: colors.text }]}>
                    {item.agentName}
                  </Text>

                  <Text style={[styles.time, { color: colors.mutedText }]}>
                    {item.messages.length > 0 
                      ? item.messages[item.messages.length - 1].timestamp 
                      : "Now"
                    }
                  </Text>
                </View>

                <Text style={[styles.property, { color: colors.secondary }]} numberOfLines={1}>
                  {item.propertyTitle} • {item.propertyPrice}
                </Text>

                <Text
                  numberOfLines={1}
                  style={[styles.message, { color: colors.mutedText }]}
                >
                  {item.lastMessage}
                </Text>
              </View>

              <View style={styles.chevronBox}>
                <Ionicons name="chevron-forward" size={16} color={colors.mutedText} />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    marginTop: 15,
  },

  subtitle: {
    marginTop: 4,
    marginBottom: 20,
    fontSize: 13,
  },

  chatCard: {
    borderRadius: 20,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  chatContent: {
    flex: 1,
    marginLeft: 12,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  agentName: {
    fontSize: 14,
    fontWeight: "800",
  },

  property: {
    fontWeight: "700",
    fontSize: 11,
    marginTop: 3,
  },

  message: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "500",
  },

  time: {
    fontSize: 10,
    fontWeight: "600",
  },

  chevronBox: {
    paddingLeft: 6,
  },

  /* EMPTY STATES */
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
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
});