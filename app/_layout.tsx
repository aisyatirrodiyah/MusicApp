import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { useTheme } from "../app/ThemaContext";

export default function Layout() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#1DB954",
        tabBarInactiveTintColor: "#555",
        tabBarStyle: {
          backgroundColor: isDark ? "#121212" : "#f0f0f0",
          borderTopWidth: 1,
          borderTopColor: "#ddd",
          height: Platform.OS === "ios" ? 90 : 70,
          paddingBottom: Platform.OS === "ios" ? 20 : 10,
        },
        headerStyle: {
          backgroundColor: isDark ? "#121212" : "#ffffff",
        },
        headerTitleStyle: {
          color: isDark ? "#ffffff" : "#1DB954",
          fontWeight: "bold",
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={toggleTheme}
            style={{ marginRight: 16 }}
          >
            <Feather
              name={isDark ? "sun" : "moon"}
              size={22}
              color={isDark ? "#FFD700" : "#1DB954"}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Playlist",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="search/index"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="song/[id]"
        options={{
          title: "Detail Lagu",
          tabBarItemStyle: { display: "none" },
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
