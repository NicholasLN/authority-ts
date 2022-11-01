import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { changeElement } from "../../redux/reducers/currentElement";

type Props = {
  selectableType: "Character" | "Party" | "Region" | "Other";
  contentId?: string;
  characterId?: string;
  customCss?: string;
  children: JSX.Element | JSX.Element[];
};

export default function selectable(props: Props) {
  var dispatch = useDispatch();
  const [focused, setFocused] = useState(false)
  function clickedAlert(ref: any) {
    useEffect(() => {
      function handleClickInside(event: { target: any }) {
        setFocused(false)
        if (ref.current && ref.current.contains(event.target)) {
          setFocused(true)

          dispatch(
            changeElement({
              element: ref.current.id,
              contentId: ref.current.attributes["data-contentid"].value,
              characterId: ref.current.attributes["data-characterid"].value,
            })
          );
          console.log("you clicked inside oh my god");
        }
      }
      document.addEventListener("mousedown", handleClickInside);
      return () => {
        document.removeEventListener("mousedown", handleClickInside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  clickedAlert(wrapperRef);

  return (
    <div
      ref={wrapperRef}
      id={props.selectableType}
      data-contentid={props.contentId}
      data-characterid={props.characterId}
      className={focused ? 'outline outline-indigo-500 outline-offset-1 outline-2' : ''}
    >
      {props.children}
    </div>
  );
}
