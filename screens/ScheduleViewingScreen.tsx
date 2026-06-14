import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../theme/ThemeContext";
import { createViewingRequest } from "../services/viewingService";

const timeSlots = [
  "09:00 AM",
  "11:00 AM",
  "01:00 PM",
  "03:00 PM",
  "05:00 PM",
  "07:00 PM",
];

const generateNextDays = () => {
  const days = [];
  const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  for (let i = 1; i <= 6; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);

    days.push({
      fullDateString: `${weekdayNames[d.getDay()]}, ${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`,
      dayName: weekdayNames[d.getDay()],
      dateNum: d.getDate(),
      month: monthNames[d.getMonth()],
    });
  }

  return days;
};

export default function ScheduleViewingScreen({
  route,
  navigation,
}: any) {

  const { colors, isDark } = useTheme();

  const [selectedSlot, setSelectedSlot] =
    useState("11:00 AM");

  const [selectedDateIdx, setSelectedDateIdx] =
    useState(0);

  const [notes, setNotes] =
    useState("");

  const [calendarDays, setCalendarDays] =
    useState<ReturnType<typeof generateNextDays>>([]);

  const propertyId =
    route.params?.propertyId;

  const propertyTitle =
    route.params?.propertyTitle ||
    "Property";

  const propertyPrice =
    route.params?.propertyPrice ||
    "₹0";

  const propertyLocation =
    route.params?.propertyLocation ||
    "Unknown";

  const agentName =
    route.params?.agentName ||
    "Agent";

  useEffect(() => {
    setCalendarDays(generateNextDays());
  }, []);
const handleConfirmVisit = async () => {

  try {

    if (!selectedSlot) {
      Alert.alert(
        "Time Slot Needed",
        "Please select a preferred time slot."
      );
      return;
    }

    if (calendarDays.length === 0) {
      return;
    }

    const chosenDate =
      calendarDays[selectedDateIdx]
        .fullDateString;

    await createViewingRequest({
      propertyId,
      propertyTitle,
      propertyPrice,
      propertyLocation,
      date: chosenDate,
      time: selectedSlot,
      notes,
      agentName,
    });

    Alert.alert(
      "Viewing Scheduled!",
      `Your site visit request for "${propertyTitle}" has been submitted for ${chosenDate} at ${selectedSlot}.`,
      [
        {
          text: "Great",
          onPress: () => navigation.goBack(),
        },
      ]
    );

  } catch (error) {

    console.error(
      "VIEWING ERROR:",
      error
    );

    Alert.alert(
      "Error",
      "Failed to schedule viewing."
    );
  }
};

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: colors.cardBg }]}>
            <Ionicons
              name="arrow-back"
              size={20}
              color={colors.text}
            />
          </TouchableOpacity>

          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Schedule Viewing
          </Text>

          <View style={{ width: 40 }} />
        </View>

        {/* PROPERTY MINI CARD */}
        <View style={[styles.propertyCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <View style={styles.propHeaderRow}>
            <Text style={[styles.propertyPrice, { color: colors.primary }]}>
              {propertyPrice}
            </Text>
            <View style={[styles.badge, { backgroundColor: colors.secondary }]}>
              <Text style={styles.badgeText}>Site Visit</Text>
            </View>
          </View>

          <Text style={[styles.propertyTitleText, { color: colors.text }]}>
            {propertyTitle}
          </Text>

          <Text style={[styles.locationText, { color: colors.mutedText }]}>
            📍 {propertyLocation}
          </Text>
        </View>

        {/* DYNAMIC DATE PICKER CHIPS */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Select Visit Date
        </Text>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateScroll}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {calendarDays.map((day, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.dateChip,
                { backgroundColor: colors.cardBg, borderColor: colors.border },
                selectedDateIdx === idx && { backgroundColor: colors.primary, borderColor: colors.primary }
              ]}
              onPress={() => setSelectedDateIdx(idx)}
            >
              <Text style={[
                styles.dayNameText, 
                { color: colors.mutedText },
                selectedDateIdx === idx && { color: "rgba(255,255,255,0.8)" }
              ]}>
                {day.dayName}
              </Text>
              
              <Text style={[
                styles.dateNumText, 
                { color: colors.text },
                selectedDateIdx === idx && { color: "#fff", fontWeight: "800" }
              ]}>
                {day.dateNum}
              </Text>
              
              <Text style={[
                styles.monthText, 
                { color: colors.mutedText },
                selectedDateIdx === idx && { color: "rgba(255,255,255,0.8)" }
              ]}>
                {day.month}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* TIME SLOTS */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Available Time Slots
        </Text>

        <View style={styles.slotContainer}>
          {timeSlots.map((slot) => (
            <TouchableOpacity
              key={slot}
              style={[
                styles.slotChip,
                { backgroundColor: colors.cardBg, borderColor: colors.border },
                selectedSlot === slot && { backgroundColor: colors.secondary, borderColor: colors.secondary },
              ]}
              onPress={() => setSelectedSlot(slot)}
            >
              <Text
                style={[
                  styles.slotText,
                  { color: colors.text },
                  selectedSlot === slot && { color: "#fff", fontWeight: "700" },
                ]}
              >
                {slot}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* NOTES */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Additional Notes for Agent
        </Text>

        <TextInput
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
          placeholder="e.g. 'I am coming with my family, want to inspect surrounding green area...'"
          placeholderTextColor={colors.mutedText}
          style={[styles.notesInput, { backgroundColor: colors.cardBg, borderColor: colors.border, color: colors.text }]}
        />

        {/* AGENT CARD */}
        <View style={[styles.agentCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <View style={[styles.agentAvatarBox, { backgroundColor: colors.background }]}>
            <Ionicons
              name="person-outline"
              size={20}
              color={colors.primary}
            />
          </View>

          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={[styles.agentName, { color: colors.text }]}>
              {agentName}
            </Text>

            <Text style={[styles.agentRole, { color: colors.mutedText }]}>
              Assigned Real Estate Manager
            </Text>
          </View>

          <View style={styles.verifiedBadge}>
            <Ionicons name="shield-checkmark" size={14} color={colors.accent} />
            <Text style={[styles.verifiedText, { color: colors.accent }]}> Verified</Text>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* CTA */}
      <View style={[styles.bottomContainer, { backgroundColor: colors.cardBg, borderTopColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.confirmButton, { backgroundColor: colors.primary }]}
          onPress={handleConfirmVisit}
        >
          <Text style={styles.confirmText}>
            Confirm Visit Slot
          </Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: 10,
    paddingBottom: 10,
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

  propertyCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 10,
  },

  propHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  propertyPrice: {
    fontSize: 22,
    fontWeight: "900",
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
  },

  propertyTitleText: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 8,
  },

  locationText: {
    marginTop: 4,
    fontSize: 12,
  },

  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,
    marginHorizontal: 20,
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  dateScroll: {
    paddingBottom: 4,
  },

  dateChip: {
    width: 72,
    height: 94,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 2,
    elevation: 1,
  },

  dayNameText: {
    fontSize: 11,
    fontWeight: "700",
  },

  dateNumText: {
    fontSize: 20,
    fontWeight: "800",
    marginVertical: 4,
  },

  monthText: {
    fontSize: 10,
    fontWeight: "700",
  },

  slotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 20,
  },

  slotChip: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
  },

  slotText: {
    fontWeight: "700",
    fontSize: 12,
  },

  notesInput: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    textAlignVertical: "top",
    minHeight: 100,
    borderWidth: 1,
    fontSize: 14,
  },

  agentCard: {
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  agentAvatarBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  agentName: {
    fontSize: 14,
    fontWeight: "800",
  },

  agentRole: {
    marginTop: 2,
    fontSize: 12,
  },

  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
  },

  verifiedText: {
    fontSize: 11,
    fontWeight: "800",
  },

  bottomContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    elevation: 10,
  },

  confirmButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  confirmText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },
});