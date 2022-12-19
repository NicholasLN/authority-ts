import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  newCharacter,
  switchCharacter,
  updateCharacters,
} from "../../redux/reducers/characterSlice";
import getPage from "../../utils/getPage";
import postPage from "../../utils/postPage";
import Modal from "../struct/Modal";

type CreateCharacterModalProps = {
  onClose: () => void;
  shown: boolean;
};

export default function CreateCharacterModal(props: CreateCharacterModalProps) {
  const [countries, setCountries] = React.useState([] as any);
  // TODO: define a type for this shit so that Region and Country are not any
  const [selectedCountry, setSelectedCountry] = React.useState({} as any);

  const [form, setForm] = React.useState<Character>({
    name: "",
    gender: "Man",
    region: {
      name: "",
      _id: "",
    },
  } as Character);
  const [skills, setSkills] = React.useState<PersonalityStats>({
    rhetoric: 0,
    intelligence: 0,
    charisma: 0,
    dealmaking: 0,
    leadership: 0,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    async function getCountries() {
      var resp = await getPage("/api/country/getAll", false, false);
      setCountries(resp.data);
      setSelectedCountry(resp.data[0]);
      setForm({
        ...form,
        region: {
          name: resp.data[0].regions[0].name,
          _id: resp.data[0].regions[0]._id,
        },
      });
    }
    if (props.shown) {
      getCountries();
    }
  }, [props.shown]);

  const switchCountry = (e: any) => {
    // Find country
    var country = countries.find((c: any) => c._id === e.target.value);
    console.log(country);
    setSelectedCountry(country);
    setForm({
      ...form,
      region: {
        name: country.regions[0].name,
        _id: country.regions[0]._id,
      },
    });
  };
  const switchRegion = (e: any) => {
    setForm({ ...form, region: e.target.value });
  };

  const createCharacter = async () => {
    var formObj = {
      name: form.name,
      gender: form.gender,
      region: form.region._id,
      personalityStats: skills,
    };
    var resp = await postPage("/api/character/create", formObj, true).catch(
      (err) => {
        console.log(err);
      }
    );
    if (resp) {
      dispatch(
        newCharacter({
          newCharacter: resp.data.character,
          characters: resp.data.characters,
        })
      );
      props.onClose();
    }
  };

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
        - region
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
            <div className="w-1/3 px-3">
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
                    (option, idx) => {
                      return (
                        <option value={option} key={idx}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
            </div>
            <div className="w-1/3 px-3">
              {/* Country Selection. Selecting a country should change the shown regions */}
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Country
              </label>
              <div className="relative">
                {/* No default value please. */}
                <select
                  className="block appearance-none w-full bg-gray-800 border border-gray-800 text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-800 focus:border-gray-500"
                  id="grid-state"
                  defaultValue=""
                  onChange={switchCountry}
                >
                  {countries.map((country: any, idx: number) => {
                    return (
                      <option value={country._id} key={idx}>
                        {country.name}
                      </option>
                    );
                  })}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  ></svg>
                </div>
              </div>
            </div>
            <div className="w-1/3 px-3">
              {selectedCountry?.regions && (
                <>
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Region
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-800 border border-gray-800 text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-800 focus:border-gray-500"
                      id="grid-state"
                      onChange={switchRegion}
                    >
                      {selectedCountry.regions.map(
                        (region: any, idx: number) => {
                          return (
                            <option value={region._id} key={idx}>
                              {region.name}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Flex row with 5 columns of equal width. This will be used for allocating 20 points. */}
          <div className="flex flex-row w-full mt-2">
            {Object.keys(skills).map((skill, idx) => {
              return (
                <div className="w-1/5 px-3" key={idx}>
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
              disabled={
                Object.values(skills).reduce((a, b) => a + b, 0) !== 50 &&
                form.name !== ""
              }
              className={
                Object.values(skills).reduce((a, b) => a + b, 0) === 50 &&
                form.name !== ""
                  ? "bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                  : "bg-gray-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-not-allowed"
              }
              type="button"
              onClick={() => {
                Object.values(skills).reduce((a, b) => a + b, 0) === 50 &&
                  form.name !== "" &&
                  createCharacter();
              }}
            >
              Create Character
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
