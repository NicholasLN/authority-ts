import React from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { toggleSidebar } from "../../redux/reducers/uiSlice";
import SidebarCharMenu from "./SidebarCharMenu";
import SidebarContextActions from "./SidebarContextActions";

type SidebarProps = {
  sidebarType?: "Default" | "else";
};

export default function Sidebar(props: SidebarProps) {
  const uiState = useSelector((state: RootState) => state.ui);
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  return (
    <>
      {/* Make a sidebar with w-24 that reduces to w-12
        when uiState.sidebar is false. Toggling the button should trigger an animation to expand it again to w-24 */}
      <div
        className={`flex flex-col h-full bg-wet-asphalt whitespace-nowrap ${
          uiState.hideSidebar ? "w-8" : "w-36 md:w-36 sm:w-24 xs:w-24"
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
            <h1 className="flex flex-grow justify-center w-full h-12 sm:text-sm xs:text-sm text-background-body">
              <SidebarContextActions />{" "}
              {/* we need a provider for the context info here */}
            </h1>
            {authState.loggedIn && <SidebarCharMenu />}
          </div>
        )}
      </div>
    </>
  );
}
