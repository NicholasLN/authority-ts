import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router";
import postPage from "../../utils/postPage";
import { login } from "../../redux/reducers/authSlice";
import Body from "../struct/Body";
import Cookies from "js-cookie";
import { updateCharacters } from "../../redux/reducers/characterSlice";
import { addAlert } from "../../redux/reducers/alertSlice";
import { AxiosError } from "axios";

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
    var res: any = await postPage("/api/user/login", {
      username,
      password,
      remember: false,
    })
      .catch((err: any) => {
        var errors = err.response?.data.errors;
        if (errors) {
          errors.forEach((error: any) => {
            dispatch(
              addAlert({
                message: error.msg,
                type: "error",
                timeout: 5000,
              } as Alert)
            );
          });
        }
      })
      .then((res) => {
        if (res) {
          dispatch(login(res.data));
          dispatch(updateCharacters(res.data.user.characters));
          navigate("/profile");
          dispatch(
            addAlert({
              message: "Logged in successfully",
              type: "success",
              timeout: 5000,
            } as Alert)
          );
        }
      });
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
