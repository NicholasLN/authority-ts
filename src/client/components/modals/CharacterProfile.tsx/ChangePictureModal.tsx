import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  quickErrorAlert,
  quickSuccessAlert,
} from "../../../redux/reducers/alertSlice";
import { updateCharacters } from "../../../redux/reducers/characterSlice";
import postPicture from "../../../utils/postPicture";
import Modal from "../../struct/Modal";

type Props = {
  shown: boolean;
  onClose: () => void;
};

export default function ChangePictureModal(props: Props) {
  const userState = useSelector((state: RootState) => state.auth);
  const characterState = useSelector((state: RootState) => state.character);
  const dispatch = useDispatch();
  const [selectedPicture, setSelectedPicture] = React.useState<File>(
    null as unknown as File
  );

  const onImageChange = function (e: any) {
    const target = e.target as HTMLInputElement;
    if (target && target.files && target.files[0]) {
      setSelectedPicture(target.files[0]);
    }
  };

  const uploadCharacterPicture = async () => {
    if (selectedPicture) {
      var resp = await postPicture(
        "/api/character/updatePicture",
        selectedPicture,
        true,
        true
      );
      // TODO: Better error handling than this garbage. Fuckin' hell. I'm so tired.
      if (resp.characters) {
        dispatch(
          quickSuccessAlert(
            "Picture updated! Do a hard refresh to see the changes."
          )
        );
        dispatch(updateCharacters(resp.characters));
        props.onClose();
      } else {
        dispatch(quickErrorAlert("Failed to upload picture."));
      }
    }
  };

  return (
    <Modal
      modalTitle="Change Character Picture"
      closable={true}
      shown={props.shown}
      onClose={props.onClose}
    >
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-extrabold">Change Picture</h1>
        <p className="text-lg">
          You can change your profile picture here. You can upload a picture
          from your computer,
        </p>
        <p className="text-xs italic text-gray-400">
          Image must be less than 2MB, and must be a PNG, JPG / JPEG, GIF
        </p>
        <div className="flex flex-row items-center">
          <form encType="multipart/form-data" className="flex flex-col">
            {/* Create a form. Make sure the image upload button itself is hidden, because we can't style it
                Just create a label with the same ID as the input, and style that instead. When a user uploads a file, the label will change to the file name 
            */}
            <label
              htmlFor="file-upload"
              className="bg-gray-800 text-white py-2 px-4 rounded inline-flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <div className="flex flex-col">
                <span>Choose a file</span>
                {selectedPicture && (
                  // Put it on the next line if there's a file selected
                  <span className="ml-2 text-xs">{selectedPicture.name}</span>
                )}
              </div>
            </label>
            <div className="m-2">
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={onImageChange}
              />
              {selectedPicture && (
                <button
                  type="button"
                  className="bg-gray-800 text-white py-2 px-4 rounded inline-flex items-center"
                  onClick={uploadCharacterPicture}
                >
                  <span>Upload</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
