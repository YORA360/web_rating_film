// src/components/Movies.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Movies = () => {
  const movies = useSelector(state => state.movie.movies);
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800 dark:text-white ">Movies</h1>
      <div className="overflow-x-auto">
        <ul className="flex space-x-6 whitespace-nowrap">
          {movies?.map(movie => (
            <li 
              key={movie.id} 
              className="min-w-[150px] group relative"
              onClick={() => navigate(`/movie/${movie.id}`)} 
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title || movie.name}
                className="rounded-lg mb-2 shadow-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 text-center truncate max-w-full">
                  {movie.title || movie.name}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Movies;
