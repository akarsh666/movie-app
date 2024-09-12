import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMovies } from '../redux/movieSlice';
import { fetchMovies } from '../api/movieApi';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.list);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    const moviesData = await fetchMovies(searchTerm); 
    dispatch(setMovies(moviesData));
  };

  useEffect(() => {
    const getMovies = async () => {
      const moviesData = await fetchMovies();
      dispatch(setMovies(moviesData));
    };

    getMovies();
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Popular Movies </h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="border rounded-md p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button 
          onClick={handleSearch} 
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className="border p-4 rounded-lg">
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
                alt={movie.Title || 'No Title'}
                className="w-full h-auto mb-2 rounded-lg"
              />
              <h2 className="text-lg font-semibold">{movie.Title || 'No Title'}</h2>
              <p>IMDb Rating: {movie.imdbRating || 'N/A'}</p>
              <Link to={`/movie/${movie.imdbID}`} className="text-blue-500">View Details</Link>
            </div>
          ))
        ) : (
          <p>No popular movies found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
