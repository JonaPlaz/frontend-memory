"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Chessground from "@react-chess/chessground";
import { useChessFactory, useChessTemplate } from "@/hooks/useContract";
import { useAccount } from "wagmi";
import Image from "next/image";
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";
import { Chess } from "chess.js";

export default function Game() {
  const [isReady, setIsReady] = useState(false);
  const [chess] = useState(new Chess()); // Initialise chess.js
  const [fen, setFen] = useState(chess.fen()); // L'état FEN de l'échiquier
  const [movableDests, setMovableDests] = useState(new Map()); // Mouvements valides
  const { chessUser, readChessFactory } = useChessFactory();
  const { writeChessTemplate } = useChessTemplate();
  const { address: currentAddress } = useAccount();
  const params = useParams();

  const gameAddress = params.id;
  const gameDetails = readChessFactory("getGameDetails", [gameAddress]);

  const isPlayer1 = currentAddress === gameDetails?.data?.player1?.userAddress;
  const isPlayer2 = currentAddress === gameDetails?.data?.player2?.userAddress;

  // Génère les mouvements valides pour chaque pièce
  const getMovableDests = () => {
    const dests = new Map();
    const squares = [
      "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8",
      "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8",
      "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8",
      "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8",
      "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8",
      "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8",
      "g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8",
      "h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8",
    ];

    squares.forEach((square) => {
      const moves = chess.moves({ square, verbose: true });
      if (moves.length) {
        dests.set(
          square,
          moves.map((move) => move.to)
        );
      }
    });
    return dests;
  };

  // Met à jour les destinations valides
  const updateMovableDests = () => {
    const dests = getMovableDests();
    setMovableDests(dests);
  };

  const handleMove = (orig, dest) => {
    console.log(`Tentative de déplacement : ${orig} -> ${dest}`);
    const move = chess.move({ from: orig, to: dest, promotion: "q" }); // Promotion par défaut en dame
    if (move) {
      setFen(chess.fen()); // Met à jour l'état FEN avec la nouvelle position
      updateMovableDests(); // Met à jour les destinations valides

      // Enregistrement du mouvement sur la blockchain
      try {
        const moveCode = encodeMove(orig, dest); // Fonction pour encoder le mouvement en uint16
        writeChessTemplate("playMove", [moveCode]);
        console.log(`Mouvement enregistré : ${orig} -> ${dest}`);
      } catch (error) {
        console.error("Erreur lors de l'enregistrement sur la blockchain :", error);
      }
      console.log(`Mouvement valide : ${orig} -> ${dest}`);
    } else {
      console.log("Mouvement invalide");
    }
  };

  const encodeMove = (from, to) => {
    const fileMap = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7 };
    const encodeSquare = (square) => {
      const file = fileMap[square[0]];
      const rank = parseInt(square[1], 10) - 1;
      if (file < 0 || file > 7 || rank < 0 || rank > 7) {
        throw new Error(`Invalid square: ${square}`);
      }
      return (file << 3) | rank; // Encodage d'une position en 6 bits
    };

    const fromPos = encodeSquare(from);
    const toPos = encodeSquare(to);

    if (fromPos > 63 || toPos > 63) {
      throw new Error(`Encoded positions out of range: fromPos=${fromPos}, toPos=${toPos}`);
    }

    const encodedMove = (fromPos << 6) | toPos;
    console.log(`Encoded move: from=${from} (${fromPos}), to=${to} (${toPos}), move=${encodedMove}`);
    return encodedMove;
  };

  useEffect(() => {
    updateMovableDests(); // Initialiser les mouvements valides
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <p>Chargement...</p>;
  }

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
          {gameDetails.isLoading ? (
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
          <Chessground width={600} height={600} config={chessgroundConfig} />
        </div>
        <div className="flex flex-col space-y-8 ml-4">
          <button className="btn btn-primary btn-wide">Proposer une égalité</button>
          <button className="btn btn-error btn-wide">Abandonner</button>
        </div>
      </div>
    </>
  );
}
