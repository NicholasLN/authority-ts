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
import Map from "../components/map/Map";
import Country from "../components/pages/Country";
import NotFound from "../components/struct/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="profile" element={<Profile />} />
      <Route path="map" element={<Map />} />

      {/* Country */}
      <Route path="country">
        <Route path="" element={<Country />} />
        <Route path=":/" element={<Country />} />
      </Route>

      {/* Character Paths */}
      <Route path="character">
        <Route path="" element={<Character />} />
        <Route path=":id/" element={<Character />} />
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={<NotFound errorType="404" errorMessage="Page not found." />}
      />
    </Route>
  )
);

export default router;
