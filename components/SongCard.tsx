import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../app/ThemaContext";

export default function SongCard({ track }: { track: any }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();
  const styles = createStyles(isDark);

  const handlePress = () => {
    router.push({
      pathname: `/song/${track.trackId}`,
      params: {
        trackName: track.trackName,
        artistName: track.artistName,
        artworkUrl100: track.artworkUrl100,
        previewUrl: track.previewUrl,
      },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      {/* Cover image */}
      <Image source={{ uri: track.artworkUrl100 }} style={styles.image} />

      {/* Info lagu */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {track.trackName}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {track.artistName}
        </Text>
      </View>

      {/* Icon play (opsional) */}
      <Feather
        name="play-circle"
        size={28}
        color={isDark ? "#1DB954" : "#1DB954"}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: isDark ? "#1e1e1e" : "#fff",
      borderRadius: 14,
      padding: 12,
      marginBottom: 14,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    image: {
      width: 70,
      height: 70,
      borderRadius: 10,
    },
    info: {
      flex: 1,
      marginLeft: 14,
      justifyContent: "center",
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#111",
      marginBottom: 4,
    },
    artist: {
      fontSize: 14,
      color: isDark ? "#ccc" : "#555",
    },
    icon: {
      marginLeft: 10,
    },
  });
