// This file is responsible for displaying the Favorites page

import { useEffect, useState } from "react";
import { fetchMovieDetail } from "../services/movieService";
import MovieGrid from "../components/MovieGrid";
import { Movie } from "../types/Movie"; // Adjust path as needed

export default function Favorites() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favIds: number[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (favIds.length === 0) {
      setMovies([]);
      setLoading(false);
      return;
    }
    Promise.all(favIds.map(fetchMovieDetail))
      .then(setMovies)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Favoritos</h1>
      {loading ? (
        <div className="text-center py-8">Cargando...</div>
      ) : movies.length === 0 ? (
        <div className="text-center text-gray-500">No tienes películas favoritas.</div>
      ) : (
        <MovieGrid movies={movies} />
      )}
    </div>
  );
}