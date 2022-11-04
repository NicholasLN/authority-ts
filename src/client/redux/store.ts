import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import windowFocusReducer from "./reducers/windowFocusSlice";
import uiReducer from "./reducers/uiSlice";
import charReducer from "./reducers/characterSlice";
import contextReducer from "./reducers/contextSlice";
import alertReducer from "./reducers/alertSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    windowFocus: windowFocusReducer,
    ui: uiReducer,
    character: charReducer,
    contextMenu: contextReducer,
    alerts: alertReducer,
  },
});
