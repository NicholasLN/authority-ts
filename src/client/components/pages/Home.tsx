import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Body from "../struct/Body";

export default function Home() {
  const userState = useSelector((user: RootState) => user.auth);
  return (
    <Body>
      <h1 className="text-lg align-middle underline">Home</h1>
      <br />
      <div className="text-blue-500">
        {!userState.loggedIn ? (
          <>
            <Link to="/login">Login Page</Link>
            <br />
            <Link to="/register">Register Page</Link>
          </>
        ) : (
          <Link to="/profile">Profile</Link>
        )}
      </div>
    </Body>
  );
}
