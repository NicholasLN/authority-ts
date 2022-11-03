import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CharacterContextActions from "./characterContextActions";

export default function contextActions() {
  var currentContext = useSelector((state: RootState) => state.contextMenu);

  const renderSwitch = (contextType: string) => {
    switch (contextType.toLowerCase()) {
      case "character":
        return <CharacterContextActions />;
      default:
        return <div></div>;
    }
  };

  useEffect(() => {}, [currentContext.contextType]);

  return (
    <aside className="w-full">
      <div className="flex overflow-y-auto rounded w-11/12 mx-auto">
        <ul className="space-y-2 w-full">
          {renderSwitch(currentContext.contextType)}
        </ul>
      </div>
    </aside>
  );
}
