import { useState } from "react";
import { Icon } from "@iconify/react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { Modal } from "../Modal/Modal";

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
          {isReady ? "Game screen" : "Home screen"}
        </span>
      );
    } else {
      // Render a countdown
      return (
        <span className="text-center text-4xl">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </span>
      );
    }
  };

  return (
    <Modal
      isOpen={true}
      title="Match Found!"
      body={
        <>
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

          <div className="flex justify-center mt-2 md:mt-4">
            <Countdown
              date={Date.now() + 10000}
              zeroPadTime={2}
              renderer={renderCountDown}
            />
          </div>
        </>
      }
      submitText={isReady ? "Waiting for other players..." : "Ready"}
      onSubmit={() => {
        setIsReady(true);
      }}
    />
  );
};
