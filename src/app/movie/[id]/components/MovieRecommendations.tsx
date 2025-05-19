import React, { useEffect, useState } from "react";
import { fetchMovieRecommendations } from "../../../../services/movies/fetchMovieRecommendations";

interface MovieRecommendationsProps {
  movieId: number;
}

const MovieRecommendations: React.FC<MovieRecommendationsProps> = ({ movieId }) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const data = await fetchMovieRecommendations(movieId);
        setRecommendations(data.results);
      } catch (error) {
        console.error("Failed to fetch movie recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [movieId]);

  if (loading) {
    return <p>Loading recommendations...</p>;
  }

  if (recommendations.length === 0) {
    return <p>No recommendations available.</p>;
  }

  return (
    <div className = "movie-recommendations">
      <h2 className = "text-2xl font-bold mb-4">Recommended Movies</h2>
      <div className = "grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendations.map((movie) => (
          <div key = {movie.id} className = "movie-card">
            <img
              src = {`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt = {movie.title}
              className = "rounded shadow"
            />
            <h3 className = "text-lg font-semibold mt-2">{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRecommendations;