// This NavBar component is responsible for displaying the navigation bar of the application.

import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <nav className="flex gap-4 p-4 bg-gray-100 mb-4">
      <Link to="/">Inicio</Link>
      <Link to="/popular">Populares</Link>
      <Link to="/top-rated">Mejor Calificadas</Link>
      <Link to="/now-playing">En Cartelera</Link>
      <Link to="/favorites">Favoritos</Link>
    </nav>
  );
}