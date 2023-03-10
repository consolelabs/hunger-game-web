import "../styles/fonts.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GameContextProvider } from "../contexts/game";
import { SEO } from "../components/SEO";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEO />
      <GameContextProvider>
        <Component {...pageProps} />
      </GameContextProvider>
    </>
  );
}
