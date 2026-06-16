import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { properties } from "../data/properties";

export default function ViewingHistoryScreen({ navigation }: any) {
  const { colors, isDark } = useTheme();
  const history = properties;

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
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>

        <Text style={[styles.title, { color: colors.text }]}>
          Viewing History
        </Text>

        <View style={{ width: 40 }} />
      </View>

      {/* HISTORY LIST */}
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: 20,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
            onPress={() =>
              navigation.navigate("PropertyDetail", { propertyId: item.id })
            }
          >
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />

            <View style={styles.content}>
              <Text style={[styles.price, { color: colors.primary }]}>
                {item.price}
              </Text>

              <Text style={[styles.propertyTitle, { color: colors.text }]}>
                {item.title}
              </Text>

              <Text style={[styles.location, { color: colors.mutedText }]}>
                📍 {item.location}
              </Text>

              <View style={styles.bottomRow}>
                <Text style={styles.viewedTime}>
                  Viewed 2 days ago
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={colors.primary}
                />
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
    paddingTop: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
  },

  card: {
    marginBottom: 16,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 180,
  },

  content: {
    padding: 16,
  },

  price: {
    fontSize: 20,
    fontWeight: "800",
  },

  propertyTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 5,
  },

  location: {
    marginTop: 5,
    fontSize: 12,
  },

  bottomRow: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  viewedTime: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "600",
  },
});