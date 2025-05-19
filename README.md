# Ejercicio React Peliculas - Joaquín Saldarriaga

Este repositorio contiene una aplicación web desarrollada con React para explorar y gestionar películas utilizando la API de The Movie Database (TMDb).

## Características principales

- Listado de películas populares, mejor calificadas y en cartelera.
- Visualización de detalles de cada película.
- Gestión de favoritos usando sesión de invitado.
- Paginación y búsqueda de películas.
- Administrador de tareas (to-do) con persistencia local.
- Componentes reutilizables y estilos con Tailwind CSS y Material UI.
- Consumo de API con Axios y manejo de errores.
- Contextos globales para sesión y favoritos.

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tu-usuario/ejercicio-react-peliculas.git
   cd ejercicio-react-peliculas
   ```

2. Instala las dependencias:
   ```sh
   npm install
   ```

3. Crea un archivo `.env` en la raíz con tu API key de TMDb:
   ```
   VITE_MOVIE_API_KEY=tu_api_key_de_tmdb
   NEXT_PUBLIC_TMDB_API_KEY=tu_api_key_de_tmdb
   ```

4. Inicia la aplicación:
   ```sh
   npm run dev
   ```

## Estructura del proyecto

```
ejercicio-react-peliculas/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── config/
│   ├── hooks/
│   ├── pages/
│   ├── providers/
│   ├── services/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── .env
├── package.json
├── vite.config.ts
├── next.config.js
├── tsconfig*.json
└── README.md
```

## Scripts útiles

- `npm run dev` — Servidor de desarrollo.
- `npm run build` — Compilación para producción.
- `npm run preview` — Previsualización de la build.
- `npm run lint` — Análisis estático de código.

## Créditos

- [TMDb API](https://www.themoviedb.org/documentation/api)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Next.js](https://nextjs.org/)
- [Material UI](https://mui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Autor:** Joaquín Saldarriaga