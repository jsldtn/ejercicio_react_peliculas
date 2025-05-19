import React, { useState, useEffect } from "react";
import { markAsFavorite } from "../../../../services/accounts/markAsFavorite.ts";
import { useGuestSession } from "../../../../providers/GuestSessionContext";

interface AddToFavoritesButtonProps {
  movieId: number;
}

const AddToFavoritesButton: React.FC<AddToFavoritesButtonProps> = ({ movieId }) => {
  const { guestSessionId } = useGuestSession();
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if the movie is already in favorites (localStorage for quick UI updates)
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(movieId));
  }, [movieId]);

  const toggleFavorite = async () => {
    if (!guestSessionId) {
      console.error("Guest session ID is required to mark as favorite.");
      return;
    }

    try {
      const updatedFavoriteStatus = !isFavorite;
      await markAsFavorite(movieId, updatedFavoriteStatus, guestSessionId);

      // Update localStorage for quick UI updates
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      if (updatedFavoriteStatus) {
        favorites.push(movieId);
      } else {
        const index = favorites.indexOf(movieId);
        if (index > -1) favorites.splice(index, 1);
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));

      // Update UI
      setIsFavorite(updatedFavoriteStatus);
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    }
  };

  return (
    <button
      onClick = {toggleFavorite}
      className = {`px-4 py-2 rounded ${
        isFavorite ? "bg-red-500 text-white" : "bg-gray-300 text-black"
      }`}
    >
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
};

export default AddToFavoritesButton;