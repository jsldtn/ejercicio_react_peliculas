"use client";

import FavoriteMoviesList from "./components/FavoriteMoviesList";

const MyFavoritesPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Favorite Movies</h1>
      <FavoriteMoviesList />
    </div>
  );
};

export default MyFavoritesPage;