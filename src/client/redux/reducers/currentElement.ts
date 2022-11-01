import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const currentElement = createSlice({
  name: "currentPage",
  initialState: {
    element: "Player",
    contentId: 0,
    characterId: 0
  },
  reducers: {
    changeElement: (state, action: PayloadAction<{element: any, contentId: any, characterId: any}>) => {
      state.element = action.payload.element;
      state.contentId = action.payload.contentId;
      state.characterId = action.payload.characterId;
    },
  },
});

export const { changeElement } = currentElement.actions;
export default currentElement.reducer;
