import api from "../api";

/**
 * Fetch recommended movies for a specific movie.
 * @param movieId - The ID of the movie to fetch recommendations for.
 * @returns A promise resolving to the list of recommended movies.
 * @throws An error if the API call fails.
 */
export const fetchMovieRecommendations = async (movieId: number) => {
  try {
    const { data } = await api.get(`/movie/${movieId}/recommendations`, {
      params: {
        language: "en-US", // Fetch recommendations in English
        page: 1, // Default to the first page of recommendations
      },
    });
    return data;
  } catch (error) {
    console.error(
      `Failed to fetch recommendations for movie ID ${movieId}:`,
      error
    );
    throw new Error(
      "Unable to fetch movie recommendations. Please try again later."
    );
  }
};