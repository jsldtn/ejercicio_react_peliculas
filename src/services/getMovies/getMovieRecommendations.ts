import api from "../../utils/apiHelpers";

/**
 * Fetches recommendations for a specific movie.
 * @param movieId - The ID of the movie.
 * @returns A promise resolving to the list of recommended movies.
 */
export const getMovieRecommendations = async (movieId: number) => {
  try {
    const { data } = await api.get(`/movie/${movieId}/recommendations`, {
      params: { language: "en-US" },
    });
    return data.results;
  } catch (error) {
    console.error("Error fetching movie recommendations:", error);
    throw error;
  }
};