import { configureStore } from "@reduxjs/toolkit";
import queryReducer from "./querySlice";

const store = configureStore({
  reducer: {
    queries: queryReducer,
  },
});

export default store;
