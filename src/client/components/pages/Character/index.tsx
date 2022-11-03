import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import getPage from "../../../utils/getPage";
import Body from "../../struct/Body";

export default function Character() {
  const characterState = useSelector((state: RootState) => state.character);
  const [searchParams] = useSearchParams();
  const nav = useNavigate();

  const [charInfo, setCharInfo] = React.useState<Character>({} as Character);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    async function getCharacter() {
      var searchId;
      if (searchParams.get("id")) {
        searchId = searchParams.get("id");
      } else {
        if (characterState.currentCharacter) {
          searchId = characterState.currentCharacter._id;
        } else {
          nav("/");
        }
      }
      await getPage(`/api/character/read/${searchId}`)
        .then((res) => {
          setCharInfo(res.data);
          setLoading(false);
        })
        .catch((err) => {
          nav("/");
        });
    }
    getCharacter();
    return () => {
      setLoading(true);
    };
  }, [searchParams, characterState.currentCharacter]);

  if (loading) {
    return (
      <Body>
        <BeatLoader />
      </Body>
    );
  }

  return (
    <Body>
      <h1>Character</h1>
      <p>{charInfo.name}</p>
      {charInfo._id === characterState.currentCharacter?._id ? (
        <p>This is u. Bitch</p>
      ) : (
        <p>This isn't u. Bitch</p>
      )}
    </Body>
  );
}
