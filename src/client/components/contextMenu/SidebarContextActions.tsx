import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CharacterContextActions from "./characterContextActions";

export default function contextActions() {
  var currentContext = useSelector((state: RootState) => state.contextMenu);

  useEffect(() => {}, [currentContext.contextType]);

  switch (currentContext.contextType) {
    case "Character":
      return <CharacterContextActions />;
    default:
      return <div>Nothing to display.</div>;
  }
}
