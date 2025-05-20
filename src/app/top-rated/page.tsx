import PaginatedMovieList from "./components/PaginatedMovieList";

const TopRatedPage = () => {
  return (
    <div className = "container mx-auto p-4">
      <h1 className = "text-2xl font-bold mb-4">Top Rated Movies</h1>
      <PaginatedMovieList endpoint = "/movie/top_rated" />
    </div>
  );
};

export default TopRatedPage;