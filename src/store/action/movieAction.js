// src/store/action/movieAction.js

export const setMovies = (movies) => {
  return {
    type: 'SET_MOVIES',
    payload: movies,
  };
};

export const setTrendingMovies = (trendingMovies) => {
  return {
    type: 'SET_TRENDING_MOVIES',
    payload: trendingMovies,
  };
};

export const setTvShows = (tvShows) => {
  return {
    type: 'SET_TV_SHOWS',
    payload: tvShows,
  };
};
