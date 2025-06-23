export async function searchTracks(query: string) {
  try {
    const res = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(
        query
      )}&entity=song`
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("searchTracks error:", error);
    return [];
  }
}

export async function getTrackById(id: string) {
  try {
    const res = await fetch(
      `https://itunes.apple.com/lookup?id=${encodeURIComponent(id)}`
    );
    const data = await res.json();
    return data.results[0];
  } catch (error) {
    console.error("getTrackById error:", error);
    return null;
  }
}
