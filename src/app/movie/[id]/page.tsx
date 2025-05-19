// This file is a Next.js page component that fetches and displays movie details based on the movie ID from the URL.
// It defines a MovieDetailPage component that uses the useParams and useSearchParams hooks from Next.js to extract the movie ID and query parameters from the URL.

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getMovieById } from "../../../services/movies/getMovieById";
import MovieDetails from "./components/MovieDetails";
import MovieRecommendations from "./components/MovieRecommendations";

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>(); // Explicitly type `id` as a string
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Movie ID is missing! 😱");
      return;
    }

    const fetchMovie = async () => {
      setLoading(true);
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie", err);
        setError("Could not load movie.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div>Loading movie...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>No movie found.</div>;

  return (
    <div>
      <MovieDetails movieId = {parseInt(id, 10)} />
      <MovieRecommendations movieId = {parseInt(id, 10)} />
    </div>
  );
};

export default MovieDetailPage;