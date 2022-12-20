import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { changeElement } from "../../redux/reducers/contextSlice";

type Props = {
  contextType: "Character" | "Party" | "Region" | "Other";
  contextId?: string;
  children: JSX.Element | JSX.Element[];
  showHighlight?: boolean;
};

export default function selectable(props: Props) {
  var dispatch = useDispatch();
  const [focused, setFocused] = useState(false);
  const wrapperRef: any = useRef(null);
  useEffect(() => {
    function handleClickInside(event: { target: any }) {
      setFocused(false);
      if (wrapperRef.current && wrapperRef.current.contains(event.target)) {
        setFocused(true);

        dispatch(
          changeElement({
            contextType: wrapperRef.current.id,
            contextId: wrapperRef.current.attributes["data-contextid"].value,
          })
        );
        //console.log("clicked inside");
      }
    }
    document.addEventListener("mousedown", handleClickInside);
    return () => {
      document.removeEventListener("mousedown", handleClickInside);
    };
  }, [wrapperRef]);

  return (
    <div
      ref={wrapperRef}
      id={props.contextType}
      data-contextid={props.contextId}
      className={
        props.showHighlight
          ? focused
            ? "bg-blue-500 rounded-md cursor-default select-none p-0.5"
            : "hover:bg-blue-300 rounded-md cursor-help select-none p-0.5"
          : ""
      }
    >
      {props.children}
    </div>
  );
}
