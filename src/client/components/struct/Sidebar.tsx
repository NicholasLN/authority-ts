import React from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { toggleSidebar } from "../../redux/reducers/uiSlice";

type SidebarProps = {};

export default function Sidebar(props: SidebarProps) {
  const uiState = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();
  return (
    <>
      {/* Make a sidebar with w-24 that reduces to w-12
        when uiState.sidebar is false. Toggling the button should trigger an animation to expand it again to w-24 */}
      <div
        className={`flex flex-col h-full bg-wet-asphalt transition-all duration-100 ${
          uiState.hideSidebar ? "w-8" : "w-20"
        }`}
      >
        <button
          className="flex flex-grow justify-center w-full px-3 text-2xl text-background-body"
          onClick={() => dispatch(toggleSidebar())}
        >
          {uiState.hideSidebar ? ">" : "<"}
        </button>
        {/* Sidebar Content */}
        {!uiState.hideSidebar && (
          <div className="flex flex-col h-full bg-wet-asphalt">
            <h1 className="flex flex-grow justify-center w-full h-12 text-lg text-background-body">
              Sidebar
            </h1>
          </div>
        )}
      </div>
    </>
  );
}
