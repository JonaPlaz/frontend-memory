"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAccount } from "wagmi";
import { useChessFactory, useChessTemplate } from "@/hooks/useContract";

import Image from "next/image";

import { Chess, Square } from "chess.js";
import Chessground from "@react-chess/chessground";

import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

import { GameDetails } from "@/interfaces/GameDetails";
import { User } from "@/interfaces/User";

import { decodeSquare } from "@/utils/board/decode";
import { encodeMove } from "@/utils/board/encode";
import { squares } from "@/utils/board/squares";

export default function Game() {
  const { address: sender } = useAccount();

  const [chess] = useState(new Chess());
  const [validMoves, setValidMoves] = useState(new Map());

  const [showToast, setShowToast] = useState(false);

  const { useReadChessFactory } = useChessFactory();
  const { useReadChessTemplate, useWriteChessTemplate, useWatchChessTemplateEvent } = useChessTemplate();
  const params = useParams();

  const gameAddress = params.id;

  const { data: gameDetails, isLoading } = useReadChessFactory<GameDetails>("getGameDetails", [gameAddress]);
  const { data: user, refetch } = useReadChessFactory<User>("getUser");

  const { data: gameState } = useReadChessTemplate("getGameState", [], gameAddress as `0x${string}`);

  useWatchChessTemplateEvent(
    "MovePlayed",
    () => {
      refetch();
    },
    gameAddress as `0x${string}`
  );

  useWatchChessTemplateEvent(
    "GameEnded",
    () => {
      console.log("La partie est terminée !");
    },
    gameAddress as `0x${string}`
  );

  const isPlayer1 = sender === gameDetails?.player1?.userAddress;
  const isPlayer2 = sender === gameDetails?.player2?.userAddress;

  const handleTurnChange = () => {
    const turn = chess.turn();
    const isPlayerTurn = (turn === "w" && isPlayer1) || (turn === "b" && isPlayer2);
    setShowToast(isPlayerTurn);
  };

  useEffect(() => {
    updateValidMoves();
  }, []);

  useEffect(() => {
    handleTurnChange();
    console.log("GameState", gameState);
    if (gameState && gameState[0].length > 0) {
      const moves = gameState[0];
      chess.reset();
      moves.forEach((encodedMove: number) => {
        const from = decodeSquare(encodedMove >> 6);
        const to = decodeSquare(encodedMove & 0x3f);
        chess.move({ from, to });
      });
      updateValidMoves();
    }
  }, [gameState]);

  const generateValidMoves = () => {
    const dests = new Map();
    squares.forEach((square) => {
      const moves = chess.moves({ square: square as Square, verbose: true });
      if (moves.length > 0) {
        dests.set(
          square,
          moves.map((move) => move.to)
        );
      }
    });
    return dests;
  };

  const updateValidMoves = () => {
    const dests = generateValidMoves();
    setValidMoves(dests);
  };

  const handleMove = (orig: string, dest: string) => {
    const move = chess.move({ from: orig, to: dest, promotion: "q" });
    if (move) {
      try {
        const moves = chess.history({ verbose: true });
        const encodedMoves = moves.map(({ from, to }) => encodeMove(from, to));
        useWriteChessTemplate("playMove", [encodedMoves], gameAddress as `0x${string}`);
        setShowToast(false);
      } catch (error) {
        console.error("Erreur lors de l'envoi du mouvement :", (error as any).message);
      }
    } else {
      console.log("Mouvement invalide");
    }
  };

  const chessgroundConfig = {
    fen: chess.fen(),
    orientation: isPlayer1 ? "white" : "black",
    turnColor: chess.turn() === "w" ? "white" : "black",
    movable: {
      color: isPlayer1 ? "white" : isPlayer2 ? "black" : null,
      dests: validMoves,
      showDests: true,
      free: false,
    },
    events: {
      move: handleMove,
    },
  };

  return (
    <>
      <div className="flex justify-between flex-row">
        <div>
          <p>Pseudo : {user?.pseudo}</p>
          <p>Balance : {Number(user?.balance) / 10 ** 18} ChessToken</p>
        </div>
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
                {gameDetails.player1.pseudo} (Blancs) / {gameDetails.player2.pseudo} (Noirs)
              </p>
              <p className="font-bold">Récompense</p>
              <div className="flex flex-row">
                <p className="mr-2">
                  {(Number(gameDetails.betAmount) * 2 - (Number(gameDetails.betAmount) * 2) / 20) / 1e18} CHESS
                </p>
                <Image src="/images/game_board/award.png" alt="award icon" width={24} height={24} />
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center w-1/3 space-y-4">
          {showToast && (
            <div className="toast">
              <div className="alert bg-primary text-white">
                <span>A toi de jouer !</span>
              </div>
            </div>
          )}
          <Chessground width={600} height={600} config={chessgroundConfig} />
        </div>
        <div className="flex flex-col space-y-8 ml-4">
          <button className="btn btn-primary btn-wide">Draw</button>
          <button className="btn btn-error btn-wide">Abandon</button>
        </div>
      </div>
    </>
  );
}
