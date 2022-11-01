import React from "react";

type ModalProps = {
  modalTitle: string | JSX.Element;
  children: JSX.Element | JSX.Element[] | null | undefined;
  closable: boolean | undefined;
};

export default function Modal(props: ModalProps) {
  // Create a modal that has a title and content that can be passed in as props.children
  // It should be able to be closed with an X, clicking outside, or hitting the ESC button if closable is true
  // It should be absolutely positioned in the center of the screen with a blurred background
  return (
    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full backdrop-brightness-50">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col h-1/2 w-1/2 bg-background-body rounded-md">
          <div className="flex flex-row justify-between w-full h-12 bg-green-sea">
            <h1 className="flex flex-grow items-center justify-center text-background-body">
              {props.modalTitle}
            </h1>
            {props.closable && (
              <button className="flex items-center justify-center w-12 h-12">
                <svg
                  className="w-6 h-6 text-background-body"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="flex flex-col flex-grow w-full h-full p-3 bg-gray">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
