'use client';
import { useEffect, useState } from 'react';
import { Chess } from 'chess.js';
import NextChessground from 'next-chessground';

export default function Game() {
  const [game, setGame] = useState(new Chess());

  useEffect(() => {
    console.log('Game state:', game.fen());
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
      </div>
    </div>
  );
  
}
