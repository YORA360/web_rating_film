// src/pages/HomePage.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setMovies, setTrendingMovies, setTvShows } from '../../store/action/movieAction';
import TrendingMovies from '../../components/TrendingMovies';
import Movies from '../../components/Movies';
import TvShows from '../../components/TvShows';
import RandomMovieHeader from '../../components/RandomMovieHeader';

const HomePage = () => {
  const dispatch = useDispatch();

  const fetchTrendingMovies = async () => {
    try {
      const response = await axios.get("https://api.themoviedb.org/3/trending/movie/week?language=en-US", {
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzUwNmY4ODQ4YTBkYmE4YTQ0YjJiZDdhMTgxNzk1NCIsIm5iZiI6MTcyOTUxNTI3OC4xMTU3MjYsInN1YiI6IjY3MDQ4M2Q0NWY5NTg5MjQ4OGJmZjk4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hfXE2L_jRmCMBdsPAtK9BQtpngTSj72uC0lvWubN0pY` // Ganti dengan token Anda
        }
      });
      dispatch(setTrendingMovies(response.data.results));
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get("https://api.themoviedb.org/3/trending/all/week", {
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzUwNmY4ODQ4YTBkYmE4YTQ0YjJiZDdhMTgxNzk1NCIsIm5iZiI6MTcyOTUxNTI3OC4xMTU3MjYsInN1YiI6IjY3MDQ4M2Q0NWY5NTg5MjQ4OGJmZjk4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hfXE2L_jRmCMBdsPAtK9BQtpngTSj72uC0lvWubN0pY` // Ganti dengan token Anda
        }
      });
      dispatch(setMovies(response.data.results));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchTvShows = async () => {
    try {
      const response = await axios.get("https://api.themoviedb.org/3/trending/tv/day?language=en-US", {
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzUwNmY4ODQ4YTBkYmE4YTQ0YjJiZDdhMTgxNzk1NCIsIm5iZiI6MTcyOTUxNTI3OC4xMTU3MjYsInN1YiI6IjY3MDQ4M2Q0NWY5NTg5MjQ4OGJmZjk4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hfXE2L_jRmCMBdsPAtK9BQtpngTSj72uC0lvWubN0pY` // Ganti dengan token Anda
        }
      });
      dispatch(setTvShows(response.data.results));
    } catch (error) {
      console.error("Error fetching TV shows:", error);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
    fetchMovies();
    fetchTvShows();
  }, [dispatch]);

  return (
    <div className="container mx-auto mt-8 dark:bg-black">
      <RandomMovieHeader />
      <TrendingMovies />
      <Movies />
      <TvShows />
    </div>
  );
};

export default HomePage;
