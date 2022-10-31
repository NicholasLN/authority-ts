import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    hideSidebar: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.hideSidebar = !state.hideSidebar;
    },
  },
});

export const { toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
