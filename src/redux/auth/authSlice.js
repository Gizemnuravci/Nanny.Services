import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  isRefreshing: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        state.user = {
          uid: action.payload.uid,
          email: action.payload.email,
          displayName: action.payload.displayName || "",
        };
        state.isLoggedIn = true;
      } else {
        state.user = null;
        state.isLoggedIn = false;
      }
      state.isRefreshing = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isRefreshing = false;
    },
    setRefreshing: (state, action) => {
      state.isRefreshing = action.payload;
    },
  },
});

export const { setUser, clearUser, setRefreshing } = authSlice.actions;
export const authReducer = authSlice.reducer;
