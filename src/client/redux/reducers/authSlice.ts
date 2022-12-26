import { createSlice } from "@reduxjs/toolkit";
import { IDLE_FETCHER } from "@remix-run/router";
import Cookies from "js-cookie";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    loggedIn: false,
  },
  reducers: {
    updateState: (state, action) => {
      // Compare state to found char, if they're not the same, update state.
      state.user = action.payload;
    },
    login: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload.user;

      // If token is in the payload, set it as a cookie
      if (action.payload.token) {
        Cookies.set("access_token", action.payload.token);
      }
      // if character cookie doesn't exist, initialize it
      if (!Cookies.get("current_character")) {
        Cookies.set("current_character", "none");
      }
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = {};
      Cookies.set("access_token", "null");
      Cookies.set("current_character", "none");
    },
  },
});

export const { updateState, login, logout } = authSlice.actions;
export default authSlice.reducer;
