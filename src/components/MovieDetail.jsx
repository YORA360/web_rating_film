// src/pages/MovieDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(() => {
    const storedRatings = localStorage.getItem('movieRatings');
    const parsedRatings = storedRatings ? JSON.parse(storedRatings) : {};
    return parsedRatings[id] || 0;
  });

  const fetchMovieDetail = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzUwNmY4ODQ4YTBkYmE4YTQ0YjJiZDdhMTgxNzk1NCIsIm5iZiI6MTcyOTUxNTI3OC4xMTU3MjYsInN1YiI6IjY3MDQ4M2Q0NWY5NTg5MjQ4OGJmZjk4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hfXE2L_jRmCMBdsPAtK9BQtpngTSj72uC0lvWubN0pY` // Ganti dengan token Anda
        }
      });
      setMovie(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching movie details.');
      setLoading(false);
    }
  };

  const handleRating = (newRating) => {
    setRating(newRating);
    const storedRatings = localStorage.getItem('movieRatings');
    const parsedRatings = storedRatings ? JSON.parse(storedRatings) : {};
    parsedRatings[id] = newRating;
    localStorage.setItem('movieRatings', JSON.stringify(parsedRatings));
  };

  useEffect(() => {
    fetchMovieDetail();
  }, [id]);

  if (loading) {
    return <div className="text-center text-white">Loading movie details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      {/* Overlay untuk membuat background lebih gelap */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Konten Utama */}
      <div className="relative container mx-auto py-16 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-6 text-center">{movie.title}</h1>

        <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
          {/* Poster Film */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/3 rounded-lg shadow-lg ml-4 md:ml-8"
          />

          {/* Informasi Film */}
          <div className="flex flex-col space-y-4 text-lg">
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Overview:</strong> {movie.overview}</p>
            <p><strong>Rating:</strong> {movie.vote_average}</p>

            {/* Bagian Rating Bintang */}
            <div>
              <strong>Your Rating:</strong>
              <div className="flex space-x-1 mt-2">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    onClick={() => handleRating(index + 1)}
                    className={`cursor-pointer text-3xl ${
                      index + 1 <= rating ? 'text-yellow-500' : 'text-gray-400'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-300">Click the stars to rate this movie.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
