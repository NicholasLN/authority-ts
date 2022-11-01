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
      <p>username</p>
      <input
        id="username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <br />
      <p>password</p>
      <input
        type="password"
        id="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <button className="text-blue-400" onClick={loginSubmit}>
        login
      </button>
    </Body>
  );
}
