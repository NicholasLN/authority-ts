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

export const { addAlert, removeAlert } = alertsSlice.actions;
export default alertsSlice.reducer;
