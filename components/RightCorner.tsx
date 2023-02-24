import { useDisclosure } from "@dwarvesf/react-hooks";
import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import { useGameContext } from "../contexts/game";
import { client } from "../libs/apis";
import { Modal } from "./Modal/Modal";

export const RightCorner = () => {
  const { gameState, currentPlayer, quitGame, mutateGameState } =
    useGameContext();
  const [isLoading, setIsLoading] = useState(false);

  const [isAudioOff, setIsAudioOff] = useState(true);
  const {
    isOpen: isOpenStartGame,
    onOpen: onOpenStartGame,
    onClose: onCloseStartGame,
  } = useDisclosure();

  const {
    isOpen: isOpenQuitGame,
    onOpen: onOpenQuitGame,
    onClose: onCloseQuitGame,
  } = useDisclosure();

  const audioRef = useRef<HTMLAudioElement>(null);

  const onStartGame = async () => {
    try {
      setIsLoading(true);
      await client.startGame(gameState?.id || "", currentPlayer!.token);
      mutateGameState();
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);

      // close modal
      onCloseStartGame();
    }
  };

  const onQuitGame = () => {
    quitGame();

    // close modal
    onCloseQuitGame();
  };

  const onAudioButtonClick = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        audioRef.current.volume = 0.3;
        setIsAudioOff(false);
      } else {
        audioRef.current.pause();
        setIsAudioOff(true);
      }
    }
  };

  return (
    <div className="absolute top-2 right-2 md:top-4 md:right-4 z-50 flex flex-col items-end gap-y-2 md:gap-y-4">
      {gameState && (
        <>
          <div className="flex gap-2">
            {gameState.status === "new" &&
            gameState.players[0].id === currentPlayer?.id ? (
              <button
                type="button"
                className="button primary"
                onClick={onOpenStartGame}
                disabled={isLoading}
              >
                Start
              </button>
            ) : null}
            <button
              type="button"
              className="button secondary"
              onClick={onOpenQuitGame}
            >
              Quit
            </button>
          </div>
          <button
            type="button"
            className="text-xl text-white"
            onClick={onAudioButtonClick}
          >
            {isAudioOff ? (
              <Icon icon="akar-icons:sound-off" width={24} height={24} />
            ) : (
              <Icon icon="akar-icons:sound-on" width={24} height={24} />
            )}
          </button>
          <audio
            src="/assets/sounds/track02.mp3"
            ref={audioRef}
            loop
            autoPlay={false}
          />

          {/* Start game modal */}
          <Modal
            isOpen={isOpenStartGame}
            title="Confirmation"
            body={<div>Are you sure you want to start the game now?</div>}
            onSubmit={onStartGame}
            onCancel={onCloseStartGame}
            submitText={isLoading ? "Loading..." : "Yes"}
            cancelText="No"
          />

          {/* Quit game modal */}
          <Modal
            isOpen={isOpenQuitGame}
            title="Confirmation"
            body={<div>Are you sure you want to quit the game?</div>}
            onSubmit={onQuitGame}
            onCancel={onCloseQuitGame}
            submitText={"Yes"}
            cancelText="No"
          />
        </>
      )}
    </div>
  );
};
