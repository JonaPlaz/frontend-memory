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
  // Fonctionnalités : Acheter, retirer et déposer des ChessTokens

  const { address: sender, isConnected } = useAccount();
  const { readChessFactory, writeChessFactory, watchChessFactoryEvent } = useChessFactory();

  const { data: user, refetch } = readChessFactory<User>("getUser");
  const [pseudo, setPseudo] = useState("");
  const [balance, setBalance] = useState(0);

  const [showPopIn, setShowPopIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"buy" | "withdraw" | "deposit">("buy");
  const [amount, setAmount] = useState("");

  const openModal = (type: "buy" | "withdraw" | "deposit") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAmount(""); // Réinitialiser le champ à la fermeture
  };

  watchChessFactoryEvent("UserRegistered", () => {
    refetch();
  });

  watchChessFactoryEvent("ChessTokensPurchased", () => {
    refetch();
  });

  watchChessFactoryEvent("TokensWithdrawn", () => {
    refetch();
  });

  watchChessFactoryEvent("TokensDeposited", () => {
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
    writeChessFactory("buyChessTokens", [BigInt(amountInEth * 10 ** 18)], (amountInEth * 10 ** 18).toString());
  };

  const withdrawChessTokens = (amount: number) => {
    writeChessFactory("withdrawTokens", [BigInt(amount * 10 ** 18)]);
  };

  const depositChessTokens = (amount: number) => {
    writeChessFactory("depositTokens", [BigInt(amount * 10 ** 18)]);
  };

  const handleAction = () => {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      if (modalType === "buy") {
        buyChessTokens(parsedAmount);
      } else if (modalType === "withdraw") {
        withdrawChessTokens(parsedAmount);
      } else if (modalType === "deposit") {
        depositChessTokens(parsedAmount);
      }
      closeModal();
    } else {
      alert("Veuillez entrer un montant valide.");
    }
  };

  const registerUser = (newPseudo: string) => {
    writeChessFactory("registerUser", [newPseudo]);
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
            {/* Boutons pour ouvrir les modals */}
            {isConnected && isRegistered && (
              <div className="my-4 flex flex-row gap-4">
                <button className="btn btn-primary" onClick={() => openModal("buy")}>
                  Acheter ChessTokens
                </button>
                <button className="btn btn-primary" onClick={() => openModal("withdraw")}>
                  Retirer ChessTokens
                </button>
                <button className="btn btn-primary" onClick={() => openModal("deposit")}>
                  Déposer ChessTokens
                </button>
              </div>
            )}

            {/* Modal */}
            {isModalOpen && (
              <div className="modal modal-open">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">
                    {modalType === "buy"
                      ? "Acheter des ChessTokens"
                      : modalType === "withdraw"
                      ? "Retirer des ChessTokens"
                      : "Déposer des ChessTokens"}
                  </h3>
                  <p className="py-4">
                    {modalType === "buy"
                      ? "Entrez le montant d'ETH que vous souhaitez dépenser. (1000 Chess = 0.001 ETH)"
                      : "Entrez le montant de ChessTokens."}
                  </p>
                  <input
                    type="text"
                    placeholder="Montant"
                    className="input input-bordered w-full"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <div className="modal-action">
                    <button className="btn btn-primary" onClick={handleAction}>
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
