import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

type BodyProps = {
  // multiple children
  children: JSX.Element | JSX.Element[] | ReactElement | ReactElement[];
};

export default function Body(props: BodyProps) {
  const userState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col h-screen w-full font-signika">
      {/* Navbar */}
      <div className="flex w-full h-12 bg-green-sea">
        <Navbar />
      </div>
      {/* Body */}
      <div className="flex flex-grow w-full h-11/12">
        <Sidebar />
        {/* Content */}
        <div className="bg-slate-900 p-2 w-full">
          <div className="flex flex-col w-full h-full bg-background-body opacity-95">
            {/* Center all content from hereon */}
            <div className="flex flex-col items-center w-full h-full p-2">
              {props.children}
            </div>
          </div>
        </div>
      </div>
      {userState.loggedIn && <Footer />}
    </div>
  );
}
