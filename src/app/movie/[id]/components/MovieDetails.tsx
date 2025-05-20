import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../../../../services/movies/fetchMovieDetails";

interface MovieDetailsProps {movieId: number;}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movieId }) => {
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [movieId]);

  if (loading) {
    return <p>Loading movie details...</p>;
  }

  if (!movie) {
    return <p>Movie details not found.</p>;
  }

  return (
    <div className = "movie-details">
      <img
        src = {`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt = {movie.title}
        className = "rounded shadow mb-4"
      />
      <h1 className = "text-3xl font-bold mb-2">{movie.title}</h1>
      <p className = "text-gray-700 mb-4">{movie.overview}</p>
      <p className = "text-sm text-gray-500">Release Date: {movie.release_date}</p>
    </div>
  );
};

export default MovieDetails;
