import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router";
import { logout } from "../../redux/reducers/authSlice";
import Body from "../struct/Body";

export default function Profile() {
  const [user, setUser] = useState({});

  const userState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutState = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    if (userState.loggedIn) {
      setUser(userState.user);
    } else {
      navigate("/login");
    }
  });

  return (
    <Body>
      <p>Profile</p>
    </Body>
  );
}
