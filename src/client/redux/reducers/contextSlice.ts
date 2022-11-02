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
      console.log("changeElement", state.contextType, state.contextId);
    },
    invalidateElement: (state) => {
      state.contextType = "Default";
      state.contextId = 0;
      console.log("invalidateElement", state.contextType, state.contextId);
    },
  },
});

export const { changeElement, invalidateElement } = currentElement.actions;
export default currentElement.reducer;
