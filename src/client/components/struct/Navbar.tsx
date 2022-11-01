import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logout } from "../../redux/reducers/authSlice";
import {
  characterLogout,
  switchCharacter,
} from "../../redux/reducers/characterSlice";

export default function Navbar() {
  const userState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const logoutFunc = function (): any {
    dispatch(logout());
    // Make sure to reset the character state
    dispatch(characterLogout());
  };

  return (
    <>
      {/* Brand with text: AUTHORITY */}
      <div className="flex items-center px-3">
        <h1 className="text-2xl font-bold text-background-body font-signika">
          <Link to="/">AUTHORITY</Link>
        </h1>
      </div>
      {/* Login/Register/Profile */}
      <div className="flex flex-grow justify-start items-center px-3 font-signika text-gray-200">
        {!userState.loggedIn ? (
          <>
            <Link className="px-2" to="/login">
              Login
            </Link>
            <Link className="px-2" to="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link className="px-2" to="/profile">
              User Home
            </Link>
            <button className="px-2" onClick={logoutFunc}>
              Logout
            </button>
          </>
        )}
      </div>
    </>
  );
}
