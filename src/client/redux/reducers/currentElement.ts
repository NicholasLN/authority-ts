import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const currentElement = createSlice({
  name: "currentPage",
  initialState: {
    element: "Player",
    contentId: 0
  },
  reducers: {
    changeElement: (state, action: PayloadAction<{element: any, contentId: any}>) => {
      state.element = action.payload.element;
      state.contentId = action.payload.contentId;
    },
  },
});

export const { changeElement } = currentElement.actions;
export default currentElement.reducer;
