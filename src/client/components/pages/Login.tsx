import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router";
import postPage from "../../utils/postPage";
import { login } from "../../redux/reducers/authSlice";
import Body from "../struct/Body";
import Cookies from "js-cookie";
import { updateCharacters } from "../../redux/reducers/characterSlice";

export default function Login() {
  const userState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (userState.loggedIn) {
      navigate("/profile");
    }
  }, []);
  const loginSubmit = async () => {
    var res = await postPage("/api/user/login", {
      username,
      password,
      remember: false,
    });
    if (res.status == 200) {
      dispatch(login(res.data));
      dispatch(updateCharacters(res.data.user.characters));
      navigate("/profile");
    }
  };
  return (
    <Body>
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={loginSubmit}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </Body>
  );
}
