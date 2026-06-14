import { View, Text, StyleSheet, ImageBackground, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { useTheme } from "../theme/ThemeContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export default function SplashScreen({ navigation }: any) {
  const { colors } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Onboarding");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.logo}>PropVault</Text>

          <Text style={styles.tagline}>
            Premium Properties. Smarter Decisions.
          </Text>
        </View>

        <View style={styles.footer}>
          <ActivityIndicator
            size="small"
            color={colors.accent}
          />

          <Text style={styles.loadingText}>
            Loading Properties...
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.72)",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 90,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    fontSize: 42,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 1,
  },

  tagline: {
    marginTop: 12,
    fontSize: 16,
    color: "#E5E7EB",
    textAlign: "center",
    paddingHorizontal: 40,
  },

  footer: {
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "#D1D5DB",
    fontSize: 13,
    letterSpacing: 0.5,
  },
});