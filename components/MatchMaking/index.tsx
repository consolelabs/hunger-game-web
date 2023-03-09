import { useState } from "react";
import CountUp from "react-countup";
import { useDisclosure } from "@dwarvesf/react-hooks";
import { ReadyScreen } from "./ReadyScreen";
import { Dialog } from "@headlessui/react";
import { BASE_SITE, client } from "../../libs/apis";
import { useGameContext } from "../../contexts/game";
import { CustomSocket } from "../../libs/socket";

export const MatchMaking = () => {
  const { gameState, setGameId, setPlayerToken } = useGameContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isReady, setIsReady] = useState(false);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const onFindMatch = async () => {
    // onOpen();
    // implement logic later
    // Create a new game
    try {
      const { token } = await client.findAMatch({ name: "test" });
      setPlayerToken(token);

      let socket = new CustomSocket(`ws://${BASE_SITE}/ws`, {
        params: { match_token: token },
      });

      socket.connect();

      let channel = socket.channel("match:lobby", {});

      channel
        .join()
        .receive("ok", (resp) => {
          console.log("Joined successfully", resp);
          channel.leave();
        })
        .receive("error", (err) => {
          console.log("Unable to join", err);
        });

      channel.on("init_match", (msg) => {
        console.log(msg);
      });
    } catch (error) {
      alert(error);
    }
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
