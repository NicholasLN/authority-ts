import React, { useEffect, useRef } from "react";
import { changeElement } from "../../redux/reducers/currentElement";

type Props = {
  selectableType: "Player" | "Party" | "Region" | "Other";
  customCss?: string;
  children: JSX.Element[];
};

function clickedAlert(ref: any) {
  useEffect(() => {
    function handleClickInside(event: { target: any }) {
      if (ref.current && ref.current.contains(event.target)) {
        changeElement(ref.current.id);
      }
    }
    document.addEventListener("mousedown", handleClickInside);
    return () => {
      document.removeEventListener("mousedown", handleClickInside);
    };
  }, [ref]);
}

export default function selectable(props: Props) {
  const wrapperRef = useRef(null);
  clickedAlert(wrapperRef);

  return (
    <div ref={wrapperRef} id={props.selectableType}>
      {props.children}
    </div>
  );
}
