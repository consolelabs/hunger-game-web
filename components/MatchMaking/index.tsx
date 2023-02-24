import { useState } from "react";
import CountUp from "react-countup";
import { useDisclosure } from "@dwarvesf/react-hooks";
import { Modal } from "../Modal/Modal";
import { ReadyScreen } from "./ReadyScreen";
import { Dialog } from "@headlessui/react";

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
      <button
        type="submit"
        className="button secondary w-full"
        onClick={onFindMatch}
      >
        {isOpen ? "Matching..." : "Find a Match"}
      </button>

      <Dialog open={isOpen} onClose={onCancelFindMatch}>
        <div className="fixed top-0 left-0 w-full h-full flex">
          <div
            className="absolute top-0 left-0 w-full h-full bg-black/50"
            onClick={onCancelFindMatch}
          />
          <div className="flex flex-col items-center justify-center m-auto bg-black text-white card card-tlbr px-6 py-8">
            <div className="flex gap-4 w-full justify-between px-2">
              {isTimeOut ? (
                <span className="text-red-500">
                  Sorry, we cannot find your opponent
                </span>
              ) : (
                <span>Looking for your opponent...</span>
              )}
            </div>
            <div className="text-2xl">
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
            <button
              type="button"
              onClick={onCancelFindMatch}
              className="button primary mt-8"
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
      {isReady && <ReadyScreen />}
    </>
  );
};
