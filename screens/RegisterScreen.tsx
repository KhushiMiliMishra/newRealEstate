import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function RegisterScreen({ navigation }: any) {
  const { colors: themeColors, isDark } = useTheme();
  const { register } = useAuth();

  // Basic Details
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Preference Details
  const [minBudget, setMinBudget] = useState("5000000"); // 50 L
  const [maxBudget, setMaxBudget] = useState("25000000"); // 2.5 Cr
  const [preferredLocality, setPreferredLocality] = useState("OMR, Chennai");
  const [preferredPropertyType, setPreferredPropertyType] = useState("Villa");
  const [preferredTransactionType, setPreferredTransactionType] = useState("BUY");

  const [step, setStep] = useState(1);

  const handleRegister = async () => {
    if (!fullName || !email || !phone || !password) {
      alert("Please fill all account details.");
      return;
    }
    
    const parsedMin = parseFloat(minBudget) || 0;
    const parsedMax = parseFloat(maxBudget) || 0;

    const success = await register({
      fullName,
      email,
      phone,
      role: "CUSTOMER",
      minBudget: parsedMin,
      maxBudget: parsedMax,
      preferredLocality,
      preferredPropertyType,
      preferredTransactionType,
    });

    if (success) {
      navigation.replace("Main");
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.logo, { color: themeColors.primary }]}>PropVault</Text>

          <Text style={[styles.title, { color: themeColors.text }]}>
            {step === 1 ? "Create Account" : "Specify Preferences"}
          </Text>

          <Text style={[styles.subtitle, { color: themeColors.mutedText }]}>
            {step === 1 
              ? "Join thousands of buyers and renters finding premium properties."
              : "Help us match the best properties based on your exact budget and search criteria."
            }
          </Text>
        </View>

        {/* Step Indicator */}
        <View style={styles.stepIndicatorContainer}>
          <View style={[styles.stepIndicatorLine, { backgroundColor: themeColors.border }]} />
          <View style={[styles.stepDot, { backgroundColor: themeColors.primary }]} />
          <View style={[styles.stepDot, { backgroundColor: step === 2 ? themeColors.primary : themeColors.border }]} />
        </View>

        <View style={[styles.card, { backgroundColor: themeColors.cardBg, borderColor: themeColors.border }]}>
          {step === 1 ? (
            /* STEP 1: BASIC DETAILS */
            <View>
              <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Account Details</Text>
              
              <TextInput
                placeholder="Full Name"
                placeholderTextColor={themeColors.mutedText}
                style={[styles.input, { backgroundColor: isDark ? "#1E293B" : "#F3F4F6", color: themeColors.text }]}
                value={fullName}
                onChangeText={setFullName}
              />

              <TextInput
                placeholder="Email Address"
                placeholderTextColor={themeColors.mutedText}
                keyboardType="email-address"
                autoCapitalize="none"
                style={[styles.input, { backgroundColor: isDark ? "#1E293B" : "#F3F4F6", color: themeColors.text }]}
                value={email}
                onChangeText={setEmail}
              />

              <TextInput
                placeholder="Phone Number"
                placeholderTextColor={themeColors.mutedText}
                keyboardType="phone-pad"
                style={[styles.input, { backgroundColor: isDark ? "#1E293B" : "#F3F4F6", color: themeColors.text }]}
                value={phone}
                onChangeText={setPhone}
              />

              <TextInput
                placeholder="Password"
                placeholderTextColor={themeColors.mutedText}
                secureTextEntry
                style={[styles.input, { backgroundColor: isDark ? "#1E293B" : "#F3F4F6", color: themeColors.text }]}
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity
                style={[styles.nextButton, { backgroundColor: themeColors.primary }]}
                onPress={() => {
                  if (fullName && email && phone && password) {
                    setStep(2);
                  } else {
                    alert("Please fill out all fields.");
                  }
                }}
              >
                <Text style={styles.buttonText}>
                  Continue Preferences →
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            /* STEP 2: PREFERENCES (DB ALIGNED) */
            <View>
              <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Customer Profile Setup</Text>

              {/* Transaction Type */}
              <Text style={[styles.label, { color: themeColors.text }]}>Transaction Type</Text>
              <View style={styles.toggleRow}>
                {["BUY", "RENT", "LEASE"].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.toggleButton,
                      { borderColor: themeColors.border, backgroundColor: isDark ? "#1E293B" : "#F3F4F6" },
                      preferredTransactionType === type && { backgroundColor: themeColors.secondary, borderColor: themeColors.secondary }
                    ]}
                    onPress={() => setPreferredTransactionType(type)}
                  >
                    <Text style={[
                      styles.toggleText,
                      { color: themeColors.text },
                      preferredTransactionType === type && { color: "#fff", fontWeight: "700" }
                    ]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Property Type */}
              <Text style={[styles.label, { color: themeColors.text }]}>Property Type</Text>
              <View style={styles.toggleRow}>
                {["Apartment", "Villa", "Plot", "Commercial"].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.toggleButton,
                      { borderColor: themeColors.border, backgroundColor: isDark ? "#1E293B" : "#F3F4F6", paddingHorizontal: 10 },
                      preferredPropertyType === type && { backgroundColor: themeColors.secondary, borderColor: themeColors.secondary }
                    ]}
                    onPress={() => setPreferredPropertyType(type)}
                  >
                    <Text style={[
                      styles.toggleText,
                      { color: themeColors.text, fontSize: 11 },
                      preferredPropertyType === type && { color: "#fff", fontWeight: "700" }
                    ]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Preferred Locality */}
              <Text style={[styles.label, { color: themeColors.text }]}>Preferred Locality</Text>
              <TextInput
                placeholder="e.g., OMR, Anna Nagar, ECR"
                placeholderTextColor={themeColors.mutedText}
                style={[styles.input, { backgroundColor: isDark ? "#1E293B" : "#F3F4F6", color: themeColors.text }]}
                value={preferredLocality}
                onChangeText={setPreferredLocality}
              />

              {/* Budget Range */}
              <Text style={[styles.label, { color: themeColors.text }]}>Budget (INR ₹)</Text>
              <View style={styles.budgetRow}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={[styles.subLabel, { color: themeColors.mutedText }]}>Min Budget</Text>
                  <TextInput
                    placeholder="Min (e.g. 5000000)"
                    placeholderTextColor={themeColors.mutedText}
                    keyboardType="numeric"
                    style={[styles.input, { backgroundColor: isDark ? "#1E293B" : "#F3F4F6", color: themeColors.text }]}
                    value={minBudget}
                    onChangeText={setMinBudget}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={[styles.subLabel, { color: themeColors.mutedText }]}>Max Budget</Text>
                  <TextInput
                    placeholder="Max (e.g. 25000000)"
                    placeholderTextColor={themeColors.mutedText}
                    keyboardType="numeric"
                    style={[styles.input, { backgroundColor: isDark ? "#1E293B" : "#F3F4F6", color: themeColors.text }]}
                    value={maxBudget}
                    onChangeText={setMaxBudget}
                  />
                </View>
              </View>
              
              <View style={styles.navigationRow}>
                <TouchableOpacity
                  style={[styles.backStepButton, { borderColor: themeColors.primary }]}
                  onPress={() => setStep(1)}
                >
                  <Text style={[styles.backStepText, { color: themeColors.primary }]}>← Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.registerButton, { backgroundColor: themeColors.primary }]}
                  onPress={handleRegister}
                >
                  <Text style={styles.buttonText}>
                    Finish & Register
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{ marginTop: 20 }}
          >
            <Text style={[styles.loginLink, { color: themeColors.mutedText }]}>
              Already have an account?{" "}
              <Text style={[styles.loginHighlight, { color: themeColors.primary }]}>
                Login
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

  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 30,
  },

  header: {
    marginBottom: 20,
  },

  logo: {
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 22,
  },

  stepIndicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },

  stepIndicatorLine: {
    position: "absolute",
    height: 2,
    width: 60,
    zIndex: 1,
  },

  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 20,
    zIndex: 2,
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

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 16,
    letterSpacing: 0.5,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 6,
  },

  subLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 4,
  },

  input: {
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,
    fontSize: 14,
    height: 52,
  },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  toggleButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 3,
  },

  toggleText: {
    fontSize: 12,
    fontWeight: "600",
  },

  budgetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  nextButton: {
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },

  navigationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },

  backStepButton: {
    flex: 1,
    borderWidth: 1.5,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginRight: 8,
  },

  backStepText: {
    fontWeight: "700",
  },

  registerButton: {
    flex: 2,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginLeft: 8,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  loginLink: {
    textAlign: "center",
    fontSize: 14,
  },

  loginHighlight: {
    fontWeight: "700",
  },
});