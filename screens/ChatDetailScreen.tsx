import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function ChatDetailScreen({ route, navigation }: any) {
  const { colors, isDark } = useTheme();
  const { chatRooms, sendChatMessage } = useAuth();
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef<FlatList>(null);

  // Extract room ID or details passed from other screens
  const roomId = route.params?.roomId || "cr1";
  
  // Find current room in AuthState
  const currentRoom = chatRooms.find((r) => r.id === roomId);

  // Fallbacks if we started a new room from Property details
  const agentName = currentRoom?.agentName || route.params?.agentName || "Sarah Wilson";
  const agentAvatar = currentRoom?.agentAvatar || route.params?.agentAvatar || "https://i.pravatar.cc/300?img=5";
  const propertyTitle = currentRoom?.propertyTitle || route.params?.propertyTitle || "Luxury Sea View Apartment";
  const propertyPrice = currentRoom?.propertyPrice || route.params?.propertyPrice || "₹1.2 Cr";
  const messages = currentRoom?.messages || [
    {
      id: "init",
      messageId: "init",
      text: `Hello! I'm ${agentName}. How can I assist you regarding the "${propertyTitle}" today?`,
      sender: "agent" as const,
      senderType: "AGENT" as const,
      timestamp: "10:00 AM",
      conversationId: roomId,
    }
  ];

  useEffect(() => {
    // Scroll to bottom on load or messages length change
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendChatMessage(roomId, inputText.trim());
    setInputText("");
  };

  const getQuickReplies = () => {
    return [
      "Is this negotiable?",
      "When can I visit?",
      "Send floor plan",
      "Is it sold?"
    ];
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* HEADER */}
      <View style={[styles.header, { backgroundColor: colors.cardBg, borderBottomColor: colors.border }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backBtn, { backgroundColor: colors.background }]}
        >
          <Ionicons
            name="arrow-back"
            size={20}
            color={colors.text}
          />
        </TouchableOpacity>

        <Image
          source={{ uri: agentAvatar }}
          style={styles.avatar}
        />

        <View style={{ flex: 1 }}>
          <Text style={[styles.agentName, { color: colors.text }]}>
            {agentName}
          </Text>

          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <Text style={[styles.status, { color: colors.mutedText }]}>
              Online
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.callBtn, { backgroundColor: colors.background }]}
          onPress={() => Alert.alert("Dialer", "Initiating voice call to agent...")}
        >
          <Ionicons
            name="call-outline"
            size={18}
            color={colors.secondary}
          />
        </TouchableOpacity>
      </View>

      {/* PROPERTY BANNER IN CHAT */}
      <View style={[styles.propertyCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.propertyTitle, { color: colors.text }]} numberOfLines={1}>
            {propertyTitle}
          </Text>

          <Text style={[styles.propertyLocation, { color: colors.mutedText }]}>
            Agent Listing • {propertyPrice}
          </Text>
        </View>
        <TouchableOpacity 
          style={[styles.viewDetailsBtn, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate("PropertyDetail", { propertyId: route.params?.propertyId || "1" })}
        >
          <Text style={styles.viewDetailsText}>View</Text>
        </TouchableOpacity>
      </View>

      {/* CHAT MESSAGES */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id || item.messageId}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isUser = item.sender === "user";
          return (
            <View
              style={[
                styles.messageWrapper,
                isUser ? { alignItems: "flex-end" } : { alignItems: "flex-start" }
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  isUser
                    ? [styles.userBubble, { backgroundColor: colors.primary }]
                    : [styles.agentBubble, { backgroundColor: colors.cardBg, borderColor: colors.border }],
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    isUser ? { color: "#fff" } : { color: colors.text },
                  ]}
                >
                  {item.text}
                </Text>
              </View>
              <Text style={[styles.timeText, { color: colors.mutedText }]}>
                {item.timestamp}
              </Text>
            </View>
          );
        }}
      />

      {/* QUICK REPLIES */}
      <View style={styles.quickRepliesSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickReplyContainer}>
          {getQuickReplies().map((text, idx) => (
            <TouchableOpacity 
              key={idx} 
              style={[styles.quickChip, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
              onPress={() => {
                sendChatMessage(roomId, text);
              }}
            >
              <Text style={[styles.quickText, { color: colors.secondary }]}>
                {text}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* INPUT */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View style={[styles.inputContainer, { backgroundColor: colors.cardBg, borderTopColor: colors.border }]}>
          <TextInput
            placeholder="Type your message..."
            placeholderTextColor={colors.mutedText}
            value={inputText}
            onChangeText={setInputText}
            style={[styles.input, { backgroundColor: isDark ? "#0F172A" : "#F8FAFC", color: colors.text, borderColor: colors.border }]}
            onSubmitEditing={handleSend}
          />

          <TouchableOpacity
            style={[styles.sendButton, { backgroundColor: colors.primary }]}
            onPress={handleSend}
          >
            <Ionicons
              name="send"
              size={18}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },

  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginHorizontal: 12,
  },

  agentName: {
    fontSize: 16,
    fontWeight: "800",
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#22C55E",
    marginRight: 6,
  },

  status: {
    fontSize: 11,
    fontWeight: "600",
  },

  callBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  propertyCard: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 12,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 2,
    elevation: 1,
  },

  propertyTitle: {
    fontWeight: "800",
    fontSize: 13,
  },

  propertyLocation: {
    marginTop: 2,
    fontSize: 11,
  },

  viewDetailsBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },

  viewDetailsText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
  },

  messagesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 30,
  },

  messageWrapper: {
    marginBottom: 16,
  },

  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },

  userBubble: {
    borderBottomRightRadius: 4,
  },

  agentBubble: {
    borderBottomLeftRadius: 4,
    borderWidth: 1,
  },

  messageText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },

  timeText: {
    fontSize: 10,
    marginTop: 4,
    marginHorizontal: 6,
    fontWeight: "500",
  },

  quickRepliesSection: {
    paddingVertical: 8,
  },

  quickReplyContainer: {
    paddingLeft: 20,
  },

  quickChip: {
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },

  quickText: {
    fontWeight: "700",
    fontSize: 11,
  },

  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: "center",
    borderTopWidth: 1,
  },

  input: {
    flex: 1,
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    fontSize: 14,
  },

  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});