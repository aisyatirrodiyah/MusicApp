import React, { useState } from "react";
import { View, TextInput, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { searchTracks } from "../../lib/api";
import SongCard from "../../components/SongCard";

export default function Search() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const router = useRouter();

  const handleSearch = async () => {
    if (query) {
      const data = await searchTracks(query);
      console.log("Track hasil pencarian:", data);
      setTracks(data);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Cari Musik"
        placeholderTextColor="rgb(211, 207, 207)"
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.trackId.toString()}
        renderItem={({ item }) => (
          <SongCard
            track={item}
            onPress={() => router.push(`/song/${item.trackId}`)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 16 },
  input: {
    backgroundColor: "#1e1e1e",
    padding: 12,
    color: "#fff",
    borderRadius: 8,
    marginBottom: 16,
  },
  cari: {
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
});
