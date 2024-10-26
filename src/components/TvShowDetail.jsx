// src/pages/TvShowDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TvShowDetail = () => {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(() => {
    const storedRatings = localStorage.getItem('tvShowRatings');
    const parsedRatings = storedRatings ? JSON.parse(storedRatings) : {};
    return parsedRatings[id] || 0;
  });

  const fetchTvShowDetail = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzUwNmY4ODQ4YTBkYmE4YTQ0YjJiZDdhMTgxNzk1NCIsIm5iZiI6MTcyOTUxNTI3OC4xMTU3MjYsInN1YiI6IjY3MDQ4M2Q0NWY5NTg5MjQ4OGJmZjk4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hfXE2L_jRmCMBdsPAtK9BQtpngTSj72uC0lvWubN0pY ` // Ganti dengan token API Anda
        }
      });

      setTvShow(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching TV show details.');
      setLoading(false);
    }
  };

  const handleRating = (newRating) => {
    setRating(newRating);
    const storedRatings = localStorage.getItem('tvShowRatings');
    const parsedRatings = storedRatings ? JSON.parse(storedRatings) : {};
    parsedRatings[id] = newRating;
    localStorage.setItem('tvShowRatings', JSON.stringify(parsedRatings));
  };

  useEffect(() => {
    fetchTvShowDetail();
  }, [id]);

  if (loading) {
    return <div className="text-center text-white">Loading TV show details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${tvShow.backdrop_path})`,
      }}
    >
      {/* Overlay untuk membuat background lebih gelap */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Konten Utama */}
      <div className="relative container mx-auto py-16 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-6 text-center">{tvShow.name}</h1>

        <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
          {/* Poster TV Show dengan jarak dari dinding kiri */}
          <img
            src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
            alt={tvShow.name}
            className="w-full md:w-1/3 rounded-lg shadow-lg ml-4 md:ml-8"
          />

          {/* Informasi TV Show */}
          <div className="flex flex-col space-y-4 text-lg md:ml-8">
            <p><strong>First Air Date:</strong> {tvShow.first_air_date}</p>
            <p><strong>Overview:</strong> {tvShow.overview}</p>
            <p><strong>Rating:</strong> {tvShow.vote_average} / 10</p>

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
              <p className="mt-2 text-sm text-gray-300">Click the stars to rate this TV show.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvShowDetail;
