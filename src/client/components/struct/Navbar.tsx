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
  const [navbarDropdownsShown, setNavbarDropdownsShown] = React.useState({
    user: false,
    characters: false,
  });

  const userState = useSelector((state: RootState) => state.auth);
  const charState = useSelector((state: RootState) => state.character);
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
            {/* If the user is logged in, display their username and a dropdown menu with a link to their profile and a logout button */}
            <div className="relative">
              <button
                onClick={() =>
                  setNavbarDropdownsShown({
                    ...navbarDropdownsShown,
                    user: !navbarDropdownsShown.user,
                  })
                }
                className="flex flex-row items-center px-2 py-1 rounded-md bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
              >
                <span className="text-sm font-medium">
                  {userState.user.username}
                </span>
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm0 4a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 4a1 1 0 100 2h6a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div
                className={`${
                  navbarDropdownsShown.user ? "block" : "hidden"
                } absolute right-0 w-48 mt-2 z-50 origin-top-right bg-gray-700 border border-gray-600 divide-y divide-gray-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
              >
                <div className="px-1 py-1 ">
                  <Link
                    to={`/profile`}
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
                  >
                    Your Profile
                  </Link>
                </div>
                <div className="px-1 py-1 ">
                  <button
                    onClick={logoutFunc}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
            <div>
              <Link to="/map">
                <button className="px-2 py-1 rounded-md bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50">
                  Map
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
