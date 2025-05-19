import api from "../../utils/apiHelpers";

/**
 * Fetches the list of movies currently playing in theaters.
 * @param page - The page number for pagination.
 * @returns A promise resolving to the list of now-playing movies.
 */
export const getNowPlayingMovies = async (page: number) => {
  try {
    const { data } = await api.get(`/movie/now_playing`, {
      params: { language: "en-US", page },
    });
    return data.results;
  } catch (error) {
    console.error("Error fetching now-playing movies:", error);
    throw error;
  }
};