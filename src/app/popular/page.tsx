// This file defines the page for displaying *popular movies* in a Next.js application.

import Link from "next/link";
import MovieCard from "../../components/MovieCard/MovieCard";

// Define the Movie type
interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string | null;
  release_date: string;
  overview: string;
}

// Define the props type
interface PopularMoviesPageProps {
  movies: Movie[];
  loading: boolean;
}

const PopularMoviesPage: React.FC<PopularMoviesPageProps> = ({ movies, loading }) => {
  return (
    <div>
      <h3 className = "text-3xl font-bold mb-6">Popular Movies</h3>
      {loading && <h5 className = "text-lg text-gray-500">Cargando...</h5>}
      <div className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies?.map((movie) => (
          <Link
            key = {movie.id}
            href = {{
              pathname: `/movie/${movie.id}`,
              query: { from: "popular" },
            }}
          >
            <MovieCard
              title = {movie.title}
              voteAverage = {movie.vote_average}
              posterPath = {movie.poster_path || ""}
              releaseYear = {new Date(movie.release_date).getFullYear()}
              description = {movie.overview}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularMoviesPage;