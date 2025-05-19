import api from "../../utils/apiHelpers";

/**
 * Fetches the list of favorite movies for a guest session.
 * @param guestSessionId - The guest session ID.
 * @returns A promise resolving to the list of favorite movies.
 */
export const getFavoriteMovies = async (guestSessionId: string) => {
  try {
    const { data } = await api.get(`/account/${guestSessionId}/favorite/movies`, {
      params: { language: "en-US", sort_by: "created_at.asc" },
    });
    return data.results;
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    throw error;
  }
};