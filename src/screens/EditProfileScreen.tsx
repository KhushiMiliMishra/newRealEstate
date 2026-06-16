import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function EditProfileScreen({ navigation }: any) {
  const { colors, isDark } = useTheme();
  const { user, profile, updateProfile } = useAuth();

  // Basic Account Details
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  // Preferences (Customer Profile Table alignment)
  const [minBudget, setMinBudget] = useState(profile?.minBudget?.toString() || "5000000");
  const [maxBudget, setMaxBudget] = useState(profile?.maxBudget?.toString() || "25000000");
  const [locality, setLocality] = useState(profile?.preferredLocality || "");
  const [propertyType, setPropertyType] = useState(profile?.preferredPropertyType || "Villa");
  const [transactionType, setTransactionType] = useState(profile?.preferredTransactionType || "BUY");

  const handleSave = async () => {
    if (!fullName || !email || !phone || !locality) {
      Alert.alert("Missing Fields", "Please fill in all details before saving.");
      return;
    }

    const minB = parseFloat(minBudget) || 0;
    const maxB = parseFloat(maxBudget) || 0;

    await updateProfile({
      fullName,
      email,
      phone,
      minBudget: minB,
      maxBudget: maxB,
      preferredLocality: locality,
      preferredPropertyType: propertyType,
      preferredTransactionType: transactionType,
    });

    Alert.alert("Success", "Search preferences updated successfully!", [
      { text: "OK", onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons
              name="arrow-back"
              size={22}
              color={colors.text}
            />
          </TouchableOpacity>

          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Edit Preferences
          </Text>

          <View style={{ width: 40 }} />
        </View>

        {/* ACCOUNT INFO CARD */}
        <View style={[styles.sectionCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Text style={[styles.sectionLabel, { color: colors.primary }]}>Basic Account Details</Text>
          
          <Text style={[styles.inputLabel, { color: colors.text }]}>Full Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? "#0F172A" : "#F3F4F6", color: colors.text, borderColor: colors.border }]}
            value={fullName}
            onChangeText={setFullName}
            placeholder="John Anderson"
            placeholderTextColor={colors.mutedText}
          />

          <Text style={[styles.inputLabel, { color: colors.text }]}>Email Address</Text>
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? "#0F172A" : "#F3F4F6", color: colors.text, borderColor: colors.border }]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="john@example.com"
            placeholderTextColor={colors.mutedText}
          />

          <Text style={[styles.inputLabel, { color: colors.text }]}>Phone Number</Text>
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? "#0F172A" : "#F3F4F6", color: colors.text, borderColor: colors.border }]}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="+91 9876543210"
            placeholderTextColor={colors.mutedText}
          />
        </View>

        {/* SEARCH MATCH PREFERENCES CARD */}
        <View style={[styles.sectionCard, { backgroundColor: colors.cardBg, borderColor: colors.border, marginTop: 15 }]}>
          <Text style={[styles.sectionLabel, { color: colors.primary }]}>Customer Search Profile</Text>

          {/* Deal Mode */}
          <Text style={[styles.inputLabel, { color: colors.text }]}>Transaction Type</Text>
          <View style={styles.toggleRow}>
            {["BUY", "RENT", "LEASE"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.toggleButton,
                  { borderColor: colors.border, backgroundColor: isDark ? "#0F172A" : "#F3F4F6" },
                  transactionType === type && { backgroundColor: colors.secondary, borderColor: colors.secondary }
                ]}
                onPress={() => setTransactionType(type)}
              >
                <Text style={[
                  styles.toggleText,
                  { color: colors.text },
                  transactionType === type && { color: "#fff", fontWeight: "700" }
                ]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Property Type */}
          <Text style={[styles.inputLabel, { color: colors.text }]}>Preferred Property Type</Text>
          <View style={styles.toggleRow}>
            {["Apartment", "Villa", "Plot", "Commercial"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.toggleButton,
                  { borderColor: colors.border, backgroundColor: isDark ? "#0F172A" : "#F3F4F6", paddingHorizontal: 6 },
                  propertyType === type && { backgroundColor: colors.secondary, borderColor: colors.secondary }
                ]}
                onPress={() => setPropertyType(type)}
              >
                <Text style={[
                  styles.toggleText,
                  { color: colors.text, fontSize: 10 },
                  propertyType === type && { color: "#fff", fontWeight: "700" }
                ]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Locality */}
          <Text style={[styles.inputLabel, { color: colors.text }]}>Locality Preference</Text>
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? "#0F172A" : "#F3F4F6", color: colors.text, borderColor: colors.border }]}
            value={locality}
            onChangeText={setLocality}
            placeholder="e.g. ECR, Chennai"
            placeholderTextColor={colors.mutedText}
          />

          {/* Budget Limits */}
          <Text style={[styles.inputLabel, { color: colors.text }]}>Budget Range (INR ₹)</Text>
          <View style={styles.budgetRow}>
            <View style={{ flex: 1, marginRight: 6 }}>
              <Text style={[styles.subLabel, { color: colors.mutedText }]}>Min Budget</Text>
              <TextInput
                style={[styles.input, { backgroundColor: isDark ? "#0F172A" : "#F3F4F6", color: colors.text, borderColor: colors.border }]}
                value={minBudget}
                onChangeText={setMinBudget}
                keyboardType="numeric"
              />
            </View>
            <View style={{ flex: 1, marginLeft: 6 }}>
              <Text style={[styles.subLabel, { color: colors.mutedText }]}>Max Budget</Text>
              <TextInput
                style={[styles.input, { backgroundColor: isDark ? "#0F172A" : "#F3F4F6", color: colors.text, borderColor: colors.border }]}
                value={maxBudget}
                onChangeText={setMaxBudget}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* SAVE CTA */}
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors.primary }]}
          onPress={handleSave}
        >
          <Ionicons name="checkmark-circle-outline" size={20} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.saveText}>
            Save Preferences
          </Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scroll: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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

  sectionCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },

  sectionLabel: {
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 16,
    letterSpacing: 0.5,
  },

  inputLabel: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
    marginTop: 8,
  },

  subLabel: {
    fontSize: 10,
    fontWeight: "600",
    marginBottom: 4,
  },

  input: {
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    fontSize: 13,
    marginBottom: 8,
  },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  toggleButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
  },

  toggleText: {
    fontSize: 11,
    fontWeight: "600",
  },

  budgetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  saveButton: {
    flexDirection: "row",
    marginTop: 25,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  saveText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});