import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CharacterContextActions from "./characterContextOptions";

export default function contextActions() {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});

  var currentContext = useSelector((state: RootState) => state.contextMenu);

  useEffect(() => {}, [currentContext]);

  switch (currentContext.contextType) {
    case "Character":
      // TODO: Turn this into a component. Populate context options / modals there.
      return <CharacterContextActions contextId={currentContext.contextId} />;
    default:
      return <div></div>;
  }
}
