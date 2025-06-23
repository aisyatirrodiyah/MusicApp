import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SongCard from "../components/SongCard";
import { searchTracks } from "../lib/api";

export default function Home() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    searchTracks("taylor swift")
      .then(setTracks)
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Musik Terbaru</Text>
        <Feather name="music" size={26} color="#1DB954" />
      </View>

      {/* Loading state */}
      {loading ? (
        <ActivityIndicator size="large" color="#1DB954" />
      ) : (
        <FlatList
          data={tracks}
          keyExtractor={(item) => item.trackId.toString()}
          renderItem={({ item }) => (
            <SongCard
              track={item}
              onPress={() => router.push(`/song/${item.trackId}`)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5", 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222", 
    marginRight: 8,
  },
});
