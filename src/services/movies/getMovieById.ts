// This file defines the 'getMovieById' function...
// which is responsible for fetching movie details by ID from an API
import api from "../api";
export const getMovieById = async (movieId: string) => {
  try {
    const { data } = await api.get(`/movie/${movieId}`, {
      params: { language: "en-US" },
    });
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw new Error("Failed to fetch movie details.");
  }
};