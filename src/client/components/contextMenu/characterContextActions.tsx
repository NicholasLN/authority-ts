import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { invalidateElement } from "../../redux/reducers/contextSlice";
import getPage from "../../utils/getPage";
import SendCampaignFundsModal from "../modals/SendCampFundsModal";

export default function CharacterContextActions() {
  const currentContext = useSelector((state: RootState) => state.contextMenu);
  const characterState = useSelector((state: RootState) => state.character);
  const authState = useSelector((state: RootState) => state.auth);

  const [showSendCFModal, setShowSendCFModal] = useState(false);
  const [characterInfo, setCharacterInfo] = React.useState<Character>(
    {} as Character
  );
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect CharacterContextActions");
    async function fetchCharacter() {
      const resp = await getPage(
        `/api/character/read/${currentContext.contextId}`
      ).catch((err) => {
        dispatch(invalidateElement());
      });
      if (resp) {
        var char: Character = resp.data;
        setCharacterInfo(char);
        setLoading(false);
      }
    }
    fetchCharacter();
    setLoading(false);
  }, [
    currentContext.contextId,
    authState.loggedIn,
    characterState.currentCharacter,
  ]);

  // TODO: Get character info from the database using contextId and populate the context options, (send money, mail, etc.)
  if (loading) {
    return <div>Loading...</div>;
  }
  // TODO: Tay, you can use this to make the context menu for characters. At this point you have the character info in the characterInfo variable.
  return (
    <>
      {/* No user is logged in (Guest View) */}
      {!authState.loggedIn ? (
        <div>Open Profile</div>
      ) : // User is logged in (User View if not current character)
      characterInfo._id !== characterState.currentCharacter._id &&
        characterState.currentCharacter ? (
        <ul>
          <li>
            <b>{characterInfo.name}</b>
          </li>
          <br />
          <li>
            <button
              className="text-blue-400 font-bold"
              onClick={() => setShowSendCFModal(true)}
            >
              Send Funds
            </button>

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
        </ul>
      ) : (
        // User is logged in (User View if current character)
        <div>Open Profile</div>
      )}
    </>
  );
}
