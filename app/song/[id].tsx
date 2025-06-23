import { Feather } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { searchTracks } from "../../lib/api";

const { width } = Dimensions.get("window");

export default function SongDetail() {
  const { id, trackName, artistName, artworkUrl100, previewUrl } =
    useLocalSearchParams();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [track, setTrack] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (previewUrl) {
      setTrack({ trackName, artistName, artworkUrl100, previewUrl });
      setLoading(false);
    } else {
      searchTracks("taylor swift").then((tracks) => {
        const found = tracks.find((t) => t.trackId.toString() === id);
        setTrack(found);
        setLoading(false);
      });
    }
  }, []);

  async function togglePlayback() {
    if (!sound) {
      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: track.previewUrl,
      });
      setSound(newSound);
      await newSound.playAsync();
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  }

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  if (loading || !track) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: track.artworkUrl100 }}
      style={styles.bg}
      blurRadius={50}
    >
      <View style={styles.overlay}>
        <Image source={{ uri: track.artworkUrl100 }} style={styles.image} />

        <Text style={styles.title}>{track.trackName}</Text>
        <Text style={styles.artist}>{track.artistName}</Text>

        <TouchableOpacity style={styles.button} onPress={togglePlayback}>
          <Feather
            name={isPlaying ? "pause" : "play"}
            size={32}
            color="#fff"
          />
          <Text style={styles.buttonText}>
            {isPlaying ? "Pause" : "Play Preview"}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: width * 0.65,
    height: width * 0.65,
    borderRadius: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  artist: {
    fontSize: 18,
    color: "#ccc",
    marginBottom: 30,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#1DB954",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 40,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
