// src/components/RandomMovieHeader.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RandomMovieHeader = () => {
  const [randomMovie, setRandomMovie] = useState(null);
  const navigate = useNavigate();

  // Fungsi untuk mendapatkan film acak
  const fetchRandomMovie = async () => {
    try {
      const response = await axios.get("https://api.themoviedb.org/3/trending/movie/week?language=en-US", {
        headers: {
          accept: "application/json",
          Authorization: `Bearer YOUR_API_KEY` // Ganti dengan API key yang kamu miliki
        }
      });
      
      const movies = response.data.results;
      const randomIndex = Math.floor(Math.random() * movies.length); // Pilih film secara acak
      setRandomMovie(movies[randomIndex]);
    } catch (error) {
      console.error("Error fetching random movie:", error);
    }
  };

  useEffect(() => {
    fetchRandomMovie(); // Ambil film acak ketika komponen dimuat
  }, []);

  // Fungsi untuk menangani navigasi ke halaman detail
  const goToDetailPage = () => {
    if (randomMovie) {
      navigate(`/movie/${randomMovie.id}`); // Arahkan ke halaman detail dengan movie.id
    }
  };

  if (!randomMovie) {
    return <p>Loading...</p>; // Tampilkan loading jika data belum tersedia
  }

  return (
    <div
      className="relative hero min-h-screen -top-14"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${randomMovie.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginTop: -24,
      }}
    >
      {/* Gradient Shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-white via-transparent to-transparent dark:bg-gradient-to-t dark:from-black dark:via-transparent"></div>

      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <span className="badge badge-primary">Tayang Sekarang</span>
          <h1 className="mb-5 text-5xl font-bold">{randomMovie.title}</h1>
          <p className="mb-5">{randomMovie.overview}</p>
          <div className="flex justify-center gap-4">
            <button className="btn btn-primary" onClick={goToDetailPage}>Lihat Detail</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomMovieHeader;
