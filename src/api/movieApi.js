import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchMovies = async (searchTerm = 'movie') => {
  try {
    let allMovies = [];
    const totalPages = 3; 

    for (let page = 1; page <= totalPages; page++) {
      const response = await axios.get(`${BASE_URL}?s=${searchTerm}&apikey=${API_KEY}&page=${page}`);
      const movies = response.data.Search;

      if (movies) {
        allMovies = [...allMovies, ...movies];
      }
    }

    if (allMovies.length > 0) {
      const detailedMovies = await Promise.all(
        allMovies.map(async (movie) => {
          const movieDetails = await fetchMovieById(movie.imdbID);
          return movieDetails;
        })
      );

      const sortedMovies = detailedMovies
        .filter(movie => movie.imdbRating) 
        .sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating));

      return sortedMovies;
    }
    return [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
export const fetchMovieById = async (id) => {
  const response = await axios.get(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
  return response.data; 
};
