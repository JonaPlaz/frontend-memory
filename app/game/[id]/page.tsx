'use client';
import { useEffect, useState } from 'react';
import { Chess } from 'chess.js';
import NextChessground from 'next-chessground';

export default function Game() {
  const [game, setGame] = useState(new Chess());

  useEffect(() => {
    console.log('Game state:', game.fen());

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
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center w-1/3">
        <h1 className="text-2xl font-bold mb-4">Chess Game</h1>
        <NextChessground
          onMove={onMove}
          fen={game.fen()}
        />
        <div className="mt-4 w-full">
          <h2 className="text-lg font-bold mb-2">Historique des mouvements</h2>
          <ul className="list-disc list-inside bg-gray-100 p-4 rounded-lg">
            {game.history({ verbose: true }).map((move, index) => (
              <li key={index}>
                {index + 1}. {move.color === "w" ? "Blanc" : "Noir"} : {move.from} → {move.to}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
