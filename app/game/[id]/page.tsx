"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Chess } from "chess.js";
import NextChessground from "next-chessground";
import { useChessFactory } from "@/hooks/useContract";
import Image from "next/image";

export default function Game() {
  const [game, setGame] = useState(new Chess());
  const [isLoading, setIsLoading] = useState(true); // Ajout de l'état de chargement
  const { chessUser, readChessFactory } = useChessFactory();
  const params = useParams();

  const gameAddress = params.id;

  const gameDetails = readChessFactory("getGameDetails", [gameAddress]);

  useEffect(() => {
    if (gameDetails.data) {
      setIsLoading(false);
    }
  }, [gameDetails]);

  console.log("Game details:", gameDetails?.data);

  useEffect(() => {
    console.log("Game state:", game.fen());

    if (game.isCheckmate()) {
      alert("Échec et mat !");
    } else if (game.isDraw()) {
      alert("Partie nulle !");
    } else if (game.isCheck()) {
      alert("Échec !");
    }
  }, [game]);

  const onMove = (from: string, to: string) => {
    const newGame = new Chess(game.fen());
    if (newGame.move({ from, to })) {
      setGame(newGame);
    }
  };

  return (
    <>
      <div className="flex justify-between flex-row">
        <div>
          <p>Pseudo : {chessUser?.pseudo}</p>
          <p>Balance : {Number(chessUser?.balance) / 10 ** 18} ChessToken</p>
        </div>
        <p>Comment ça marche ?</p>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col space-y-8 mr-4">
          <Image
            src="/images/game_board/arrow_left_black.png"
            alt="arrow left black to return home"
            width={30}
            height={30}
          />
          <h2 className="text-[#38B6FF] font-bold">Partie en cours</h2>
          {isLoading ? (
            <p>Chargement des détails de la partie...</p>
          ) : (
            <div>
              <p className="font-bold">
                {gameDetails.data.player1.pseudo} (Blanc) / {gameDetails.data.player2.pseudo} (Noir)
              </p>
              <p className="font-bold">Récompense</p>
              <div className="flex flex-row">
                <p className="mr-2">
                  {(Number(gameDetails.data.betAmount) * 2 - (Number(gameDetails.data.betAmount) * 2) / 20) / 1e18}{" "}
                  CHESS
                </p>
                <Image src="/images/game_board/award.png" alt="award icon" width={24} height={24} />
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center w-1/3 space-y-4">
          <p className="text-[#2FCA2F]">À vous de jouer !</p>
          <NextChessground onMove={onMove} fen={game.fen()} />
        </div>
        <div className="flex flex-col space-y-8 ml-4">
          <button className="btn btn-primary btn-wide">Proposer une égalité</button>
          <button className="btn btn-error btn-wide">Abandonner</button>
        </div>
      </div>
    </>
  );
}
