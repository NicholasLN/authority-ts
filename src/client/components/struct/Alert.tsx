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

  return (
    <div className="flex flex-col">
      <div className="bg-white shadow-md px-8 pt-6 pb-8 mb-0 flex flex-col">
        <div className="">
          <div className="text-gray-700 text-sm font-bold">{props.message}</div>
        </div>
      </div>
      {/* <div className="w-full h-1 bg-white">
        <div
          className="h-full bg-green-500 rounded"
          style={{
            width: `${progress}%`,
            transition: `width ${props.timeout}ms linear`,
          }}
        ></div>
      </div> */}
    </div>
  );
}
