import api from "../api";

/**
 * Mark or unmark a movie as a favorite for a guest session.
 * @param movieId - The ID of the movie to mark/unmark as favorite.
 * @param favorite - A boolean indicating whether to mark as favorite (true) or remove from favorites (false).
 * @param guestSessionId - The guest session ID for the user.
 * @returns A promise resolving to the API response data.
 * @throws An error if the API call fails or if required parameters are missing.
 */
export const markAsFavorite = async (
  movieId: number,
  favorite: boolean,
  guestSessionId: string
): Promise<any> => {
  // Validate required parameters
  if (!movieId || typeof movieId !== "number") {
    throw new Error("Invalid or missing movieId. It must be a valid number.");
  }

  if (!guestSessionId || typeof guestSessionId !== "string") {
    throw new Error(
      "Invalid or missing guestSessionId. It must be a valid string."
    );
  }

  // Validate the API key
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("API key is missing. Please check your environment variables.");
  }

  try {
    // Prepare the request body
    const body = {
      media_type: "movie", // Specify the type of media
      media_id: movieId,   // The ID of the movie
      favorite,            // Mark as favorite or not
    };

    // Make the API call
    const { data } = await api.post(
      `/account/${guestSessionId}/favorite`,
      body,
      {
        params: {
          api_key: apiKey, // Pass the API key as a query parameter
        },
      }
    );

    // Return the API response
    return data;
  } catch (error: any) {
    // Log the error for debugging
    console.error(
      `Failed to update favorite status for movie ID ${movieId}:`,
      error.response?.data || error.message
    );

    // Throw a user-friendly error
    throw new Error(
      error.response?.data?.status_message ||
        "Unable to update favorite status. Please try again later."
    );
  }
};