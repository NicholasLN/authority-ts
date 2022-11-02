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
import CharacterCreate from "../components/pages/Character/create";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/character/create" element={<CharacterCreate />} />
    </>
  )
);

export default router;
