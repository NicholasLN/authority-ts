import React from "react";
import Body from "./Body";

type NotFoundProps = {
  errorType?: string;
  errorMessage?: string;
  extraMessage?: string;
};

export default function NotFound(props: NotFoundProps) {
  return (
    <Body>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <h1 className="text-4xl font-bold">
          {props.errorType ? props.errorType : "404"}
        </h1>
        <h2 className="text-2xl font-bold">
          {props.errorMessage ? props.errorMessage : "Page not found."}
        </h2>
        <h3 className="text-lg text-center">
          {props.extraMessage
            ? props.extraMessage
            : `OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!`}
        </h3>
      </div>
    </Body>
  );
}
