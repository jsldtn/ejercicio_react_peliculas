import axios from "axios";


const API_KEY = import.meta.env.VITE_MOVIE_API_KEY_SHORTENED;
const BASE_URL = "https://api.themoviedb.org/3";
const LANGUAGE = "es-ES";

// --- Movie Lists ---
export const fetchPopularMovies = (page = 1) =>
  axios
    .get(`${BASE_URL}/movie/popular`, {
      params: { api_key: API_KEY, language: LANGUAGE, page },
    })
    .then((r) => r.data);

export const fetchTopRatedMovies = (page = 1) =>
  axios
    .get(`${BASE_URL}/movie/top_rated`, {
      params: { api_key: API_KEY, language: LANGUAGE, page },
    })
    .then((r) => r.data);

export const fetchNowPlayingMovies = (page = 1) =>
  axios
    .get(`${BASE_URL}/movie/now_playing`, {
      params: { api_key: API_KEY, language: LANGUAGE, page },
    })
    .then((r) => r.data);

// --- Movie Detail ---
export const fetchMovieDetail = (id: number | string) =>
  axios
    .get(`${BASE_URL}/movie/${id}`, {
      params: { api_key: API_KEY, language: LANGUAGE },
    })
    .then((r) => r.data);

// --- Recommendations ---
export const fetchRecommendations = (id: number | string) =>
  axios
    .get(`${BASE_URL}/movie/${id}/recommendations`, {
      params: { api_key: API_KEY, language: LANGUAGE },
    })
    .then((r) => r.data);

// --- Favorites (TMDb Guest Session) ---
export const markAsFavorite = async (
  movieId: number,
  favorite: boolean,
  sessionId: string
) => {
  return axios.post(
    `${BASE_URL}/account/null/favorite`,
    {
      media_type: "movie",
      media_id: movieId,
      favorite,
    },
    {
      params: { api_key: API_KEY, guest_session_id: sessionId },
      headers: { "Content-Type": "application/json;charset=utf-8" },
    }
  );
};

// --- Guest Session ---
export const getGuestSession = async () => {
  const res = await axios.get(`${BASE_URL}/authentication/guest_session/new`, {
    params: { api_key: API_KEY },
  });
  return res.data.guest_session_id;
};