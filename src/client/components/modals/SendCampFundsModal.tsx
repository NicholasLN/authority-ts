import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Character from "../../../server/mongo/models/Character";
import { switchCharacter } from "../../redux/reducers/characterSlice";
import Modal from "../struct/Modal";

const defaultPic = String(
  require("../../assets/img/placeholderpic.png").default
);

type SendCampaignFundsModalProps = {
  onClose: () => void;
  shown: boolean;
  character: {
    id: string;
    name: string;
    currentBalance: string;
  }
};

export default function SendCampaignFundsModal(props: SendCampaignFundsModalProps) {
  const charState = useSelector((state: RootState) => state.character);
  const [amountToSend, setAmountToSend] = useState('')
  const dispatch = useDispatch();

  useEffect(() => {}, [charState]);

  return (
    <Modal
      modalTitle={`Send ${props.character.name} campaign funds`}
      shown={props.shown}
      onClose={props.onClose}
      closable={true}
    >
      <div className="flex flex-row justify-center w-full">
        Their balance: {props.character.currentBalance}
      </div>
      <br />
      <div className="flex flex-row justify-center w-full">
        <div className="flex flex-col col-2">
          <p>Amount to send</p>
          <input type='text' id='amount' onChange={(e) => setAmountToSend(e.target.value)} />
        </div>
      </div>
      <br />
      <div className="flex flex-row justify-center w-full">
        <button className="text-white bg-green-500 rounded-md p-2 px-3 mt-2">
          Send Funds
        </button>
      </div>
    </Modal>
  );
}
