import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { logout } from "../../redux/reducers/authSlice";

export default function Navbar() {
  const userState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const logoutFunc = function (): any {
    dispatch(logout());
    Cookies.set("access_token", "null");
  };

  return (
    <>
      {/* Brand with text: AUTHORITY */}
      <div className="flex items-center px-3">
        <h1 className="text-2xl font-bold text-background-body font-signika">
          AUTHORITY
        </h1>
      </div>
      {/* Login/Register/Profile */}
      <div className="flex flex-grow justify-start items-center px-3 font-signika text-gray-200">
        {!userState.loggedIn ? (
          <>
            <Link className="px-1" to="/login">
              Login
            </Link>
            <Link className="px-1" to="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link className="px-1" to="/profile">
              Profile
            </Link>
            <button className="px-1" onClick={logoutFunc}>
              Logout
            </button>
          </>
        )}
      </div>
    </>
  );
}
