import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { quickErrorAlert } from "../../../redux/reducers/alertSlice";
import getPage from "../../../utils/getPage";
import ChangePictureModal from "../../modals/CharacterProfile.tsx/ChangePictureModal";
import Body from "../../struct/Body";
import NotFound from "../../struct/NotFound";
import Selectable from "../../struct/Selectable";
import BioEditor from "./BioEditor";

const defaultPic = String(
  require("../../../assets/img/placeholderpic.png").default
);
function Character() {
  const characterState = useSelector((state: RootState) => state.character);
  const userState = useSelector((state: RootState) => state.auth);

  const [searchParams] = useSearchParams();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [showChangePictureModal, setShowChangePictureModal] =
    React.useState(false);
  const [charInfo, setCharInfo] = React.useState<Character>({} as Character);
  const [notFound, setNotFound] = React.useState(false);
  const [profileMode, setProfileMode] = React.useState("overview");
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
      var response = await getPage(`/api/character/read/${searchId}`);
      if (response.status === 200 || response.status === 304) {
        console.log(response.data);
        setCharInfo(response.data);
        setLoading(false);
      } else {
        setNotFound(true);
        setLoading(false);
      }
    }
    getCharacter();

    return () => {
      setLoading(true);
      setCharInfo({} as Character);
      setNotFound(false);
    };
  }, [characterState.currentCharacter, searchParams, nav, dispatch]);

  if (loading) {
    return (
      <Body>
        <BeatLoader />
      </Body>
    );
  }

  if (!notFound) {
    return (
      <Body>
        <div className="flex flex-col w-full h-full">
          {/* Create a user profile for characters */}
          {/* It shouldn't be centered, and should instead be left-right, with a circle of the characters picture in the top left. */}
          <ChangePictureModal
            shown={showChangePictureModal}
            onClose={() => setShowChangePictureModal(false)}
          />
          <div
            className="flex flex-col w-full p-3 border-slate-300 shadow-lg"
            id="whiteHouseBG"
          >
            <div className="flex flex-col items-center w-full m-4">
              {/* Profile Picture, Name, Region, Country, Gender, Age, Title */}
              <div className="flex flex-row justify-center w-full">
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
                  src={
                    charInfo.picture != "default.png"
                      ? charInfo.picture
                      : defaultPic
                  }
                />
                <div className="flex flex-col self-center ml-2">
                  <div className="text-2xl">{charInfo.name}</div>
                  <div className="flex flex-row">
                    <svg
                      className="w-4 h-4 inline-block mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11.239 7.237c-.004-.009-.288-.017-.24-.078l.137-.085c.013-.077.072-.162-.007-.304l.047-.125-.1.029s.141-.606.33-.332l-.08.093c.122.122.155.426.195.623.115.06.294.071.088.175.106-.018-.561.286-.648.161-.065-.076.288-.127.278-.157zm-.715-.159c-.077.078.003.128.082.094.114-.05.269-.048.284-.202l.073-.091-.101-.135c-.06-.012-.1.064-.137.095l-.066.017-.062.08.007.044-.08.098zm7 9.167l-.733-1.206-.724-1.186c-.73-1.194-1.388-2.276-1.961-3.296l-.07.067c-.376.156-.942-.509-1.339-.531.192.03.018-.49.018-.524-.153-.189-1.123.021-1.378.055-.479.063-.979.057-1.346.355-.258.21-.262.551-.524.716-.17.106-.356.072-.502.209-.258.245-.553.607-.697.929-.062.135.077.458.043.632-.336 1.063.085 2.538 1.375 2.701.312.039.638.209.955.114.252-.076.474-.248.745-.268.377-.025.22.529.737.379.251-.074.365.172.365.359-.084.391-.268.609.088.883.242.188.442.456.486.78.026.182.196.494-.015.602-.149.075-.259.507-.257.649.031.165.365.481.466.621.146.2.039.436.158.663.122.232.237.41.323.645.111.324.958-.007 1.156-.006.673.004 1.014-.944 1.487-1.235.267-.165.192-.616.51-.848.296-.215.608-.344.636-.741.021-.344-.259-1.062-.104-1.353l.102-.165zm-7.301-7.76c.041.172-.119.645-.154.795-.031.138.442.226.415.295.004-.008.642-.22.705-.275l.144-.323c.121-.081.248-.146.384-.196l.164-.285c.056-.021.71-.123.756-.101.165.075.469.389.583.531l.041.032c-.326-.67-.59-1.314-.796-1.942l-.083.036c-.222 0-.528.251-.663.405-.095.104-.669.337-.732.33.33.035.314.276.288.482-.068.476-1.096.035-1.052.216zm10.904 5.049c-.277 4.807-4.253 8.623-9.13 8.623-2.603 0-4.951-1.086-6.618-2.83-.198-.208-.346-.7-.02-.9l.331-.085c.259-.22-.242-1.111-.044-1.254.617-.441.324-.982-.055-1.429-.161-.19-1.043-1.1-1.143-.937.074-.249-.16-.85-.302-1.087-.239-.398-.553-.643-.679-1.081-.05-.174-.05-.704-.153-.826-.041-.05-.358-.185-.347-.257.305-1.82 1.147-3.458 2.364-4.751l.821-.33c.515-.773.545-.173 1.008-.375.154 0 .331-.634.496-.734.289-.185.068-.185.015-.27-.112-.184 2.411-1.103 2.453-.938.034.14-1.249.809-1.108.788-.326.043-.388.627-.328.625.163-.005 1.182-.774 1.657-.61.466.161 1.301-.37 1.627-.64l.04-.038c.029-.761.195-1.494.481-2.172l-.493-.026c-6.075 0-11 4.925-11 11s4.925 11 11 11c6.074 0 11-4.925 11-11 0-.764-.078-1.509-.227-2.229-.491.864-1.044 1.779-1.646 2.763zm1.873-9.1c0 2.45-1.951 5.373-4.5 9.566-2.549-4.193-4.5-7.116-4.5-9.566 0-2.449 2.139-4.434 4.5-4.434s4.5 1.985 4.5 4.434zm-2.75.066c0-.966-.784-1.75-1.75-1.75s-1.75.784-1.75 1.75.784 1.75 1.75 1.75 1.75-.784 1.75-1.75z" />
                    </svg>
                    <p className="text-sm font-medium">
                      {charInfo.region.name != charInfo.country.name &&
                        `${charInfo.region.name}, `}
                      {charInfo.country.name}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {charInfo.gender} | {charInfo.age} years old
                  </div>
                  <div className="text-sm text-gray-500">Title/Status here</div>
                </div>
              </div>
            </div>
          </div>
          {/* Add a row of buttons for switching between profile modes. It should be vertical, with the space besides it being reserved for the content. */}
          <div className="flex flex-row justify-start w-full h-full">
            <div className="flex flex-col w-18 p-3 bg-gray-200 border-t border-slate-300 shadow-md">
              <button
                className={
                  profileMode == "overview"
                    ? "w-full text-base font-medium text-gray-200 bg-gray-700 rounded-lg border border-gray-600 p-2 my-1"
                    : "w-full text-base font-medium text-gray-400 bg-gray-600 rounded-lg border border-gray-600 p-2 my-1"
                }
                onClick={() => setProfileMode("overview")}
              >
                Overview
              </button>
              <button
                className={
                  profileMode == "skills"
                    ? "w-full text-base font-medium text-gray-200 bg-gray-700 rounded-lg border border-gray-600 p-2 my-1"
                    : "w-full text-base font-medium text-gray-400 bg-gray-600 rounded-lg border border-gray-600 p-2 my-1"
                }
                onClick={() => setProfileMode("skills")}
              >
                Skills
              </button>
            </div>
            <div className="flex w-full h-full bg-slate-300 p-2">
              {profileMode == "overview" && (
                <h1 className="text-2xl font-boldfont-signika">Overview</h1>
              )}
            </div>
          </div>
        </div>
      </Body>
    );
  } else {
    return (
      <NotFound
        errorType="Character not found"
        errorMessage="The character you are looking for does not exist."
        extraMessage="If you believe this is an error, please contact the site administrator."
      />
    );
  }
}
export default React.memo(Character);
