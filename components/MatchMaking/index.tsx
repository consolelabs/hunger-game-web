import { useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { ReadyScreen } from "./ReadyScreen";

export const MatchMaking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const onFindMatch = () => {
    setIsLoading(true);
  };
  const timeout = Date.now() + 30000;

  const renderCountDown = ({
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      // Render a completed state
      return <ReadyScreen />;
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <>
      <button type="submit" className="primary w-full" onClick={onFindMatch}>
        {isLoading ? "Matching..." : "Find a Match"}
      </button>
      {isLoading && (
        <div className="w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <div className="flex gap-4 w-full justify-between px-2">
            <Countdown
              date={timeout}
              zeroPadTime={2}
              renderer={renderCountDown}
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
    </>
  );
};

// Match Found
