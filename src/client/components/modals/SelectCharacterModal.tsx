import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchCharacter } from "../../redux/reducers/characterSlice";
import Modal from "../struct/Modal";

const defaultPic = String(
  require("../../assets/img/placeholderpic.png").default
);

type SelectCharacterModalProps = {
  onClose: () => void;
  shown: boolean;
  chars: Character[];
};

export default function SelectCharacterModal(props: SelectCharacterModalProps) {
  const charState = useSelector((state: RootState) => state.character);
  const dispatch = useDispatch();

  const switchCharButton = function (char: Character) {
    dispatch(switchCharacter(char));
  };

  useEffect(() => {}, [charState]);

  return (
    <Modal
      modalTitle="Select Character"
      shown={props.shown}
      onClose={props.onClose}
      closable={true}
    >
      {props.chars.map((char) => (
        //   For each character, create a flexbox with a picture, name, and a button to switch to that character. If it's
        //   the currently selected character, display a checkmark instead of the button.
        <div
          onClick={() => switchCharButton(char)}
          className="flex flex-row justify-between w-full"
          key={char._id}
        >
          <div className="flex flex-row">
            <div className="flex flex-col justify-center w-12 h-12 bg-background-body rounded-full overflow-hidden">
              <img
                className="object-cover w-full h-full"
                src={defaultPic}
                alt="Profile Picture"
              />
            </div>
            <div className="flex flex-col justify-center ml-2">
              <div>{char.name}</div>
            </div>
            <div className="flex flex-col justify-center">
              {charState.currentCharacter?._id === char._id && (
                <div className="text-green-500 px-2 text-xl">✓</div>
              )}
            </div>
          </div>
        </div>
      ))}
    </Modal>
  );
}
