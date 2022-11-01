import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router";
import { updateCharacters } from "../../../redux/reducers/characterSlice";
import postPage from "../../../utils/postPage";
import Body from "../../struct/Body";

export default function createCharacter() {
    const userState = useSelector((state: RootState) => state.auth);
    const charState = useSelector((state: RootState) => state.character);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("")
    
    const characterSubmit = async () => {
        console.log(name)
        const res = await postPage('/api/character/create', {
            name
        }, true)

        if (res.status == 200) {
            dispatch(updateCharacters(res.data.character));
            navigate('/')
        }
    }
  
    useEffect(() => {
      if (!userState.loggedIn) {
        navigate("/");
      }
    }, [userState.loggedIn]);

    return(
        <Body>
            <p className="text-3xl">Create a character</p>
            <p className="text-xl font-semibold">Do note, at this time you'll be able to make 1 character at a time.</p>

            <p>
                Character name
            </p>
            <br />
            <input
            type='text'
            id='name'
            onChange={(e) => setName(e.target.value)}
            />
            <br />
            <button className='text-white bg-blue-500 rounded-md p-2 px-3' onClick={characterSubmit}>Create Character</button>
        </Body>
    )
}