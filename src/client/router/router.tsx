import * as React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import Profile from "../components/pages/Profile";
import Character from "../components/pages/Character";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="profile" element={<Profile />} />
      {/* Character Paths */}
      <Route path="character">
        <Route path="" element={<Character />} />
        <Route path=":id/" element={<Character />} />
      </Route>
    </Route>
  )
);

export default router;
