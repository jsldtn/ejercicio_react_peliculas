import api from "../api";

/**
 * Fetch detailed information about a specific movie.
 * @param movieId - The ID of the movie to fetch details for.
 * @returns A promise resolving to the movie details.
 * @throws An error if the API call fails.
 */
export const fetchMovieDetails = async (movieId: number) => {
  try {
    const { data } = await api.get(`/movie/${movieId}`, {
      params: {
        language: "en-US", // Fetch details in English
      },
    });
    return data;
  } catch (error) {
    console.error(`Failed to fetch details for movie ID ${movieId}:`, error);
    throw new Error("Unable to fetch movie details. Please try again later.");
  }
};