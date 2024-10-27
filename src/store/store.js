import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducer/movieReducer";
import themeReducer from "./reducer/themeReducer";



const store = configureStore({
  reducer :{

      movie: movieReducer,
      theme :themeReducer,
  }
});
  

export default store;
