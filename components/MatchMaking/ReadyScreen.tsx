import { useState } from "react";
import { Icon } from "@iconify/react";
import Countdown, { CountdownRenderProps } from "react-countdown";

export const ReadyScreen = () => {
  const [isReady, setIsReady] = useState(false);

  const renderCountDown = ({
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      // Render a completed state
      return (
        <span className="text-center text-4xl">
          {isReady
            ? "going to game screen"
            : "back to homescreen because of not ready"}
        </span>
      );
    } else {
      // Render a countdown
      return (
        <span className="text-center text-4xl">
          {minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-50">
      <div className="max-w-full w-[450px] min-h-[50vh] max-h-[80vh] rounded-md bg-background-secondary overflow-auto p-4 md:p-6 m-auto flex flex-col justify-center gap-y-16">
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <div className="flex flex-col items-center">
            <Icon
              icon="arcticons:cat-avatar-generator"
              width={96}
              height={96}
              className={`${isReady ? "text-green-500" : ""}`}
            />
            You
          </div>
          <div className="flex flex-col items-center">
            <Icon icon="radix-icons:avatar" width={96} height={96} />
            User 1
          </div>
          <div className="flex flex-col items-center">
            <Icon icon="radix-icons:avatar" width={96} height={96} />
            User 2
          </div>
          <div className="flex flex-col items-center">
            <Icon
              icon="radix-icons:avatar"
              width={96}
              height={96}
              className={`${"text-green-500"}`}
            />
            User 3
          </div>
        </div>
        <button
          onClick={() => setIsReady(true)}
          className="h-10 text-sm text-white px-1 py-1 bg-blue-500 rounded-md"
        >
          {isReady ? "Waiting for other players..." : "Ready"}
        </button>
        <Countdown
          date={Date.now() + 10000}
          zeroPadTime={2}
          renderer={renderCountDown}
        />
      </div>
    </div>
  );
};
