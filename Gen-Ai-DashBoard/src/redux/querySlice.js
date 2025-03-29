import { createSlice } from "@reduxjs/toolkit";

const querySlice = createSlice({
  name: "queries",
  initialState: { history: [], results: null, loading: false, error: null },
  reducers: {
    addQuery: (state, action) => {
      state.history.push(action.payload);
    },
    setResults: (state, action) => {
      state.results = action.payload;
      state.loading = false;
    },
    sethistResults: (state, action) => {
        state.results = action.payload;
        state.loading = false;
      },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { addQuery, setResults,sethistResults, setLoading, setError } = querySlice.actions;
export default querySlice.reducer;
