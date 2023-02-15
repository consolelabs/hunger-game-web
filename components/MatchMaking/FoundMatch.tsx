import { CountdownCircleTimer } from "react-countdown-circle-timer";

export const FoundMatch = () => {
  return (
    <div className="w-full h-full fixed bg-black/90 top-0 left-0 z-50 flex justify-center items-center">
      <div className="relative w-96 h-96 p-6 text-white border-solid border-2 border-yellow-800 rounded-full">
        <div className="w-full h-full rounded-full border border-yellow-300">
          <div className="w-full h-full rounded-full border-[10px] border-blue-400 flex flex-col justify-center text-center">
            <div className="relative w-full h-full p-8 rounded-full border border-yellow-300">
              <div className="font-bold text-yellow-200 text-2xl">
                Match Found
              </div>
              <div className="text-yellow-100 text-xs">
                Summoner&#39;s Rift • Co-op vs. AI • 5v5
              </div>

              <div className="bg-black absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 border border-yellow-300 p-1">
                <button className="py-1 px-4 border border-cyan-500 bg-slate-700">
                  Accept!
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* decline button */}
        <button className="px-3 py-1 bg-slate-800 border border-yellow-700 absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 text-xs">
          Decline
        </button>
      </div>
    </div>
  );
};
