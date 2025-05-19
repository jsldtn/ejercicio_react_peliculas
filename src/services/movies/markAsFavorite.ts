import api from "../api";

/**
 * Mark or unmark a movie as a favorite for a guest session.
 * @param movieId - The ID of the movie to mark/unmark as favorite.
 * @param favorite - A boolean indicating whether to mark as favorite (true) or remove from favorites (false).
 * @param guestSessionId - The guest session ID for the user.
 * @returns A promise resolving to the API response data.
 * @throws An error if the API call fails.
 */
export const markAsFavorite = async (
  movieId: number,
  favorite: boolean,
  guestSessionId: string
) => {
  try {
    const body = {
      media_type: "movie", // Specify the type of media (movie)
      media_id: movieId, // The ID of the movie
      favorite, // Whether to mark as favorite or not
    };

    const { data } = await api.post(
      `/account/${guestSessionId}/favorite`,
      body,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY, // Ensure the API key is passed
        },
      }
    );

    return data;
  } catch (error) {
    console.error(
      `Failed to update favorite status for movie ID ${movieId}:`,
      error
    );
    throw new Error(
      "Unable to update favorite status. Please try again later."
    );
  }
};