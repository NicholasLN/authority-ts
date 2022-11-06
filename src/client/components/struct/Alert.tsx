import React, { useEffect } from "react";

type AlertProps = {
  key: number;
  type: string;
  message: string;
  timeout: number;
  dismissable?: boolean;
  onClose?: (id: string) => void;
};

export default function Alert(props: AlertProps) {
  //   const [progress, setProgress] = React.useState(100);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setProgress(0);
  //       // This is set to 1 so it runs exactly 1ms after rendering.
  //       // This is to prevent the progress bar from being stuck at 100%.
  //     }, 1);
  //     return () => clearInterval(interval);
  //   });
  var bgColor = () => {
    switch (props.type) {
      case "simple":
        return "bg-gray-200";
      case "success":
        return "bg-green-200";
      case "error":
        return "bg-red-200";
      case "warning":
        return "bg-yellow-200";
      case "info":
        return "bg-blue-200";
      default:
        return "bg-gray-200";
    }
  };

  var accentColor = () => {
    switch (props.type) {
      case "simple":
        return "border-l-gray-500";
      case "success":
        return "border-l-green-500";
      case "error":
        return "border-l-red-500";
      case "warning":
        return "border-l-yellow-500";
      case "info":
        return "border-l-blue-500";
      default:
        return "border-l-gray-500";
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div
        id="alert"
        className={`m-1 p-4 relative rounded-md shadow-md ${bgColor()} border-l-4 ${accentColor()}`}
      >
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <div className="flex flex-row justify-center items-center w-8 h-8 rounded-full">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2a10 10 0 100-20 10 10 0 000 20z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1zm0 6a1 1 0 100 2 1 1 0 000-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex flex-col ml-3">
              <div className="text-sm font-medium text-gray-900">
                {props.type.charAt(0).toUpperCase() + props.type.slice(1)}
              </div>
              <div className="text-sm text-gray-500">{props.message}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
