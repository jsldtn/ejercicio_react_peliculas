import api from "../../utils/apiHelpers";

/**
 * Fetches details of a movie by its ID.
 * @param movieId - The ID of the movie.
 * @returns A promise resolving to the movie details.
 */
export const getMoviesById = async (movieId: number) => {
  try {
    const { data } = await api.get(`/movie/${movieId}`, {
      params: { language: "en-US" },
    });
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};