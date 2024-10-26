// src/components/TvShows.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TvShows = () => {
  const tvShows = useSelector(state => state.movie.tvShows);
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-6 text-center dark:text-white text-black">TV Shows</h1>
      <div className="overflow-x-auto">
        <ul className="flex space-x-6 whitespace-nowrap">
          {tvShows?.map(tv => (
            <li 
              key={tv.id} 
              className="min-w-[150px] group relative"
              onClick={() => navigate(`/tv/${tv.id}`)} 
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${tv.poster_path}`}
                alt={tv.name}
                className="rounded-lg mb-2 shadow-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 text-center truncate max-w-full">
                  {tv.name}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TvShows;
