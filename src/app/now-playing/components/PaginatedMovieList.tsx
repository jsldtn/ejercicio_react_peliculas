"use client";

import React, { useState, useEffect } from "react";
import { fetchMovies } from "../../../utils/apiHelpers";
import PaginationControls from "../../../utils/PaginationControls";

// Define the Movie type
interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
}

const NowPlayingMoviesPaginatedList = ({ endpoint }: { endpoint: string }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMovies(endpoint, currentPage);
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 0);
      } catch (err: any) {
        console.error("Failed to fetch movies:", err.message);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [endpoint, currentPage]);

  if (loading) {
    return <p className = "text-center text-gray-500">Loading movies...</p>;
  }

  if (error) {
    return <p className = "text-center text-red-500">{error}</p>;
  }

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
            <p className = "text-sm text-gray-600">{movie.overview}</p>
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

export default NowPlayingMoviesPaginatedList;