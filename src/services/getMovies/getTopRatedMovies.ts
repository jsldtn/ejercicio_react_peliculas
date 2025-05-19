import api from "../../utils/apiHelpers";

/**
 * Fetches the list of top-rated movies.
 * @param page - The page number for pagination.
 * @returns A promise resolving to the list of top-rated movies.
 */
export const getTopRatedMovies = async (page: number) => {
  try {
    const { data } = await api.get(`/movie/top_rated`, {
      params: { language: "en-US", page },
    });
    return data.results;
  } catch (error) {
    console.error("Error fetching top-rated movies:", error);
    throw error;
  }
};