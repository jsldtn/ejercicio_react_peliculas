// This file is used to display the popular movies page
import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../services/movieService";
import MovieGrid from "../components/MovieGrid";
import { Movie } from "../types/Movie"; // Adjust path as needed

export default function Popular() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPopularMovies(page)
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      })
      .catch(() => setError("Error al cargar las películas populares."))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="w-full px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Películas Populares</h1>
      {loading ? (
        <div className="text-center py-8">Cargando...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <>
          <MovieGrid movies={movies} />
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1} aria-label="Página anterior"
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500" >
            Anterior
            </button>
            <span>
                Página {page} de {totalPages}
            </span>
            <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages} aria-label="Página siguiente"
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Siguiente
            </button>
            
          </div>
        </>
      )}
    </div>
  );
}