
"use client";

import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext<{
  favorites: number[];
  toggleFavorite: (movieId: number) => void;
}>({
  favorites: [],
  toggleFavorite: () => {},
});

export const FavoritesContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (movieId: number) => {
    setFavorites((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

  return (
    <FavoritesContext.Provider value = {{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);