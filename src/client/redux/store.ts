import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import windowFocusReducer from "./reducers/windowFocusSlice";
import uiReducer from "./reducers/uiSlice";
import currentPageSlice from "./reducers/currentPageSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    windowFocus: windowFocusReducer,
    ui: uiReducer,
    page: currentPageSlice,
  },
});
