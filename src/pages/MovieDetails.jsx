import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMovie } from '../redux/movieSlice';
import { fetchMovieById } from '../api/movieApi';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.selectedMovie);

  useEffect(() => {
    const getMovie = async () => {
      const movieData = await fetchMovieById(id);
      dispatch(setSelectedMovie(movieData));
    };

    getMovie();
  }, [id, dispatch]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-start">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full md:w-1/3 mb-4 md:mb-0 rounded-lg"
        />
        <div className="ml-0 md:ml-6">
          <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
          <p className="mb-2"><strong>Release Date:</strong> {movie.Released}</p>
          <p className="mb-2"><strong>Rating:</strong> {movie.imdbRating}</p>
          <p><strong>Overview:</strong> {movie.Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
