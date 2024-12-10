"use client";
import { useState, useEffect } from "react";
import { useChessFactory } from "@/hooks/useContract";
import Connect from "@/components/shared/Connect/Connect";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import GameList from "@/components/shared/GameList/GameList";
import { useAccount } from "wagmi";
import RegisterPopIn from "@/components/shared/Register/RegisterPopIn";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { chessUsers, isLoading, isError, writeChessFactory } = useChessFactory();
  const [isRegistered, setIsRegistered] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [balance, setBalance] = useState(0);
  const [showPopIn, setShowPopIn] = useState(false);

  // Réinitialise les états lorsque l'utilisateur se déconnecte
  useEffect(() => {
    if (!isConnected) {
      resetUserState();
    }
  }, [isConnected]);

  useEffect(() => {
    if (isConnected && address) {
      resetUserState(); // Réinitialise pour éviter d'afficher des données obsolètes
      if (!isLoading && !isError) {
        checkUserRegistration();
      }
    }
  }, [isConnected, address, isLoading, isError]);

  const resetUserState = () => {
    setIsRegistered(false);
    setPseudo("");
    setBalance(0);
    setShowPopIn(false);
  };

  const checkUserRegistration = () => {
    if (!chessUsers || !Array.isArray(chessUsers)) {
      console.error("Erreur : 'chessUsers' n'est pas un tableau ou est undefined :", chessUsers);
      return;
    }

    const user = chessUsers.find((u) => u.userAddress.toLowerCase() === address.toLowerCase());

    if (user) {
      setIsRegistered(true);
      setPseudo(user.pseudo);
      setBalance(user.balance);
    } else {
      setShowPopIn(true); // Affiche la pop-in si l'utilisateur n'est pas enregistré
    }
  };

  const registerUser = (newPseudo) => {
    writeChessFactory("registerUser", [newPseudo]);
    setShowPopIn(false);
  };

  // Si le portefeuille n'est pas connecté, affichez uniquement le composant <Connect />
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
                <p>Solde : {Number(balance) / 10 ** 18} ChessToken </p>
              </div>
            ) : (
              <p>Chargement des informations utilisateur...</p>
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
