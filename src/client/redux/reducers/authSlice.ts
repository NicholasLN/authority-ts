import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    loggedIn: false,
  },
  reducers: {
    updateState: (state, action) => {
      state.user = action.payload;
    },
    login: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = {};
    },
  },
});

export const { updateState, login, logout } = authSlice.actions;
export default authSlice.reducer;
