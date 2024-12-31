"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import { useAccount } from "wagmi";
import { useChessFactory } from "@/hooks/useContract";

export default function GameDetailsCard() {
  const { address: sender } = useAccount();
  const { readChessFactory, writeChessFactory, watchChessFactoryEvent } = useChessFactory();
  const [games, setGames] = useState([]);

  const { data: gamesDetails, refetch } = readChessFactory("getGames", [0, 20]);

  watchChessFactoryEvent("GameCreated", () => refetch());
  watchChessFactoryEvent("PlayerRegistered", () => refetch());

  const handleRegisterToGame = async (gameAddress: string) => {
    try {
      writeChessFactory("registerToGame", [gameAddress]);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    if (Array.isArray(gamesDetails)) {
      setGames(gamesDetails);
    }
  }, [gamesDetails]);

  const handleJoinGame = (gameAddress: string) => {
    try {
      window.location.href = `/in-game/${gameAddress}`;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  return (
    <div className="mb-8">
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
                <p>Frais d&apos;inscription</p>
                <p>{Number(game.betAmount) / 1e18} CHESS</p>
              </div>
              <div>
                <p>Récompense</p>
                <div className="flex flex-row">
                  <p className="mr-2">{(Number(game.betAmount) * 2 * 0.75) / 1e18} CHESS</p>
                  <Image src="/images/game/award.png" alt="award icon" width={24} height={24} />
                </div>
              </div>
            </div>
            <div></div>
            <button
              className="btn btn-primary btn-wide mt-6"
              onClick={() =>
                game.player1.userAddress === sender || game.player2.userAddress === sender
                  ? handleJoinGame(game.gameAddress)
                  : handleRegisterToGame(game.gameAddress)
              }
              disabled={!sender}
            >
              {game.player1.userAddress === sender || game.player2.userAddress === sender ? "Jouer" : "S'inscrire"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
