"use client";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useChessFactory } from "@/hooks/useContract";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Connect from "@/components/shared/Connect/Connect";
import GameList from "@/components/shared/GameList/GameList";
import RegisterPopIn from "@/components/shared/Register/RegisterPopIn";

import { User } from "@/interfaces/User";

export default function Home() {
  const { address: sender, isConnected } = useAccount();
  const { useReadChessFactory, useWriteChessFactory, useWatchChessFactoryEvent } = useChessFactory();

  const { data: user, refetch } = useReadChessFactory<User>("getUser");
  const [pseudo, setPseudo] = useState("");
  const [balance, setBalance] = useState(0);
  
  const [showPopIn, setShowPopIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useWatchChessFactoryEvent("UserRegistered", () => {
    refetch();
  });

  useEffect(() => {
      refetch();
  }, [sender]);

  useEffect(() => {
    if (user) {
      setPseudo(user.pseudo);
      setBalance(user.balance);
      setIsRegistered(true);
      setShowPopIn(false);
    } else {
      setPseudo("");
      setBalance(0);
      setIsRegistered(false);
      setShowPopIn(true);
    }
  }, [user]);

  const registerUser = (newPseudo: string) => {
    useWriteChessFactory("registerUser", [newPseudo]);
    setShowPopIn(false);
    refetch();
  };

  if (!isConnected) {
    return (
      <>
        <div className="my-4">
          <Connect />
        </div>
        <div className="my-4">
          <ConnectButton />
        </div>
        <GameList />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-grow">
        <div className="flex flex-row justify-between w-full">
          <div className="my-4">
            <ConnectButton />
          </div>
          <div className="my-8">
            {isRegistered ? (
              <div>
                <h3>Hello, {pseudo} !</h3>
                <p>Solde : {Number(balance) / 10 ** 18} ChessToken</p>
              </div>
            ) : (
              <p>Utilisateur inconnu...</p>
            )}
          </div>
        </div>
      </div>
      {showPopIn && (
        <RegisterPopIn
          title="Inscription nécessaire"
          description="Veuillez saisir un pseudo pour vous enregistrer."
          onSubmit={registerUser}
          onCancel={() => setShowPopIn(false)}
        />
      )}
      <GameList />
    </>
  );
}
