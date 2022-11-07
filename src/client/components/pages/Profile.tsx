import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router";
import SelectCharacterModal from "../modals/SelectCharacterModal";
import Body from "../struct/Body";
import Selectable from "../struct/Selectable";

export default function Profile() {
  const userState = useSelector((state: RootState) => state.auth);
  const charState = useSelector((state: RootState) => state.character);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userState.loggedIn) {
      navigate("/");
    }
  }, [userState.loggedIn]);

  return (
    <Body>
      <p className="text-3xl">Welcome {userState.user.username}</p>
      <SelectCharacterModal
        onClose={() => {
          navigate(`/character?id=${charState.currentCharacter._id}`);
        }}
        shown={true}
        chars={charState.characters}
      />
    </Body>
  );
}
