import axios from "axios";

/**
 * Axios instance pre-configured for TMDb API.
 */
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    api_key: process.env.TMDB_API_KEY, // Ensure this is set in your environment variables
  },
});

/**
 * Fetch movies from a specific TMDb API endpoint with pagination.
 * @param endpoint - The API endpoint to fetch movies from (e.g., "/movie/popular").
 * @param page - The page number to fetch.
 * @returns A promise resolving to the API response data.
 * @throws An error if the API call fails.
 */
export const fetchMovies = async (endpoint: string, page: number) => {
  try {
    const response = await api.get(endpoint, {
      params: {
        page, // Pass the page number as a query parameter
      },
    });
    return response.data; // Return the API response data
  } catch (error: any) {
    console.error(`Failed to fetch movies from ${endpoint}:`, error.response?.data || error.message);
    throw new Error("Unable to fetch movies. Please try again later.");
  }
};

export default api;