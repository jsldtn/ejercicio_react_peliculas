// This file is part of the Movie App project.
// It contains the Movie interface used **throughout** the application!

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  genres?: { id: number; name: string }[];
  [key: string]: any;
}
