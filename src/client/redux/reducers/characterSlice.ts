import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

export const charSlice = createSlice({
  name: "character",
  initialState: {
    currentCharacter: false,
    characters: [],
  },
  reducers: {
    updateCharacters: (state, action) => {
      state.characters = action.payload;

      // If user has a cookie for current character, check it against the list of characters to see if it's valid.
      // If it is, set it as the current character. If not, set current character to false and unset the cookie.
      if (Cookies.get("current_character") != "none") {
        var cookieChar = Cookies.get("current_character");
        var char = state.characters.find(
          (char: any) => char._id === cookieChar
        );
        if (char) {
          state.currentCharacter = char;
        } else {
          Cookies.set("current_character", "none");
        }
      } else {
        state.currentCharacter = false;
      }
    },
    switchCharacter: (state, action) => {
      Cookies.set("current_character", action.payload._id);
      state.currentCharacter = action.payload;
    },
  },
});

export const { updateCharacters, switchCharacter } = charSlice.actions;
export default charSlice.reducer;
