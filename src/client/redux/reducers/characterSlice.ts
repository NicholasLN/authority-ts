import Cookies from "js-cookie";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type charSliceState = {
  currentCharacter: Character | boolean;
  characters: Character[];
};

const initialState: charSliceState = {
  currentCharacter: false,
  characters: [],
};

export const charSlice = createSlice({
  name: "character",
  initialState,
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
      // Find the character in the list of characters and set it as the current character.
      var char = state.characters.find(
        (char: Character) => char._id === action.payload._id
      );
      console.log();
      if (char) {
        state.currentCharacter = char;
      } else {
        state.currentCharacter = false;
      }
    },
    characterLogout: (state) => {
      Cookies.set("current_character", "none");
      state.characters = [];
      state.currentCharacter = false;
    },
    newCharacter: (state, action) => {
      var char: Character = action.payload;
      state.characters.push(char);
      state.currentCharacter = char;
      Cookies.set("current_character", action.payload._id);
    },
  },
});

export const {
  updateCharacters,
  switchCharacter,
  characterLogout,
  newCharacter,
} = charSlice.actions;
export default charSlice.reducer;
