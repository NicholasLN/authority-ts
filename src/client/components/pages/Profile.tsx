import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router";
import Body from "../struct/Body";
import Selectable from "../struct/Selectable";

export default function Profile() {
  const userState = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userState.loggedIn) {
      navigate("/");
    }
  }, [userState.loggedIn]);

  return (
    <Body>
      <Selectable selectableType="Player" contentId="1">
        <p>username: {userState.user.username}</p>
        <p>email: {userState.user.email}</p>
      </Selectable>
    </Body>
  );
}
