import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../components/struct/Alert";
import { removeAlert } from "../redux/reducers/alertSlice";

export default function AlertHandler() {
  const alertState = useSelector((state: RootState) => state.alerts);
  const dispatch = useDispatch();

  useEffect(() => {
    // Delete alerts based on their timeout
    alertState.alerts.forEach((alert) => {
      setTimeout(() => {
        dispatch(removeAlert(alert.id));
      }, alert.timeout);
    });
  }, [alertState.alerts]);

  if (alertState.alerts.length == 0) {
    return <></>;
  }
  return (
    <div className="flex flex-col fixed top-0 right-0 p-3">
      {alertState.alerts.map((alert) => {
        return (
          <Alert
            key={alert.id}
            type={alert.type}
            message={alert.message}
            timeout={alert.timeout}
          />
        );
      })}
    </div>
  );
}
