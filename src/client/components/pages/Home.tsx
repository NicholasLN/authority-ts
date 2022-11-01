import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Body from "../struct/Body";

export default function Home() {
  const userState = useSelector((user: RootState) => user.auth);
  return (
    <Body>
      <h1 className="text-3xl font-extrabold">AUTHORITY</h1>
      <p className="text-xl">
        I shat my pants and I'm not going to change it. I fucking hate this
        website. You can't even see the fucking code. I am so fucking mad. I am
        so fucking mad. I am so fucking mad.
      </p>
      {!userState.loggedIn ? (
        <>
          <Link to="/login">
            <button className="text-white bg-blue-500 rounded-md p-2 px-3">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="text-white bg-blue-500 rounded-md p-2 px-3 m-3">
              Register
            </button>
          </Link>
        </>
      ) : (
        <>
          <Link to="/profile">
            <button className="text-white bg-blue-500 rounded-md p-2 px-3">
              Profile
            </button>
          </Link>
        </>
      )}
    </Body>
  );
}
