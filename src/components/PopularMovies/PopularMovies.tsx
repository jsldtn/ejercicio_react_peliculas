import React from "react";
import { getPopularMovies } from "../../services/getMovies/getPopularMovies";

const PopularMovies = () => {
    // 2 states; response and loading
    const [loading, setLoading] = React.useState<boolean>(false);
    const [movies, setMovies] = React.useState<any[]>([]);
    // const [response, setResponse] = React.useState<any>(null);
    // const [error, setError] = React.useState<any>(null);
    // const [loading, setLoading] = React.useState<boolean>(false);
    // const [movies, setMovies] = React.useState<any[]>([]);
    // useEffect to fetch data when the component mounts
    React.useEffect(() => {
        const fetchPopularMovies = async () => {

            setLoading(true); // Set loading to true before fetching data
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
            try {
                const data = await getPopularMovies(); // Fetch popular movies
                setMovies(data.results); // Set the movies in state
                
            } catch(error) {

                console.error("Error fetching popular movies:", error); // Log any errors

            }

            setLoading(false); // Set loading to false after fetching data

        }

        fetchPopularMovies();
        
    }, []);

    return ( 
        <div>
            <h1> Popular Movies </h1>
            {loading && <h3>Loading...</h3>}
            {movies.map((movie) => (
                <div>
                    <span>{movie.title}</span> 
                
                </div>
            ))}
        </div>
    );

};
    
export default PopularMovies;