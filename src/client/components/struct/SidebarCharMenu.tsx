import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { switchCharacter } from "../../redux/reducers/characterSlice";
import CreateCharacterModal from "../modals/CreateCharacterModal";
import SelectCharacterModal from "../modals/SelectCharacterModal";
import Modal from "./Modal";

const defaultPic = String(
  require("../../assets/img/placeholderpic.png").default
);

export default function SidebarCharMenu() {
  const charState = useSelector((state: RootState) => state.character);

  const [showSelectModal, setShowSelectModal] = React.useState(false);
  const [showCreateModal, setShowCreateModal] = React.useState(false);

  const dispatch = useDispatch();

  const switchCharButton = function (char: Character) {
    dispatch(switchCharacter(char));
  };

  useEffect(() => {}, [charState]);

  return (
    <div className="flex flex-col justify-end w-full">
      <div className="flex flex-col justify-end w-full bg-wet-asphalt">
        <h1 className="flex flex-grow justify-center">
          {/* Create a circular div that cuts off a rectangular picture, using as little code as possible */}
          <div className="flex flex-col justify-center w-12 h-12 bg-background-body rounded-full overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={defaultPic}
              alt="Profile Picture"
            />
          </div>
        </h1>
        <div className="text-center text-background-body text-sm">
          {
            // If the user has no characters, display "No Characters" and a button to create a character
            // Otherwise, display the name of the currently selected character, as well as a button to switch characters
            charState.characters.length === 0 ? (
              <div>
                <div>No Characters</div>
              </div>
            ) : (
              <div>
                <SelectCharacterModal
                  shown={showSelectModal}
                  onClose={() => setShowSelectModal(false)}
                  chars={charState.characters}
                />
                {charState.currentCharacter ? (
                  <div className="whitespace-pre-wrap">
                    {charState.currentCharacter.name}
                  </div>
                ) : (
                  <div>No Character</div>
                )}
                <button
                  onClick={
                    // When the button is clicked, show the select character modal
                    () => setShowSelectModal(true)
                  }
                >
                  Switch Character
                </button>
              </div>
            )
          }
          {charState.characters.length <
            parseInt(process.env.MAX_CHARACTERS_PER_PERSON!) && (
            <div>
              <CreateCharacterModal
                shown={showCreateModal}
                onClose={() => setShowCreateModal(false)}
              />
              <button
                onClick={
                  // When the button is clicked, show the create character modal
                  () => setShowCreateModal(true)
                }
              >
                Create Character
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
