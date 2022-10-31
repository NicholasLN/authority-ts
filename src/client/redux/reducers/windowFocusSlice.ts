import { createSlice } from "@reduxjs/toolkit";

export const windowFocusSlice = createSlice({
  name: "windowFocus",
  initialState: {
    focus: true,
  },
  reducers: {
    setFocus: (state, action) => {
      state.focus = action.payload;
    },
  },
});

export const { setFocus } = windowFocusSlice.actions;
export default windowFocusSlice.reducer;
