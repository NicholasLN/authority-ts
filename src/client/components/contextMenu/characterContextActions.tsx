import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { invalidateElement } from "../../redux/reducers/contextSlice";
import getPage from "../../utils/getPage";
import SendCampaignFundsModal from "../modals/SendCampFundsModal";

function CharacterContextActions() {
  const currentContext = useSelector((state: RootState) => state.contextMenu);
  const characterState = useSelector((state: RootState) => state.character);
  const authState = useSelector((state: RootState) => state.auth);

  const [showSendCFModal, setShowSendCFModal] = useState(false);
  const [characterInfo, setCharacterInfo] = React.useState<Character>(
    {} as Character
  );
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const cachedCharacter = React.useMemo(() => {
    return characterState.characters.find(
      (char) => char._id === currentContext.contextId
    );
  }, [characterState.characters, currentContext.contextId]);

  useEffect(() => {
    async function getCharacter() {
      if (cachedCharacter) {
        setCharacterInfo(cachedCharacter);
        setLoading(false);
      } else {
        await getPage(`/api/character/read/${currentContext.contextId}`)
          .then((res) => {
            setCharacterInfo(res.data);
            setLoading(false);
          })
          .catch((err) => {
            dispatch(invalidateElement());
          });
      }
    }
    getCharacter();
    return () => {
      setLoading(true);
    };
  }, [currentContext.contextId, cachedCharacter, dispatch]);

  // TODO: Get character info from the database using contextId and populate the context options, (send money, mail, etc.)
  if (loading) {
    return <div>Loading...</div>;
  }
  // TODO: Tay, you can use this to make the context menu for characters. At this point you have the character info in the characterInfo variable.
  return (
    <>
      {/* No user is logged in (Guest View) */}
      {!authState.loggedIn ? (
        <>
          <li>
            <Link
              to={`/character/?id=${characterInfo._id}`}
              className="flex items-center justify-center text-white rounded-lg text-lg"
            >
              <span>{characterInfo.name}</span>
            </Link>
          </li>
          {/* add a divider line */}
          <hr className="border-gray-600" />
          <li>
            <a className="flex items-center justify-center text-white rounded-lg">
              <span>Dashboard</span>
            </a>
          </li>
        </>
      ) : // User is logged in (User View if not current character)
      characterInfo._id !== characterState.currentCharacter._id &&
        characterState.currentCharacter ? (
        <>
          <li>
            <Link
              to={`/character/?id=${characterInfo._id}`}
              className="flex items-center justify-center text-white rounded-lg text-lg"
            >
              <span>{characterInfo.name}</span>
            </Link>
          </li>
          <hr className="border-gray-600" />
          <li>
            <a
              type="button"
              className="flex items-center justify-center text-white text-center rounded-lg cursor-pointer"
              onClick={() => setShowSendCFModal(true)}
            >
              Send Funds
            </a>

            <SendCampaignFundsModal
              onClose={() => setShowSendCFModal(false)}
              shown={showSendCFModal}
              character={{
                id: characterInfo._id,
                name: characterInfo.name,
                currentBalance: "0",
              }}
            />
          </li>
        </>
      ) : (
        // User is logged in (User View if current character)
        <>
          <li>
            <Link
              to={`/character/?id=${characterInfo._id}`}
              className="flex items-center justify-center text-white rounded-lg text-lg"
            >
              <span>{characterInfo.name}</span>
            </Link>
          </li>
          {/* add a divider line */}
          <hr className="border-gray-600" />
          <li>
            <a className="flex items-center justify-center text-white rounded-lg">
              <span>Dashboard</span>
            </a>
          </li>
        </>
      )}
    </>
  );
}

export default React.memo(CharacterContextActions);
