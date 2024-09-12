import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchMovies } from './api/movieApi';
import { setMovies } from './redux/movieSlice';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadMovies = async () => {
      const moviesData = await fetchMovies();
      dispatch(setMovies(moviesData));
    };

    loadMovies();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
