import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const currentElement = createSlice({
  name: "currentElement",
  initialState: {
    contextType: "Player",
    contextId: 0,
    characterId: 0,
  },
  reducers: {
    changeElement: (
      state,
      action: PayloadAction<{
        contextType: any;
        contextId: any;
      }>
    ) => {
      state.contextType = action.payload.contextType;
      state.contextId = action.payload.contextId;
    },
    invalidateElement: (state) => {
      state.contextType = "Default";
      state.contextId = 0;
    },
  },
});

export const { changeElement, invalidateElement } = currentElement.actions;
export default currentElement.reducer;
