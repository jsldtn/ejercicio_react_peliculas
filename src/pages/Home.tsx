// This page file is responsible for displaying the Home page

import { useEffect, useState } from "react";
import { fetchPopularMovies, fetchTopRatedMovies, fetchNowPlayingMovies } from "../services/movieService";
import MovieGrid from "../components/MovieGrid";
import { Movie } from "../types/Movie";

export default function Home() {
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetchPopularMovies(1),
      fetchTopRatedMovies(1),
      fetchNowPlayingMovies(1),
    ])
      .then(([pop, top, now]) => {
        setPopular(pop.results.slice(0, 5));
        setTopRated(top.results.slice(0, 5));
        setNowPlaying(now.results.slice(0, 5));
      })
      .catch(() => setError("Error al cargar las películas."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-8">Cargando...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Inicio</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Populares</h2>
        <MovieGrid movies={popular} />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Mejor Calificadas</h2>
        <MovieGrid movies={topRated} />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">En Cartelera</h2>
        <MovieGrid movies={nowPlaying} />
      </section>
    </div>
  );
}