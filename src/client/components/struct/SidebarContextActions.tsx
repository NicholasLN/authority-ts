import React, { useEffect, useState } from "react";
import getPage from "../../utils/getPage";
import postPage from "../../utils/postPage";
import SendCampaignFundsModal from "../modals/SendCampFundsModal";
import SendCampaignFunds from "../modals/SendCampFundsModal";

type Props = {
  type?: string;
  additionalInfo?: any;
};

export default function contextActions(props: Props) {
  const [character, setCharacter] = useState<any>({})
  const [showModal, setShowModal] = useState(false)
  let isLoading = false

  useEffect(() => {
    getCharacter()
  }, [character])
  

  async function getCharacter() {
    isLoading = true
    const character = await getPage(`/api/character/read/${props.additionalInfo.characterId}`)
    setCharacter(character.data)
    isLoading = false
    return character.data
  }

  if (isLoading) {
    return (
    <ul>
      <li>Loading actions...</li>
    </ul>)
  }

  if (props.type === "Default" || props.type === undefined) {
    return (
      <ul>
        <li>No actions here.</li>
      </ul>
    );
  }

  if (props.type === 'Character') {
    return (
      <ul>
        <li><b>{character.name}</b></li>
        <br />
        <li>
          <button className="text-blue-400" onClick={() => setShowModal(true)}>
          Send Funds
          </button>

          <SendCampaignFundsModal 
          onClose={() => setShowModal(false)} 
          shown={showModal} 
          character={{
            id: character._id,
            name: character.name,
            currentBalance: "0"
          }}/>
        </li>
      </ul>
    )
  }

  return <></>;
}
