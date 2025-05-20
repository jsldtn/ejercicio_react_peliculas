import { useState, useEffect } from "react";
import { fetchMovies } from "../../../utils/apiHelpers";
import PaginationControls from "../../../utils/PaginationControls";

// Define the Movie type
interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  relese_date: string;
  overview: string;

}

const TopRatedMoviesPaginatedList = ({ endpoint }: { endpoint: string }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies(endpoint, currentPage);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };
    loadMovies();
  }, [endpoint, currentPage]);

  return (
    <div>
      <div className = "grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
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
      <PaginationControls
        currentPage = {currentPage}
        totalPages = {totalPages}
        onPageChange = {setCurrentPage}
      />
    </div>
  );
};

export default TopRatedMoviesPaginatedList;