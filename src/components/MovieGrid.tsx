import { Link } from "react-router-dom";

// filepath: src/components/MovieGrid.tsx
import { Movie } from "../types/Movie";
// Remove local Movie interface

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  if (!movies || movies.length === 0) {
    return <div className="text-center text-gray-500">No hay películas para mostrar.</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <Link
          to={`/movie/${movie.id}`}
          key={movie.id}
          className="bg-white rounded shadow hover:scale-105 transition-transform"
        >
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover rounded-t"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-t">
              <span className="text-gray-400">Sin imagen</span>
            </div>
          )}
          <div className="p-2">
            <h3 className="font-semibold text-sm truncate">{movie.title}</h3>
            {movie.release_date && (
              <p className="text-xs text-gray-500">{movie.release_date}</p>
            )}
            {movie.vote_average !== undefined && (
              <p className="text-xs text-yellow-600">⭐ {movie.vote_average}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}