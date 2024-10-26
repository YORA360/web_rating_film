import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RatedMoviesAndShows = () => {
  const [ratedItems, setRatedItems] = useState([]);

  useEffect(() => {
    const fetchRatedItems = async () => {
      const storedMovieRatings = localStorage.getItem('movieRatings');
      const parsedMovieRatings = storedMovieRatings ? JSON.parse(storedMovieRatings) : {};

      const storedTvRatings = localStorage.getItem('tvShowRatings');
      const parsedTvRatings = storedTvRatings ? JSON.parse(storedTvRatings) : {};

      const moviePromises = Object.keys(parsedMovieRatings).map(async (id) => {
        try {
          const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer YOUR_API_TOKEN`,
            }
          });
          return {
            id,
            title: response.data.title,
            poster_path: response.data.poster_path,
            rating: parsedMovieRatings[id],
            type: 'movie'
          };
        } catch (error) {
          console.error('Error fetching movie details:', error);
          return null;
        }
      });

      const tvPromises = Object.keys(parsedTvRatings).map(async (id) => {
        try {
          const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzUwNmY4ODQ4YTBkYmE4YTQ0YjJiZDdhMTgxNzk1NCIsIm5iZiI6MTcyOTUxNTI3OC4xMTU3MjYsInN1YiI6IjY3MDQ4M2Q0NWY5NTg5MjQ4OGJmZjk4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hfXE2L_jRmCMBdsPAtK9BQtpngTSj72uC0lvWubN0pY`,
            }
          });
          return {
            id,
            title: response.data.name,
            poster_path: response.data.poster_path,
            rating: parsedTvRatings[id],
            type: 'tv'
          };
        } catch (error) {
          console.error('Error fetching TV show details:', error);
          return null;
        }
      });

      const movies = await Promise.all(moviePromises);
      const tvShows = await Promise.all(tvPromises);
      setRatedItems([...movies.filter((movie) => movie !== null), ...tvShows.filter((show) => show !== null)]);
    };

    fetchRatedItems();
  }, []);

  // Fungsi untuk menghapus rating
  const handleDeleteRating = (id, type) => {
    const key = type === 'movie' ? 'movieRatings' : 'tvShowRatings';
    const ratings = JSON.parse(localStorage.getItem(key)) || {};

    delete ratings[id];
    localStorage.setItem(key, JSON.stringify(ratings));

    setRatedItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen dark:bg-black py-12 -top-14">
      <div className="mx-auto px-4 text-white max-w-6xl">
        {ratedItems.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ratedItems.map((item) => (
              <li
                key={item.id}
                className="relative flex flex-col items-center bg-gray-200 dark:bg-gray-800 bg-opacity-90 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
              >
                <Link to={`/${item.type}/${item.id}`} className="w-full">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                    alt={item.title}
                    className="w-full h-auto rounded-lg shadow-md mb-4 transition-transform transform hover:scale-105"
                  />
                </Link>
                <div className="text-center">
                  <Link to={`/${item.type}/${item.id}`} className="text-xl font-bold text-black dark:text-blue-400 hover:underline">
                    {item.title}
                  </Link>
                  <p className="text-md mt-2 text-blue-400 dark:text-yellow-400">Your Rating: {item.rating} / 5</p>
                </div>
                <button
                  onClick={() => handleDeleteRating(item.id, item.type)}
                  className="absolute top-4 right-4 bg-red-600 text-white text-sm px-3 py-1 rounded-full hover:bg-red-700 transition"
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-400 text-center mt-16">Anda belum memberi rating pada film atau acara TV apa pun.</p>
        )}
      </div>
    </div>
  );
  
};

export default RatedMoviesAndShows;
