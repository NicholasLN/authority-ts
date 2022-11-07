// Alert Reducer
// This reducer is used to manage the alert state
// Path: src\client\redux\reducers\alertSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const alertsSlice = createSlice({
  name: "alerts",
  initialState: {
    alerts: [] as Alert[],
  },
  reducers: {
    quickErrorAlert: (state, action: PayloadAction<string>) => {
      state.alerts.push({
        type: "error",
        message: action.payload,
        timeout: 5000,
        id: Date.now(),
      });
    },
    quickSuccessAlert: (state, action: PayloadAction<string>) => {
      state.alerts.push({
        type: "success",
        message: action.payload,
        timeout: 5000,
        id: Date.now(),
      });
    },
    addAlert: (state, action: PayloadAction<Alert>) => {
      var randomAlertId = Math.floor(Math.random() * 100000000000000000);
      action.payload.id = randomAlertId;
      state.alerts.push(action.payload);
    },
    removeAlert: (state, action: PayloadAction<number>) => {
      // Remove the alert from the array
      state.alerts = state.alerts.filter(
        (alert) => alert.id !== action.payload
      );
    },
  },
});

export const { quickErrorAlert, quickSuccessAlert, addAlert, removeAlert } =
  alertsSlice.actions;
export default alertsSlice.reducer;
