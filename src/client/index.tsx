import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
import "./tailwind.css";
import WindowFocusHandler from "./handlers/windowFocusHandler";
import UserSessionHandler from "./handlers/userSessionHandler";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <WindowFocusHandler>
      <UserSessionHandler>
        <App />
      </UserSessionHandler>
    </WindowFocusHandler>
  </Provider>
);
