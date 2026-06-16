import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen({ navigation }: any) {
  const { colors, isDark } = useTheme();
  const { login } = useAuth();
  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("password");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all credentials.");
      return;
    }
    const success = await login(email, password);
    if (success) {
      navigation.replace("Main");
    } else {
      Alert.alert("Error", "Invalid login credentials.");
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* LOGO */}
        <Text style={[styles.logo, { color: colors.primary }]}>PropVault</Text>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Welcome Back
          </Text>

          <Text style={[styles.subtitle, { color: colors.mutedText }]}>
            Sign in to continue exploring premium properties and discover your dream home.
          </Text>
        </View>

        {/* LOGIN CARD */}
        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <TextInput
            placeholder="Email Address"
            placeholderTextColor={colors.mutedText}
            style={[styles.input, { backgroundColor: isDark ? "#0F172A" : "#F3F4F6", color: colors.text, borderColor: colors.border }]}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor={colors.mutedText}
            secureTextEntry
            style={[styles.input, { backgroundColor: isDark ? "#0F172A" : "#F3F4F6", color: colors.text, borderColor: colors.border }]}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity onPress={() => Alert.alert("Forgot Password", "Password reset instructions sent to your email address.")}>
            <Text style={[styles.forgot, { color: colors.primary }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* LOGIN BUTTON */}
          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: colors.primary }]}
            onPress={handleLogin}
          >
            <Text style={styles.loginText}>
              Login
            </Text>
          </TouchableOpacity>

          {/* DIVIDER */}
          <View style={styles.dividerContainer}>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.mutedText }]}>
              OR
            </Text>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
          </View>

          {/* GOOGLE */}
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: isDark ? "#0F172A" : "#F8F9FA", borderColor: colors.border }]}
            onPress={() => navigation.replace("Main")}
          >
            <Text style={[styles.socialText, { color: colors.text }]}>
              Continue with Google
            </Text>
          </TouchableOpacity>

          {/* APPLE */}
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: isDark ? "#0F172A" : "#F8F9FA", borderColor: colors.border }]}
            onPress={() => navigation.replace("Main")}
          >
            <Text style={[styles.socialText, { color: colors.text }]}>
              Continue with Apple
            </Text>
          </TouchableOpacity>

          {/* REGISTER */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={[styles.registerLink, { color: colors.mutedText }]}>
              Don't have an account?{" "}
              <Text style={[styles.registerHighlight, { color: colors.primary }]}>
                Create One
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  logo: {
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 20,
  },

  header: {
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    paddingHorizontal: 12,
  },

  card: {
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },

  input: {
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 12,
    fontSize: 14,
    borderWidth: 0.5,
  },

  forgot: {
    alignSelf: "flex-end",
    fontWeight: "700",
    marginBottom: 20,
    fontSize: 13,
  },

  loginButton: {
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
  },

  loginText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  divider: {
    flex: 1,
    height: 0.5,
  },

  dividerText: {
    marginHorizontal: 12,
    fontWeight: "600",
    fontSize: 11,
  },

  socialButton: {
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
  },

  socialText: {
    fontWeight: "600",
    fontSize: 13,
  },

  registerLink: {
    textAlign: "center",
    marginTop: 18,
    fontSize: 13,
  },

  registerHighlight: {
    fontWeight: "700",
  },
});