import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { changeElement } from "../../redux/reducers/contextSlice";

type Props = {
  contextType: "Character" | "Party" | "Region" | "Other";
  contextId?: string;
  children: JSX.Element | JSX.Element[];
};

export default function selectable(props: Props) {
  var dispatch = useDispatch();
  const [focused, setFocused] = useState(false);
  function clickedAlert(ref: any) {
    useEffect(() => {
      function handleClickInside(event: { target: any }) {
        setFocused(false);
        if (ref.current && ref.current.contains(event.target)) {
          setFocused(true);

          dispatch(
            changeElement({
              contextType: ref.current.id,
              contextId: ref.current.attributes["data-contextid"].value,
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
      id={props.contextType}
      data-contextid={props.contextId}
      className={
        focused
          ? "bg-blue-500 rounded-md cursor-default select-none p-0.5"
          : "hover:bg-blue-300 rounded-md cursor-help select-none p-0.5"
      }
    >
      {props.children}
    </div>
  );
}
