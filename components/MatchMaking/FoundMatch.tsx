/* eslint-disable @next/next/no-img-element */

export const FoundMatch = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black/80">
      <div className="relative flex md:h-[36rem] md:w-[36rem] h-[300px] w-[300px] items-center justify-center rounded-full border-4 border-[#997834] bg-zinc-900 p-4">
        <div className="relative md:mt-7 md:h-[32rem] md:w-[29.5rem] h-full w-full rounded-full bg-contain bg-no-repeat bg-[url('/assets/images/inner-circle.svg')]">
          {/* <div className="h-[39rem] w-[39rem] absolute top-[-15%] sm:top-[-15.4%] left-[-15.4%] ">
            <canvas
              style={{ verticalAlign: "top", width: "343px", height: "343px" }}
              width="686"
              height="686"
            ></canvas>
          </div> */}
          <img
            src="/assets/images/logo.png"
            alt="image"
            className="absolute top-[21%] left-[36%] md:h-32 md:w-32 h-12 w-12 object-contain"
          />
          <p className="absolute top-[48%] left-[25%] md:text-3xl text-lg font-extrabold tracking-wider text-[#F1E6D2] shadow-black drop-shadow-xl">
            MATCH FOUND
          </p>{" "}
          <p className="w-fit absolute top-[56%] md:left-[29%] left-[20%] font-normal md:text-sm text-xs tracking-wider text-[#afafaf] shadow-black drop-shadow-xl first-letter:font-bold">
            Hunger Game - 4 Players
          </p>
          <p className="absolute cursor-pointer md:bottom-[3.4rem] md:left-[12rem] bottom-[5px] left-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 text-xs md:text-xl font-bold tracking-wider text-white">
            ACCEPT!
          </p>
        </div>
        <button className="absolute -bottom-4 left-[50%] translate-x-[-50%] md:border-4 border-2 border-[#BCAA85] bg-gray-800 hover:bg-gray-900 md:px-6 md:py-2 px-1 text-sm font-semibold uppercase tracking-wider text-amber-600">
          Decline
        </button>
      </div>
    </div>
  );
};
