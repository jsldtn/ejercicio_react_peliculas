// This component file is responsible for displaying a button to add or remove a movie from the favorites list

import { useState, useEffect } from "react";
import { markAsFavorite, getGuestSession } from "../services/movieService";

export default function FavoriteButton({ movieId }: { movieId: number }) {
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFav(favs.includes(movieId));
  }, [movieId]);

  const toggleFavorite = async () => {
    setLoading(true);
    let favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    let newFav: boolean;
    if (isFav) {
      favs = favs.filter((id: number) => id !== movieId);
      newFav = false;
    } else {
      favs.push(movieId);
      newFav = true;
    }
    localStorage.setItem("favorites", JSON.stringify(favs));
    setIsFav(newFav);

    // TMDb API call
    let sessionId = localStorage.getItem("guest_session_id");
    if (!sessionId) {
      sessionId = await getGuestSession();
      localStorage.setItem("guest_session_id", sessionId);
    }
    if (!sessionId) {
      setLoading(false);
      return;
    }
    try {
      await markAsFavorite(movieId, newFav, sessionId!);
    } catch (e) {
      // Optionally handle API error here
    }
    setLoading(false);
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
      className="focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
    </button>
  );
}