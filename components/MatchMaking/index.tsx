import { useState } from "react";
import CountUp from "react-countup";
import { useDisclosure } from "@dwarvesf/react-hooks";
import { Modal } from "../Modal/Modal";
import { ReadyScreen } from "./ReadyScreen";

export const MatchMaking = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isReady, setIsReady] = useState(false);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const onFindMatch = () => {
    onOpen();
    // implement logic later
  };

  const onCancelFindMatch = () => {
    onClose();
    setIsTimeOut(false);
    // implement logic later
  };

  const clockFormatter = (value: number) => {
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = value % 60;

    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <>
      <button type="submit" className="primary w-full" onClick={onFindMatch}>
        {isOpen ? "Matching..." : "Find a Match"}
      </button>

      <Modal
        isOpen={isOpen}
        title={"Matching..."}
        body={
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="flex gap-4 w-full justify-between px-2">
              {isTimeOut ? (
                <span className="text-red-500">
                  Sorry, we cannot find your opponent
                </span>
              ) : (
                <span>Looking for your opponent...</span>
              )}
              <CountUp
                delay={0}
                duration={10}
                end={10}
                onEnd={() => {
                  if (Math.random() < 0.5) {
                    onClose();
                    setIsReady(true);
                  } else {
                    setIsTimeOut(true);
                  }
                }}
                formattingFn={clockFormatter}
              />
            </div>
          </div>
        }
        cancelText="Cancel"
        onCancel={() => {
          onCancelFindMatch();
        }}
      />
      {isReady && <ReadyScreen />}
    </>
  );
};
