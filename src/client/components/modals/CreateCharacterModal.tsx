import React from "react";
import Modal from "../struct/Modal";

type CreateCharacterModalProps = {
  onClose: () => void;
  shown: boolean;
};

export default function CreateCharacterModal(props: CreateCharacterModalProps) {
  const [form, setForm] = React.useState({});
  const [skills, setSkills] = React.useState({
    rhetoric: 10,
    intelligence: 10,
    charisma: 10,
    dealMaking: 10,
    leadership: 10,
  });
  return (
    <Modal
      modalTitle="Create Character"
      shown={props.shown}
      onClose={props.onClose}
      closable={true}
    >
      {/* Form for creating a character. 
        form options:
        - name
        - gender (man, woman, trans, nonbinary, other)
        - skill points (allocate 20 points to skills, [Rhetoric, Intelligence, Charisma, Deal Making, Leadership])
        - location
        - picture
    
        Use TailwindCSS for pretty styling. */}
      <form className="w-full max-w-lg m-auto">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Name
            </label>
            <input
              className="appearance-none block 
              w-full bg-gray-800 text-white border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-gray-800"
              id="name"
              type="text"
              placeholder="Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <p className="text-gray-600 text-xs italic">
              Name of your character.
            </p>
          </div>
          {/* Flex row with two columns of equal width */}
          <div className="flex flex-row w-full">
            <div className="w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Gender
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-800 border border-gray-800 text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-800 focus:border-gray-500"
                  id="grid-state"
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                >
                  {["man", "woman", "trans", "nonbinary", "other"].map(
                    (option) => {
                      return (
                        <option value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
            </div>
            <div className="w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Location
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-800 border border-gray-800 text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-800 focus:border-gray-500"
                  id="grid-state"
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                >
                  {["fictionland"].map((option) => {
                    return (
                      <option value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          {/* Flex row with 5 columns of equal width. This will be used for allocating 20 points. */}
          <div className="flex flex-row w-full mt-2">
            {Object.keys(skills).map((skill) => {
              return (
                <div className="w-1/5 px-3" key={skill}>
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {skill.charAt(0).toUpperCase() + skill.slice(1)}
                  </label>
                  <div className="relative">
                    {/* Use a number input */}
                    <input
                      className="appearance-none block
                        w-full bg-gray-800 text-white border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-gray-800"
                      type="number"
                      min="0"
                      max="20"
                      value={skills[skill as keyof typeof skills]}
                      onChange={(e) => {
                        const newSkills = { ...skills };
                        newSkills[skill as keyof typeof skills] = parseInt(
                          e.target.value
                        );
                        setSkills(newSkills);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-row w-full">
            {Object.values(skills).reduce((a, b) => a + b, 0) > 50 ? (
              <p className="text-red-500 text-xs italic mx-auto">
                You have allocated too many points! You have{" "}
                {Object.values(skills).reduce((a, b) => a + b, 0)} and you can
                only have 50.
              </p>
            ) : Object.values(skills).reduce((a, b) => a + b, 0) < 50 ? (
              <p className="text-red-500 text-xs italic mx-auto">
                You have not allocated enough points! You have{" "}
                {Object.values(skills).reduce((a, b) => a + b, 0)} and you need
                50.
              </p>
            ) : (
              <p className="text-green-500 text-xs italic mx-auto">
                You have allocated the correct amount of points!
              </p>
            )}
          </div>
          {/* Button for creating character. If they have less than or more than 50 characters, make the button appear as greyed out and unclickable
           */}
          <div className="mx-auto">
            <button
              disabled={Object.values(skills).reduce((a, b) => a + b, 0) !== 50}
              className={
                Object.values(skills).reduce((a, b) => a + b, 0) === 50
                  ? "bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  : "bg-gray-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              }
              type="button"
            >
              Create Character
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
