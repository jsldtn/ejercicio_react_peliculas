import PopularMoviesPaginatedList from "./popular/components/PaginatedMovieList";
import TopRatedMoviesPaginatedList from "./top-rated/components/PaginatedMovieList";
import NowPlayingMoviesPaginatedList from "./now-playing/components/PaginatedMovieList";

export default function HomePage() {
  return (
    <div>
      <h1 className = "text-3xl font-bold">Welcome to My Movie App</h1>
      <PopularMoviesPaginatedList endpoint = "/movie/popular" />
      <TopRatedMoviesPaginatedList endpoint = "/movie/top_rated" />
      <NowPlayingMoviesPaginatedList endpoint = "/movie/now_playing" />
    </div>
  );
}