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
  // 1- le user peut acheter du ChessToken avec de l'eth
  // 2- le user peut retirer ses propres fonds pour les mettre sur son wallet
  // 3- pour le user 2 qui participe À une partie : le nouveau solde ne s'affiche pas automatiquement

  // 4- qui paie les frais les réseau

  const { address: sender, isConnected } = useAccount();
  const { useReadChessFactory, useWriteChessFactory, useWatchChessFactoryEvent } = useChessFactory();

  const { data: user, refetch } = useReadChessFactory<User>("getUser");
  const [pseudo, setPseudo] = useState("");
  const [balance, setBalance] = useState(0);

  const [showPopIn, setShowPopIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ethToSpend, setEthToSpend] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEthToSpend(""); // Réinitialiser le champ à la fermeture
  };

  useWatchChessFactoryEvent("UserRegistered", () => {
    refetch();
  });

  useWatchChessFactoryEvent("ChessTokensPurchased", () => {
    refetch();
  });

  useEffect(() => {
    if (!user) {
      setShowPopIn(true);
    }
  }, [isConnected]);

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

  const buyChessTokens = (amountInEth: number) => {
    useWriteChessFactory("buyChessTokens", [BigInt(amountInEth * 10 ** 18)], (amountInEth * 10 ** 18).toString());
  };

  const handleBuyTokens = () => {
    const amount = parseFloat(ethToSpend);
    if (!isNaN(amount) && amount > 0) {
      buyChessTokens(amount); // Appel à votre fonction d'achat
      closeModal();
    } else {
      alert("Veuillez entrer un montant valide.");
    }
  };

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
          <div className="flex flex-col">
            <div className="my-4">
              <ConnectButton />
            </div>
            {/* Bouton pour ouvrir la modal */}
            <button className="btn btn-primary" onClick={openModal}>
              Acheter ChessTokens
            </button>

            {/* Modal */}
            {isModalOpen && (
              <div className="modal modal-open">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Acheter des ChessTokens</h3>
                  <p className="py-4">Entrez le montant d'ETH que vous souhaitez dépenser. (1000 Chess = 0.001 ETH)</p>
                  <input
                    type="text"
                    placeholder="Montant en ETH"
                    className="input input-bordered w-full"
                    value={ethToSpend}
                    onChange={(e) => setEthToSpend(e.target.value)}
                  />
                  <div className="modal-action">
                    <button className="btn btn-primary" onClick={handleBuyTokens}>
                      Valider
                    </button>
                    <button className="btn" onClick={closeModal}>
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}
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
