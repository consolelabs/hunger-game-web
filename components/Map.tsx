import Lottie from "lottie-react";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import explosionAnimation from "../assets/lottie/explosion.json";
import { GOALS } from "../constants/goal";
import { MOVE_OFFSET } from "../constants/move";
import { PLAYERS } from "../constants/player";
import { POINTS } from "../constants/point";
import { useGameContext } from "../contexts/game";
import { GameStatus } from "../types/game";
import { dist } from "../utils/points";
import { WinScreen } from "./WinScreen";

const PLAYGROUND_SIZE = 12;

export const Map = () => {
  const { gameState, currentPlayer, nextMove } = useGameContext();
  const playerFacingDirections = useRef<Record<string, string>>({});

  const nextMoveLocation = useMemo(() => {
    if (!currentPlayer || !nextMove) {
      return undefined;
    }

    return {
      col: currentPlayer.location.col + MOVE_OFFSET[nextMove][0],
      row: currentPlayer.location.row + MOVE_OFFSET[nextMove][1],
    };
  }, [currentPlayer, nextMove]);

  const winner = useMemo(() => {
    if (gameState?.status === GameStatus.COMPLETED) {
      let winner = gameState.players[0];

      gameState.players.forEach((player) => {
        // Update winner if this player has higher points than the last ones
        if (player.points > winner.points) {
          winner = player;
        }

        // If points are equal, and we are playing with only 1 goal
        // check which one is nearer to the goal
        if (
          gameState.goal.length === 1! &&
          gameState.goal[0].player_id &&
          player.points === winner.points &&
          dist(
            [gameState.goal[0].location.col, gameState.goal[0].location.row],
            [player.location.col, player.location.row]
          ) <
            dist(
              [gameState.goal[0].location.col, gameState.goal[0].location.row],
              [winner.location.col, winner.location.row]
            )
        ) {
          winner = player;
        }
      });

      return winner;
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState?.id && gameState?.status === GameStatus.NEW) {
      playerFacingDirections.current = gameState.players.reduce(
        (result, current, index) => {
          return {
            ...result,
            [current.id]: index % 2 === 1 ? "face-left" : "face-right",
          };
        },
        {}
      );
    }
  }, [gameState?.id]); // eslint-disable-line

  return (
    <>
      <div className="playground w-[88vw] h-[96.2vw] md:w-[44vw] md:h-[48.1vw] m-auto">
        <div className="w-full h-full px-[4.23%] pt-[4.4%] pb-[13.6%]">
          <Image
            fill
            alt="arena"
            src="/assets/spritesheets/terrains/arena.png"
          />
          <div className="w-full h-full grid grid-rows-[12]">
            {new Array(PLAYGROUND_SIZE).fill(0).map((_, rowIndex) => (
              <div className="row w-full grid grid-cols-12" key={rowIndex}>
                {new Array(PLAYGROUND_SIZE).fill(0).map((_, colIndex) => {
                  // Step 1: check if this cell is the next move or not
                  const isNext =
                    currentPlayer &&
                    nextMoveLocation &&
                    colIndex === nextMoveLocation.col - 1 &&
                    rowIndex === nextMoveLocation.row - 1;

                  // Step 2: check if this cell is a goal or not
                  const goal = gameState?.goal.find(
                    (goal) =>
                      goal.location.col - 1 === colIndex &&
                      goal.location.row - 1 === rowIndex
                  );

                  // Step 3: check if this cell has cell value
                  const cellValue = gameState?.map[rowIndex][colIndex];
                  let point = 0;
                  try {
                    point = parseInt(cellValue as string);
                  } catch {
                    // Do nothing
                  }

                  // Step 4: check if this cell has player on it
                  const player = gameState?.players.find(
                    (player) =>
                      player.location.col - 1 === colIndex &&
                      player.location.row - 1 === rowIndex
                  );

                  let wasHit = false;

                  if (player) {
                    // Find the players hit by bomb in prev round
                    wasHit =
                      gameState?.prev_round[player.id]?.got_bomb || false;

                    // Decide which direction the avatar is facing
                    if (
                      gameState?.prev_round[player.id]?.action_result === "left"
                    ) {
                      playerFacingDirections.current[player.id] = "face-left";
                    } else if (
                      gameState?.prev_round[player.id]?.action_result ===
                      "right"
                    ) {
                      playerFacingDirections.current[player.id] = "face-right";
                    }
                  }

                  return (
                    <div
                      className={[
                        "col w-full h-full relative",
                        isNext ? "next" : "",
                      ].join(" ")}
                      key={colIndex}
                    >
                      {point > 0 && (
                        <Image
                          src={POINTS[point]}
                          className="p-2 md:p-4"
                          alt={String(point)}
                          fill
                        />
                      )}

                      {goal && (
                        <Image
                          src={GOALS[goal.player_id! || "a"]}
                          alt="goal"
                          fill
                          className="scale-125"
                        />
                      )}

                      {player && (
                        <div
                          className={[
                            "absolute w-full h-full scale-110",
                            playerFacingDirections.current[player.id],
                            wasHit ? "hit" : "idle",
                          ].join(" ")}
                          key={player.id}
                        >
                          <Image
                            src={PLAYERS[player.id]}
                            fill
                            className="object-contain !-top-1/4"
                            alt={player.name ? player.name : player.id}
                          />
                          <div className="absolute p-[1px] md:p-[2px] min-w-[20px] md:min-w-[30px] -left-1/2 md:-left-1/3 -translate-y-2/3 flex flex-col items-center justify-center text-[8px] md:text-xs text-black bg-white rounded-md opacity-80 hover:opacity-100">
                            <span>
                              {player.id === currentPlayer?.id ? (
                                "You"
                              ) : (
                                <>{player.name ? player.name : player.id}</>
                              )}
                            </span>
                            <span>{player.points}</span>
                          </div>

                          {winner?.id === player.id && (
                            <div className="flex text-green-300 font-bold flex-row text-xs">
                              Winner🎉
                            </div>
                          )}
                        </div>
                      )}

                      {wasHit && (
                        <div className="absolute">
                          <Lottie animationData={explosionAnimation} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {winner && winner.id === currentPlayer?.id && <WinScreen />}
    </>
  );
};
