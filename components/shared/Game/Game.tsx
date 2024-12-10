"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useReadContract, useWatchContractEvent, useAccount } from "wagmi";
import { useChessFactory } from "@/hooks/useContract";
import { CONTRACT_ABI as ChessFactoryABI, CONTRACT_ADDRESS as ChessFactoryAddress } from "@/contracts/ChessFactory";

export default function Game() {
  const [games, setGames] = useState<any[]>([]);
  const { writeChessFactory } = useChessFactory();
  const { address } = useAccount();

  // Lire toutes les parties existantes
  const { data: allGames, refetch } = useReadContract({
    address: ChessFactoryAddress,
    abi: ChessFactoryABI,
    functionName: "getAllGameDetails",
  });

  // Mettre à jour l'état lorsqu'une nouvelle partie est créée
  useWatchContractEvent({
    address: ChessFactoryAddress,
    abi: ChessFactoryABI,
    eventName: "GameCreated",
    onLogs: () => refetch(),
  });

  // Fonction pour s'inscrire à une partie
  const handleRegister = async (gameAddress: string) => {
    try {
      writeChessFactory("registerToGame", [gameAddress]);
      refetch(); // Rafraîchir les données
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  // Mettre à jour l'état local avec les détails des parties
  useEffect(() => {
    console.log("Données récupérées du contrat :", allGames);
    if (Array.isArray(allGames)) {
      setGames(allGames);
    }
  }, [allGames]);

  return (
    <div className="games-list">
      {games.map((game, index) => (
        <div key={index} className="flex border-2 border-[#38B6FF] mt-8">
          <Image src="/images/logo/logo_white_bg_blue.png" alt="Logo white Chess to earn" width={200} height={200} />
          <div className="mx-8 my-2 flex-grow">
            <div className="flex flex-row justify-between w-full">
              <h2 className="font-bold">
                {game.player1.pseudo || "---"} / <span>{game.player2.pseudo || "---"}</span>
              </h2>
              <p>{index + 1}</p>
            </div>
            <div className="flex flex-row justify-between w-2/5 mt-4">
              <div>
                <p>Début de la partie</p>
                <p>{new Date(Number(game.startTime) * 1000).toLocaleString()}</p>
              </div>
              <div>
                <p>Frais d'inscription</p>
                <p>{Number(game.betAmount) / 1e18} CHESS</p>
              </div>
              <div>
                <p>Récompense</p>
                <div className="flex flex-row">
                  <p className="mr-2">
                    {(Number(game.betAmount) * 2 - (Number(game.betAmount) * 2) / 20) / 1e18} CHESS
                  </p>
                  <Image src="/images/game/award.png" alt="award icon" width={24} height={24} />
                </div>
              </div>
            </div>
            <div>
              
            </div>
            <button
              className="btn btn-primary btn-wide mt-6"
              onClick={() => handleRegister(game.gameAddress)}
              disabled={!address} // Désactiver si aucun compte connecté
            >
              S'inscrire
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
