import Head from "next/head";
import React from "react";

export const SEO = () => {
  return (
    <Head>
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <title>Hunger Game</title>
      <meta name="title" content="Hunger Game" />
      <meta
        name="description"
        content="Join the Hunger Game fun with four players and a random portal location. Collect points while racing to find the portal before your opponents. Just watch out for explosions!"
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://the-hunger-game.vercel.app/" />
      <meta property="og:title" content="Hunger Game" />
      <meta
        property="og:description"
        content="Join the Hunger Game fun with four players and a random portal location. Collect points while racing to find the portal before your opponents. Just watch out for explosions!"
      />
      <meta
        property="og:image"
        content={`https://the-hunger-game.vercel.app/thumbnail.png`}
      />

      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content="https://the-hunger-game.vercel.app/"
      />
      <meta property="twitter:title" content="Hunger Game" />
      <meta
        property="twitter:description"
        content="Join the Hunger Game fun with four players and a random portal location. Collect points while racing to find the portal before your opponents. Just watch out for explosions!"
      />
      <meta
        property="twitter:image"
        content={`https://the-hunger-game.vercel.app/thumbnail.png`}
      />
      <link
        rel="icon"
        href={`https://the-hunger-game.vercel.app/favicon.ico`}
      />
    </Head>
  );
};
