// src/App.js
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import store from './store/store'; 
import HomePage from './pages/homePage/HomePage';
import MovieDetail from './components/MovieDetail';
import RatedMovies from './pages/Rated/ratedMovie';
import TvShowDetail from './components/TvShowDetail';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  

  const handleSearch = (query) => {
    searchMovies(query);
  };

  const searchMovies = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get("https://api.themoviedb.org/3/search/movie", {
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzUwNmY4ODQ4YTBkYmE4YTQ0YjJiZDdhMTgxNzk1NCIsIm5iZiI6MTcyOTUxNTI3OC4xMTU3MjYsInN1YiI6IjY3MDQ4M2Q0NWY5NTg5MjQ4OGJmZjk4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hfXE2L_jRmCMBdsPAtK9BQtpngTSj72uC0lvWubN0pY` // Ganti dengan token Anda
        },
        params: {
          query: query,
          language: 'en-US',
          include_adult: false,
        }
      });
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
      setSearchResults([]);
    }
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar onSearch={handleSearch} searchResults={searchResults} />
        <Routes>
          <Route path="/" element={<HomePage searchResults={searchResults} />} />
          <Route path="/movie/:id" element={<MovieDetail />} /> {/* Rute ke halaman detail film */}
          <Route path="/tv/:id" element={<TvShowDetail />} />
          <Route path="/rated" element={<RatedMovies />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
