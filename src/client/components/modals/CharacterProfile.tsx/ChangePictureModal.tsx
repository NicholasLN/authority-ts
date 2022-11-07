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
      if (resp) {
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
          <form encType="multipart/form-data">
            <input
              type="file"
              name="file"
              id="file"
              className="inputfile"
              onChange={onImageChange}
            />
            <label htmlFor="file">Choose a file</label>

            <button
              className="bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={uploadCharacterPicture}
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
