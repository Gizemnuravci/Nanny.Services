import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  filter: "A to Z",
  favorites: [],
  page: 1,
  perPage: 3,
  isLoading: false,
  error: null,
};

const nanniesSlice = createSlice({
  name: "nannies",
  initialState,
  reducers: {
    setNannies: (state, action) => {
      state.items = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.page = 1;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    resetPage: (state) => {
      state.page = 1;
    },
    toggleFavorite: (state, action) => {
      const nanny = action.payload;
      const index = state.favorites.findIndex(
        (item) => item.name === nanny.name,
      );

      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(nanny);
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setNannies,
  setFilter,
  incrementPage,
  resetPage,
  toggleFavorite,
  setLoading,
  setError,
} = nanniesSlice.actions;

export const nanniesReducer = nanniesSlice.reducer;
