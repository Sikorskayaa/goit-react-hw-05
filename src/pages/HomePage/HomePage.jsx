import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../../components/services/Api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

const Home = () => {
  const [trendingMovie, setTrendingMovie] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const movies = await fetchTrendingMovies();
        const filteredMovies = movies.filter(
          (movie) => movie.id && movie.title
        );
        setTrendingMovie(filteredMovies);
      } catch (error) {
        console.log(error);
        setTrendingMovie([]);
      }
    };
    fetchTrending();
  }, []);

  if (trendingMovie.length === 0) {
    return <p>No trending movies available.</p>;
  }

  return (
    <div>
      <h2 className={css.title}>Trending Movies</h2>
      <MovieList movies={trendingMovie} />
    </div>
  );
};
export default Home;
