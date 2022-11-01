import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router";
import postPage from "../../utils/postPage";
import { login } from "../../redux/reducers/authSlice";
import Body from "../struct/Body";
import Cookies from "js-cookie";

export default function Register() {
  const userState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (userState.loggedIn) {
      navigate("/profile");
    }
  }, []);
  const registerSubmit = async () => {
    var res = await postPage("/api/user/register", {
      username,
      password,
      email,
    });
    if (res.status == 200) {
      dispatch(login(res.data));
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
        id="password"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <p>email</p>
      <input
        id="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <button className="text-blue-400" onClick={registerSubmit}>
        register
      </button>
    </Body>
  );
}
