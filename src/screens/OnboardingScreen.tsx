import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { onboardingData } from "../data/onboardingData";
import { useTheme } from "../theme/ThemeContext";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen({ navigation }: any) {
  const { colors, isDark } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const currentSlide = onboardingData[activeIndex];

  const handleNext = () => {
    if (activeIndex < onboardingData.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Skip Button */}
      <TouchableOpacity
        style={styles.skipBtn}
        onPress={() => navigation.replace("Login")}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Background Image */}
      <Image
        source={{ uri: currentSlide.image }}
        style={styles.image}
      />

      {/* Overlay */}
      <View style={styles.overlay}>
        <View style={[styles.contentCard, { backgroundColor: colors.cardBg, borderColor: colors.border, borderWidth: isDark ? 1 : 0 }]}>
          <Text style={[styles.title, { color: colors.primary }]}>
            {currentSlide.title}
          </Text>

          <Text style={[styles.subtitle, { color: colors.text }]}>
            {currentSlide.subtitle}
          </Text>
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.dotsContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndex === index
                  ? [styles.activeDot, { backgroundColor: colors.primary }]
                  : { backgroundColor: isDark ? "#334155" : "#D1D5DB" },
              ]}
            />
          ))}
        </View>

        {activeIndex !== onboardingData.length - 1 ? (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>
              Next
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => navigation.replace("Login")}
          >
            <Text style={styles.buttonText}>
              Get Started
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    width,
    height: height * 0.6,
    resizeMode: "cover",
  },

  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingHorizontal: 24,
    paddingBottom: 180,
  },

  contentCard: {
    padding: 24,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.8,
  },

  skipBtn: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 100,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
  },

  skipText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  bottomSection: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    alignItems: "center",
  },

  dotsContainer: {
    flexDirection: "row",
    marginBottom: 25,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },

  activeDot: {
    width: 24,
  },

  button: {
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});