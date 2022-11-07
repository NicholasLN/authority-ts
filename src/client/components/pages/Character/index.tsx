import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { quickErrorAlert } from "../../../redux/reducers/alertSlice";
import getPage from "../../../utils/getPage";
import ChangePictureModal from "../../modals/CharacterProfile.tsx/ChangePictureModal";
import Body from "../../struct/Body";

export default function Character() {
  const characterState = useSelector((state: RootState) => state.character);
  const userState = useSelector((state: RootState) => state.auth);

  const [searchParams] = useSearchParams();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [showChangePictureModal, setShowChangePictureModal] =
    React.useState(false);
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
          dispatch(
            quickErrorAlert("Failed to load character. They may not exist.")
          );
        });
    }
    getCharacter();
  }, [
    characterState.currentCharacter,
    characterState.characters,
    userState.loggedIn,
  ]);

  if (loading) {
    return (
      <Body>
        <BeatLoader />
      </Body>
    );
  }

  return (
    <Body>
      {/* Create a user profile for characters */}
      {/* It shouldn't be centered, and should instead be left-right, with a circle of the characters picture in the top left. */}
      <ChangePictureModal
        shown={showChangePictureModal}
        onClose={() => setShowChangePictureModal(false)}
      />
      <div className="flex flex-col items-center w-full h-full p-3 bg-slate-50 shadow-xl">
        <img
          onClick={() => {
            if (charInfo._id === characterState.currentCharacter._id) {
              setShowChangePictureModal(true);
            }
          }}
          className={`w-36 h-36 rounded-full shadow-lg object-cover ring-2 ring-gray-300 p-1 ${
            characterState.currentCharacter._id == charInfo._id
              ? "hover:ring-4 hover:ring-blue-500 hover:cursor-pointer delay-75"
              : ""
          }`}
          src={charInfo.picture}
        />
        <h1 className="text-2xl ">{charInfo.name}</h1>
        <p className="text-lg">
          {charInfo._id === characterState.currentCharacter._id ? (
            <p>This is you.</p>
          ) : (
            <p>This isn't you</p>
          )}{" "}
        </p>
      </div>
    </Body>
  );
}
