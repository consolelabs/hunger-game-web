import { useState } from "react";
import CountUp from "react-countup";
import { ReadyScreen } from "./ReadyScreen";

export const MatchMaking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const onFindMatch = () => {
    setIsLoading(true);
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
        {isLoading ? "Matching..." : "Find a Match"}
      </button>
      {isLoading && (
        <div className="w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <div className="flex gap-4 w-full justify-between px-2">
            <CountUp
              delay={0}
              duration={10}
              end={10}
              onEnd={() => {
                if (Math.random() < 0.5) {
                  setIsReady(true);
                } else {
                  alert("Cannot find a match");
                }
              }}
              formattingFn={clockFormatter}
            />

            <button
              onClick={() => setIsLoading(false)}
              className="justify-end text-white px-1 bg-red-500"
            >
              X
            </button>
          </div>
        </div>
      )}
      {isReady && <ReadyScreen />}
    </>
  );
};
