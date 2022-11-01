import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { changeElement } from "../../redux/reducers/currentElement";

type Props = {
  selectableType: "Player" | "Party" | "Region" | "Other";
  contentId?: string;
  customCss?: string;
  children: JSX.Element | JSX.Element[];
};

export default function selectable(props: Props) {
  var dispatch = useDispatch();
  function clickedAlert(ref: any) {
    useEffect(() => {
      function handleClickInside(event: { target: any }) {
        if (ref.current && ref.current.contains(event.target)) {
          dispatch(
            changeElement({
              element: ref.current.id,
              contentId: ref.current["data-contentid"],
            })
          );
          console.log("You clicked inside!");
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
    >
      {props.children}
    </div>
  );
}
