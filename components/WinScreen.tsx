import Lottie from "lottie-react";
import winAnimation from "../assets/lottie/win.json";
import { useGameContext } from "../contexts/game";

export const WinScreen = () => {
  return (
    <div className="fixed z-50 flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-50">
      <Lottie animationData={winAnimation} loop={false} />
      <button className="text-md md:text-xl text-white px-1 py-1 md:px-3 md:py-2 bg-amber-500 rounded-md hover:scale-105">
        Play Again
      </button>
    </div>
  );
};
