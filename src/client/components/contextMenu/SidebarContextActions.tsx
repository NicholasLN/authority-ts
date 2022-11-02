import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CharacterContextActions from "./characterContextActions";

export default function contextActions() {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});

  var currentContext = useSelector((state: RootState) => state.contextMenu);

  useEffect(() => {}, [currentContext.contextType]);

  switch (currentContext.contextType) {
    case "Character":
      return <CharacterContextActions />;
    default:
      return <div>No Ongoing Context</div>;
  }
}
