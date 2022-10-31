import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";

export default function App() {
  return (
    <>
      <RouterProvider router={router} fallbackElement={<h1>Loading</h1>} />
    </>
  );
}
