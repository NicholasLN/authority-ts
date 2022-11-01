import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router";
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
      <p className="text-xl font-semibold">Characters</p>
      <div className="flex flex-row flex-wrap">
        {charState.characters.map((char) => {
          return (
            <div className="flex flex-col mx-3" key={char._id}>
              <Selectable
                selectableType="Character"
                contentId={char._id}
                characterId={char._id}
              >
                <p>{char.name}</p>
              </Selectable>
            </div>
          );
        })}
      </div>
      <br />
      {charState.currentCharacter ? (
        <div className="text-center">
          <p className="text-xl font-semibold">Current Character</p>
          <p>{charState.currentCharacter.name}</p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl font-semibold">Current Character</p>
          <p>No character selected</p>
        </div>
      )}
    </Body>
  );
}
