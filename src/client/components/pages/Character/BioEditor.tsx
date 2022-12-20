import React, { useState } from "react";

interface Props {
  bio: string;
  className?: string;
  onFinish: (newBio: string) => void;
}

const BioEditor: React.FC<Props> = ({ bio, className, onFinish }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBio, setNewBio] = useState(bio);

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleFinish() {
    setIsEditing(false);
    onFinish(newBio);
  }

  function handleInputBlur() {
    handleFinish();
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewBio(event.target.value);
  }

  return (
    <div
      className="bg-gray-200 p-2 hover:bg-gray-300 cursor-pointer text-base text-center"
      onClick={handleEditClick}
    >
      {isEditing ? (
        <div
          className={className ? className : ""}
          contentEditable
          onBlur={handleInputBlur}
          onInput={handleInputChange}
        >
          {newBio}
        </div>
      ) : (
        <div className={className ? className : ""}>{newBio}</div>
      )}
    </div>
  );
};

export default BioEditor;
