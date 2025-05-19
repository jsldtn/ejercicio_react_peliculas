// This file is responsible for displaying the movie detail page

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetail, fetchRecommendations } from "../services/movieService";
import FavoriteButton from "../components/FavoriteButton";
import MovieGrid from "../components/MovieGrid";
import { Movie } from "../types/Movie"; // Adjust path as needed

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recs, setRecs] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetchMovieDetail(id!),
      fetchRecommendations(id!),
    ])
      .then(([movieData, recsData]) => {
        setMovie(movieData);
        setRecs(recsData.results || []);
      })
      .catch(() => setError("Error al cargar los datos de la película."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-8">Cargando...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!movie) return <div className="text-center py-8">Película no encontrada.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="w-48 rounded shadow"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <FavoriteButton movieId={movie.id} />
          <p className="text-gray-700 mt-2 mb-4">{movie.overview}</p>
          <div className="text-sm text-gray-500">
            {movie.release_date && <div>Estreno: {movie.release_date}</div>}
            {movie.vote_average !== undefined && (
              <div>⭐ {movie.vote_average}</div>
            )}
            {movie.genres && movie.genres.length > 0 && (
              <div>
                Géneros:{" "}
                {movie.genres.map((g) => g.name).join(", ")}
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Recomendadas</h2>
        <MovieGrid movies={recs} />
      </div>
    </div>
  );
}