"use client";

import PaginatedMovieList from "./components/PaginatedMovieList";

const NowPlayingPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Now Playing Movies</h1>
      <PaginatedMovieList endpoint="/movie/now_playing" />
    </div>
  );
};

export default NowPlayingPage;