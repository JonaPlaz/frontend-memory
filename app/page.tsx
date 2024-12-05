"use client";
import { useChessFactory } from "@/hooks/useContract";

import Connect from "@/components/shared/Connect/Connect";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import GameList from "@/components/shared/GameList/GameList";

export default function Home() {
  const chessFactory = useChessFactory;

  //  prochaine étape, on vire le create, on fait 3 create game en local sur le back
  // on crée un composant GameList et ses sous composants (qui récupèrera) les games et on affiche les games
  const createGame = async () => {
    console.log(chessFactory);
  };

  return (
    <>
      <div className="my-4">
        <Connect />
      </div>
      <ConnectButton />
      <div className="my-8">
        <GameList />
      </div>
    </>
  );
}
