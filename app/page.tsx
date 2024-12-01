"use client";
import { useChessFactory } from "@/hooks/useContract";

export default function Home() {
  const chessFactory = useChessFactory;

  const createGame = async () => {
    console.log(chessFactory);
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Chess - Blitz</h1>
      <button onClick={createGame} className="btn btn-primary">
        Create Game
      </button>
    </main>
  );
}
