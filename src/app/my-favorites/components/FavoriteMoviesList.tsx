import React, { useEffect, useState } from "react";
import { getFavoriteMovies } from "../../../services/getMovies/getFavoriteMovies";
import { useGuestSession } from "../../../providers/GuestSessionContext";

// Define the Movie type
interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

const FavoriteMoviesList = () => {
  const { guestSessionId } = useGuestSession();
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!guestSessionId) return;

      setLoading(true);
      setError(null);

      try {
        const data = await getFavoriteMovies(guestSessionId);
        setFavorites(data || []);
      } catch (err: any) {
        console.error("Error fetching favorite movies:", err.message);
        setError("Failed to load favorite movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [guestSessionId]);

  if (loading) {
    return <p className = "text-center text-gray-500">Loading favorite movies...</p>;
  }

  if (error) {
    return <p className = "text-center text-red-500">{error}</p>;
  }

  if (!favorites.length) {
    return <p className = "text-center text-gray-500">No favorite movies found.</p>;
  }

  return (
    <div className = "grid grid-cols-2 md:grid-cols-4 gap-4">
      {favorites.map((movie) => (
        <div key = {movie.id} className = "movie-card">
          <img
            src = {
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/placeholder-image.jpg"
            }
            alt = {movie.title}
            className = "rounded shadow"
          />
          <h2 className = "text-lg font-semibold mt-2">{movie.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default FavoriteMoviesList;