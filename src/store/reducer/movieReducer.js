// src/store/reducer/movieReducer.js

const initialState = {
  trendingMovies: [],
  movies: [],
  tvShows: [],
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return {
        ...state,
        movies: action.payload,
      };
    case 'SET_TRENDING_MOVIES':
      return {
        ...state,
        trendingMovies: action.payload,
      };
    case 'SET_TV_SHOWS':
      return {
        ...state,
        tvShows: action.payload,
      };
    default:
      return state;
  }
};

export default movieReducer;
