import { useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useGameContext } from "../../contexts/game";
import { client } from "../../libs/apis";
import { JoinGame } from "./JoinGame";
import { MatchMaking } from "../MatchMaking";
import Link from "next/link";
import { Transition } from "@headlessui/react";

export const StartScreen = () => {
  const { gameState, setGameId, setPlayerToken } = useGameContext();

  const playerNameInputRef = useRef<HTMLInputElement>(null);
  const [action, setAction] = useState<"new" | "join">("new");
  const [isLoading, setIsLoading] = useState(false);

  const onNewGame = useCallback(async () => {
    const playerName = playerNameInputRef.current?.value || "";

    try {
      setIsLoading(true);

      // Create a new game
      const newGameResponse = await client.createNewGame();
      const gameId = newGameResponse.data.id;

      // Join the game
      const joinGameResponse = await client.joinGame(gameId, playerName);
      const playerToken = joinGameResponse.data.token;

      setGameId(gameId);
      setPlayerToken(playerToken);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }, [setGameId, setPlayerToken]);

  const render = useMemo(() => {
    if (gameState) {
      return null;
    }

    switch (action) {
      case "join": {
        return <JoinGame onCancel={() => setAction("new")} />;
      }
      default: {
        return (
          <div className="flex flex-col space-y-2">
            <input
              name="playerName"
              ref={playerNameInputRef}
              placeholder="Enter your name"
              maxLength={10}
              type="text"
            />
            <button
              type="submit"
              className="button primary w-full"
              onClick={onNewGame}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "New Game"}
            </button>

            <MatchMaking />

            <div className="flex space-x-1 items-center justify-center">
              <div className="h-[1px] flex-1 bg-white/50" />
              <small className="text-white">OR</small>
              <div className="h-[1px] flex-1 bg-white/50" />
            </div>
            <button
              type="submit"
              className="button secondary w-full"
              onClick={() => setAction("join")}
              disabled={isLoading}
            >
              Join Game
            </button>
          </div>
        );
      }
    }
  }, [gameState, action, isLoading, onNewGame]);

  return (
    <>
      <Image
        src="/assets/images/background.jpeg"
        fill
        alt="Theme"
        className="object-cover"
      />
      <div className="fixed top-0 left-0 w-full h-full flex flex-col text-white text-base p-4 items-center gap-y-10 md:gap-y-20">
        <div className="scale-[0.6] fixed top-1/2 left-1/2 translate-x-[-670px] translate-y-[-10px]">
          <Image
            className="animate-hover-1"
            src="/assets/images/drone.gif"
            alt="drone character"
            width={227}
            height={202}
          />
        </div>
        <div className="scale-[1.5] fixed top-1/2 left-1/2 translate-x-[0px] translate-y-[-250px]">
          <Image
            className="animate-hover-2"
            src="/assets/images/neko.gif"
            alt="drone character"
            width={227}
            height={202}
          />
        </div>
        <div className="scale-[2] fixed top-1/2 left-1/2 translate-x-[-450px] translate-y-[-40px]">
          <Image
            className="animate-hover-3"
            src="/assets/images/rabby.gif"
            alt="drone character"
            width={227}
            height={202}
          />
        </div>
        <div className="scale-[1.8] fixed top-1/2 left-1/2 translate-x-[210px] translate-y-[20px]">
          <Image
            className="animate-hover-2"
            src="/assets/images/owl.gif"
            alt="drone character"
            width={227}
            height={202}
          />
        </div>
        <div className="m-auto">
          <Link href="/" className="flex flex-col">
            <div className="w-32 h-32 mx-auto">
              <Image src="/assets/images/logo.png" fill alt="Logo" />
            </div>
            <div className="h-16">
              <Image
                className="object-contain hover:scale-[1.02] transition-all duration-100 ease-out cursor-pointer"
                src="/heading.png"
                alt="Hunger Game"
                fill
              />
            </div>
          </Link>
          <Transition
            show
            appear
            enter="transition-opacity duration-200 ease-in-out delay-700"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            className="max-w-full w-[384px] max-h-[80vh] overflow-auto p-4 md:p-8 flex flex-col gap-y-4 md:gap-y-8 card card-br bg-black/50 backdrop-blur-sm"
          >
            {render}
          </Transition>
        </div>
      </div>
      {/* <FoundMatch /> */}
    </>
  );
};
