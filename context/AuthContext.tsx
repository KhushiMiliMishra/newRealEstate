import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  fullName: string;
  email: string;
  phone: string;
  role: "CUSTOMER";
}

export interface CustomerProfile {
  minBudget: number;
  maxBudget: number;
  preferredLocality: string;
  preferredPropertyType: "Apartment" | "Villa" | "Plot" | "Commercial" | string;
  preferredTransactionType: "BUY" | "RENT" | "LEASE" | string;
}

export interface SavedSearch {
  id: string;
  title: string;
  locality: string;
  minBudget: number;
  maxBudget: number;
  propertyType: string;
  bhk: string;
}

export interface ViewingRequest {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyPrice: string;
  propertyLocation: string;
  date: string;
  time: string;
  notes: string;
  status: "Pending" | "Confirmed" | "Rescheduled" | "Completed";
  agentName: string;
}

export interface Message {
  id: string; // matches messageId
  messageId: string; // for future backend compatibility
  text: string;
  sender: "user" | "agent";
  senderType: "CUSTOMER" | "AGENT"; // for future backend compatibility
  timestamp: string;
  conversationId: string; // for future backend compatibility
}

export interface ChatRoom {
  id: string; // matches conversationId
  conversationId: string; // for future backend compatibility
  agentName: string;
  agentAvatar: string;
  lastMessage: string;
  propertyTitle: string;
  propertyLocation: string;
  propertyPrice: string;
  messages: Message[];
  status: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  icon: string;
  section: "Today" | "Yesterday" | "Earlier";
  date: string;
}

interface AuthContextData {
  user: User | null;
  profile: CustomerProfile | null;
  shortlistedProperties: string[]; // property IDs
  savedSearches: SavedSearch[];
  viewingRequests: ViewingRequest[];
  chatRooms: ChatRoom[];
  notifications: NotificationItem[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: User & CustomerProfile) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updatedProfile: Partial<User & CustomerProfile>) => Promise<void>;
  toggleShortlist: (propertyId: string) => void;
  isShortlisted: (propertyId: string) => boolean;
  addSavedSearch: (search: Omit<SavedSearch, "id">) => void;
  deleteSavedSearch: (id: string) => void;
  addViewingRequest: (request: Omit<ViewingRequest, "id" | "status">) => void;
  sendChatMessage: (roomId: string, text: string) => void;
  markNotificationRead: (id: string) => void;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  profile: null,
  shortlistedProperties: [],
  savedSearches: [],
  viewingRequests: [],
  chatRooms: [],
  notifications: [],
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  updateProfile: async () => {},
  toggleShortlist: () => {},
  isShortlisted: () => false,
  addSavedSearch: () => {},
  deleteSavedSearch: () => {},
  addViewingRequest: () => {},
  sendChatMessage: () => {},
  markNotificationRead: () => {},
});

// INITIAL MOCK DATA representing DB content
const mockUser: User = {
  fullName: "John Anderson",
  email: "john@example.com",
  phone: "+91 9876543210",
  role: "CUSTOMER",
};

const mockProfile: CustomerProfile = {
  minBudget: 5000000, // 50 L
  maxBudget: 25000000, // 2.5 Cr
  preferredLocality: "OMR, Chennai",
  preferredPropertyType: "Villa",
  preferredTransactionType: "BUY",
};

const mockSavedSearches: SavedSearch[] = [
  {
    id: "s1",
    title: "Villas in OMR Chennai",
    locality: "OMR, Chennai",
    minBudget: 15000000,
    maxBudget: 30000000,
    propertyType: "Villa",
    bhk: "3 BHK",
  },
  {
    id: "s2",
    title: "Budget Apartments in Anna Nagar",
    locality: "Anna Nagar",
    minBudget: 5000000,
    maxBudget: 12000000,
    propertyType: "Apartment",
    bhk: "2 BHK",
  },
];

const mockViewingRequests: ViewingRequest[] = [
  {
    id: "v1",
    propertyId: "2",
    propertyTitle: "Modern Villa with Garden",
    propertyPrice: "₹2.5 Cr",
    propertyLocation: "OMR, Chennai",
    date: "Saturday, 20 June 2026",
    time: "11:00 AM",
    notes: "Please arrange viewing for the lawn area as well.",
    status: "Confirmed",
    agentName: "Sarah Wilson",
  },
  {
    id: "v2",
    propertyId: "1",
    propertyTitle: "Luxury Sea View Apartment",
    propertyPrice: "₹1.2 Cr",
    propertyLocation: "ECR, Chennai",
    date: "Monday, 22 June 2026",
    time: "03:00 PM",
    notes: "Need information on structural safety.",
    status: "Pending",
    agentName: "Arjun Realty",
  },
];

const mockChatRooms: ChatRoom[] = [
  {
    id: "cr1",
    conversationId: "cr1",
    agentName: "Sarah Wilson",
    agentAvatar: "https://i.pravatar.cc/300?img=5",
    lastMessage: "Hello! It's available for viewing this weekend.",
    propertyTitle: "Modern Villa with Garden",
    propertyLocation: "OMR, Chennai",
    propertyPrice: "₹2.5 Cr",
    status: "Online",
    messages: [
      {
        id: "m1",
        messageId: "m1",
        text: "Hi, I'm interested in the Modern Villa with Garden.",
        sender: "user",
        senderType: "CUSTOMER",
        timestamp: "10:30 AM",
        conversationId: "cr1",
      },
      {
        id: "m2",
        messageId: "m2",
        text: "Hello! It's available for viewing this weekend.",
        sender: "agent",
        senderType: "AGENT",
        timestamp: "10:32 AM",
        conversationId: "cr1",
      },
      {
        id: "m3",
        messageId: "m3",
        text: "Can I schedule a visit on Saturday?",
        sender: "user",
        senderType: "CUSTOMER",
        timestamp: "10:35 AM",
        conversationId: "cr1",
      },
    ],
  },
  {
    id: "cr2",
    conversationId: "cr2",
    agentName: "Arjun Realty",
    agentAvatar: "https://i.pravatar.cc/300?img=12",
    lastMessage: "Sure, let me check and let you know details.",
    propertyTitle: "Luxury Sea View Apartment",
    propertyLocation: "ECR, Chennai",
    propertyPrice: "₹1.2 Cr",
    status: "Away",
    messages: [
      {
        id: "m4",
        messageId: "m4",
        text: "Hi, is the sea view apartment still available?",
        sender: "user",
        senderType: "CUSTOMER",
        timestamp: "Yesterday",
        conversationId: "cr2",
      },
      {
        id: "m5",
        messageId: "m5",
        text: "Yes, it is! Would you like a brochure?",
        sender: "agent",
        senderType: "AGENT",
        timestamp: "Yesterday",
        conversationId: "cr2",
      },
      {
        id: "m6",
        messageId: "m6",
        text: "Sure, let me check and let you know details.",
        sender: "agent",
        senderType: "AGENT",
        timestamp: "Yesterday",
        conversationId: "cr2",
      },
    ],
  },
];

const mockNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Price Drop Alert",
    message: "Modern Villa with Garden price reduced to ₹2.4 Cr",
    icon: "trending-down",
    section: "Today",
    date: "10 mins ago",
  },
  {
    id: "n2",
    title: "Viewing Confirmed",
    message: "Saturday • 11:00 AM for Modern Villa with Garden",
    icon: "calendar",
    section: "Today",
    date: "1 hour ago",
  },
  {
    id: "n3",
    title: "New Property Match",
    message: "A new apartment in Anna Nagar matches your preferences",
    icon: "home",
    section: "Yesterday",
    date: "1 day ago",
  },
  {
    id: "n4",
    title: "Agent Replied",
    message: "Sarah Wilson sent a message regarding viewing slots",
    icon: "chatbubble",
    section: "Yesterday",
    date: "1 day ago",
  },
  {
    id: "n5",
    title: "Mortgage Offer",
    message: "Exclusive 7.5% interest rate available for PropVault users",
    icon: "cash",
    section: "Earlier",
    date: "3 days ago",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [shortlistedProperties, setShortlistedProperties] = useState<string[]>([]);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [viewingRequests, setViewingRequests] = useState<ViewingRequest[]>([]);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Load state from local storage or initialize with mock data
    const initializeAuth = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("app-user");
        const storedProfile = await AsyncStorage.getItem("app-profile");
        const storedShortlisted = await AsyncStorage.getItem("app-shortlisted");
        const storedSavedSearches = await AsyncStorage.getItem("app-saved-searches");
        const storedVisits = await AsyncStorage.getItem("app-visits");
        const storedChats = await AsyncStorage.getItem("app-chats");
        const storedNotifications = await AsyncStorage.getItem("app-notifications");

        if (storedUser && storedProfile) {
          setUser(JSON.parse(storedUser));
          setProfile(JSON.parse(storedProfile));
          setIsAuthenticated(true);
        } else {
          // Pre-populate with our gorgeous mock user for preview convenience!
          setUser(mockUser);
          setProfile(mockProfile);
          setIsAuthenticated(true);
          await AsyncStorage.setItem("app-user", JSON.stringify(mockUser));
          await AsyncStorage.setItem("app-profile", JSON.stringify(mockProfile));
        }

        setShortlistedProperties(storedShortlisted ? JSON.parse(storedShortlisted) : ["2"]); // villa default shortlisted
        setSavedSearches(storedSavedSearches ? JSON.parse(storedSavedSearches) : mockSavedSearches);
        setViewingRequests(storedVisits ? JSON.parse(storedVisits) : mockViewingRequests);
        setChatRooms(storedChats ? JSON.parse(storedChats) : mockChatRooms);
        setNotifications(storedNotifications ? JSON.parse(storedNotifications) : mockNotifications);
      } catch (error) {
        console.error("Failed to load auth states", error);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Accept any password, check email
    if (email) {
      const loggedUser: User = {
        fullName: user?.fullName || "John Anderson",
        email: email,
        phone: user?.phone || "+91 9876543210",
        role: "CUSTOMER",
      };
      const loggedProfile: CustomerProfile = profile || mockProfile;
      setUser(loggedUser);
      setProfile(loggedProfile);
      setIsAuthenticated(true);
      await AsyncStorage.setItem("app-user", JSON.stringify(loggedUser));
      await AsyncStorage.setItem("app-profile", JSON.stringify(loggedProfile));
      return true;
    }
    return false;
  };

  const register = async (userData: User & CustomerProfile): Promise<boolean> => {
    const newUser: User = {
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      role: "CUSTOMER",
    };
    const newProfile: CustomerProfile = {
      minBudget: userData.minBudget,
      maxBudget: userData.maxBudget,
      preferredLocality: userData.preferredLocality,
      preferredPropertyType: userData.preferredPropertyType,
      preferredTransactionType: userData.preferredTransactionType,
    };

    setUser(newUser);
    setProfile(newProfile);
    setIsAuthenticated(true);
    await AsyncStorage.setItem("app-user", JSON.stringify(newUser));
    await AsyncStorage.setItem("app-profile", JSON.stringify(newProfile));
    return true;
  };

  const logout = async () => {
    setUser(null);
    setProfile(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem("app-user");
    await AsyncStorage.removeItem("app-profile");
  };

  const updateProfile = async (updatedData: Partial<User & CustomerProfile>) => {
    const nextUser = user ? { ...user } : { fullName: "", email: "", phone: "", role: "CUSTOMER" as const };
    const nextProfile = profile ? { ...profile } : { minBudget: 0, maxBudget: 0, preferredLocality: "", preferredPropertyType: "", preferredTransactionType: "" };

    if (updatedData.fullName !== undefined) nextUser.fullName = updatedData.fullName;
    if (updatedData.email !== undefined) nextUser.email = updatedData.email;
    if (updatedData.phone !== undefined) nextUser.phone = updatedData.phone;

    if (updatedData.minBudget !== undefined) nextProfile.minBudget = updatedData.minBudget;
    if (updatedData.maxBudget !== undefined) nextProfile.maxBudget = updatedData.maxBudget;
    if (updatedData.preferredLocality !== undefined) nextProfile.preferredLocality = updatedData.preferredLocality;
    if (updatedData.preferredPropertyType !== undefined) nextProfile.preferredPropertyType = updatedData.preferredPropertyType;
    if (updatedData.preferredTransactionType !== undefined) nextProfile.preferredTransactionType = updatedData.preferredTransactionType;

    setUser(nextUser);
    setProfile(nextProfile);
    await AsyncStorage.setItem("app-user", JSON.stringify(nextUser));
    await AsyncStorage.setItem("app-profile", JSON.stringify(nextProfile));
  };

  const toggleShortlist = async (propertyId: string) => {
    const updated = shortlistedProperties.includes(propertyId)
      ? shortlistedProperties.filter((id) => id !== propertyId)
      : [...shortlistedProperties, propertyId];
    setShortlistedProperties(updated);
    await AsyncStorage.setItem("app-shortlisted", JSON.stringify(updated));
  };

  const isShortlisted = (propertyId: string): boolean => {
    return shortlistedProperties.includes(propertyId);
  };

  const addSavedSearch = async (search: Omit<SavedSearch, "id">) => {
    const newSearch: SavedSearch = {
      ...search,
      id: Date.now().toString(),
    };
    const updated = [...savedSearches, newSearch];
    setSavedSearches(updated);
    await AsyncStorage.setItem("app-saved-searches", JSON.stringify(updated));
  };

  const deleteSavedSearch = async (id: string) => {
    const updated = savedSearches.filter((item) => item.id !== id);
    setSavedSearches(updated);
    await AsyncStorage.setItem("app-saved-searches", JSON.stringify(updated));
  };

  const addViewingRequest = async (request: Omit<ViewingRequest, "id" | "status">) => {
    const newRequest: ViewingRequest = {
      ...request,
      id: Date.now().toString(),
      status: "Pending",
    };
    const updated = [newRequest, ...viewingRequests];
    setViewingRequests(updated);
    await AsyncStorage.setItem("app-visits", JSON.stringify(updated));

    // Also trigger a notification that they scheduled a viewing
    const newNotif: NotificationItem = {
      id: Date.now().toString() + "_n",
      title: "Viewing Requested",
      message: `Pending confirmation for visit to ${request.propertyTitle} on ${request.date}`,
      icon: "calendar",
      section: "Today",
      date: "Just now",
    };
    const updatedNotifs = [newNotif, ...notifications];
    setNotifications(updatedNotifs);
    await AsyncStorage.setItem("app-notifications", JSON.stringify(updatedNotifs));
  };

  const sendChatMessage = async (roomId: string, text: string) => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      messageId: Date.now().toString(),
      text,
      sender: "user",
      senderType: "CUSTOMER",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      conversationId: roomId,
    };

    setChatRooms((prev) => {
      const nextRooms = prev.map((room) => {
        if (room.id === roomId) {
          return {
            ...room,
            lastMessage: text,
            messages: [...room.messages, newMessage],
          };
        }
        return room;
      });
      AsyncStorage.setItem("app-chats", JSON.stringify(nextRooms));
      return nextRooms;
    });

    // Simulate Agent Auto-Reply
    setTimeout(async () => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        messageId: (Date.now() + 1).toString(),
        text: `Thanks for your message! Let me check the details and get back to you shortly.`,
        sender: "agent" as const,
        senderType: "AGENT",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        conversationId: roomId,
      };

      setChatRooms((prev) => {
        const nextRooms = prev.map((room) => {
          if (room.id === roomId) {
            return {
              ...room,
              lastMessage: replyMessage.text,
              messages: [...room.messages, replyMessage],
            };
          }
          return room;
        });
        AsyncStorage.setItem("app-chats", JSON.stringify(nextRooms));
        return nextRooms;
      });

      // Also trigger a notification for the reply
      setChatRooms((currentRooms) => {
        const targetRoom = currentRooms.find((r) => r.id === roomId);
        if (targetRoom) {
          const newNotif: NotificationItem = {
            id: Date.now().toString() + "_reply",
            title: `Message from ${targetRoom.agentName}`,
            message: `Replied: "Thanks for your message! Let me..."`,
            icon: "chatbubble",
            section: "Today",
            date: "Just now",
          };
          setNotifications((prev) => {
            const updatedN = [newNotif, ...prev];
            AsyncStorage.setItem("app-notifications", JSON.stringify(updatedN));
            return updatedN;
          });
        }
        return currentRooms;
      });
    }, 2000);
  };

  const markNotificationRead = async (id: string) => {
    const updated = notifications.filter(n => n.id !== id); // We delete or mark read; deleting is clean empty state check
    setNotifications(updated);
    await AsyncStorage.setItem("app-notifications", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        shortlistedProperties,
        savedSearches,
        viewingRequests,
        chatRooms,
        notifications,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
        toggleShortlist,
        isShortlisted,
        addSavedSearch,
        deleteSavedSearch,
        addViewingRequest,
        sendChatMessage,
        markNotificationRead,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
