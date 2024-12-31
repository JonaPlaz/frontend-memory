"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAccount } from "wagmi";
import { useChessFactory, useChessTemplate } from "@/hooks/useContract";

import Image from "next/image";

import { Chess, Square } from "chess.js";
import Chessground from "@react-chess/chessground";

import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

import { GameDetails } from "@/interfaces/GameDetails";
import { User } from "@/interfaces/User";

import { decodeSquare } from "@/utils/board/decode";
import { encodeMove } from "@/utils/board/encode";
import { squares } from "@/utils/board/squares";

export default function Game() {
  const { address: sender } = useAccount();

  // État local pour le plateau d'échecs
  const [chess] = useState(new Chess());
  const [validMoves, setValidMoves] = useState(new Map());

  // État pour connaître si la partie est active
  const [gameActive, setGameActive] = useState<boolean>(false);

  // Gestion des toasts (à toi de jouer)
  const [showToast, setShowToast] = useState(false);

  // Modal si la partie est inactif
  const [showInactivePopup, setShowInactivePopup] = useState(false);

  // States pour la proposition de nulle
  const [drawProposed, setDrawProposed] = useState(false);
  const [proposer, setProposer] = useState<string | null>(null);

  // Modal de fin de partie
  const [showEndGameModal, setShowEndGameModal] = useState(false);
  const [endGameTitle, setEndGameTitle] = useState("");
  const [endGameMessage, setEndGameMessage] = useState("");

  // Récupération des hooks de contrat
  const { readChessFactory } = useChessFactory();
  const { readChessTemplate, writeChessTemplate, watchChessTemplateEvent } = useChessTemplate();

  // Récupération des params
  const params = useParams();
  const gameAddress = params.id;

  // Récupère les infos de la partie
  const { data: gameDetails, isLoading } = readChessFactory<GameDetails>("getGameDetails", [gameAddress]);
  const { data: user, refetch } = readChessFactory<User>("getUser");

  // Récupère le statut inactif, gameState, drawProposed, etc.
  const { data: gameActiveFromSC } = readChessTemplate("isGameActive", [], gameAddress as `0x${string}`);
  const { data: gameState } = readChessTemplate("getGameState", [], gameAddress as `0x${string}`);
  const { data: drawProposedFromSC } = readChessTemplate("drawProposed", [], gameAddress as `0x${string}`);
  const { data: proposerFromSC } = readChessTemplate("proposer", [], gameAddress as `0x${string}`);

  // On met à jour notre état local "gameActive"
  useEffect(() => {
    if (typeof gameActiveFromSC === "boolean") {
      setGameActive(gameActiveFromSC);
    }
  }, [gameActiveFromSC]);

  // Sur un MovePlayed, on refetch pour mettre à jour
  watchChessTemplateEvent(
    "MovePlayed",
    () => {
      refetch();
    },
    gameAddress as `0x${string}`
  );

  // Sur Abandon (status=3)
  watchChessTemplateEvent(
    "GameAbandoned",
    () => {
      refetch();
      if (gameState) {
        const [currentStatus, winner, loser] = Array.isArray(gameState) ? gameState : [null, null, null];
        if (currentStatus === 3) {
          handleEndGameModal(winner, loser, sender, "Abandon");
        }
        setGameActive(currentStatus === 1);
      }
    },
    gameAddress as `0x${string}`
  );

  // Sur GameEnded (status=4)
  watchChessTemplateEvent(
    "GameEnded",
    () => {
      refetch();
      if (gameState) {
        const [currentStatus, winner, loser] = Array.isArray(gameState) ? gameState : [null, null, null];
        if (currentStatus === 4) {
          handleEndGameModal(winner, loser, sender, "Fin de partie (Mat)");
        }
      }
    },
    gameAddress as `0x${string}`
  );

  // Au rechargement de la page, si la partie est déjà en 3 ou 4, on ouvre la modal
  useEffect(() => {
    if (gameState) {
      const [currentStatus, winner, loser] = Array.isArray(gameState) ? gameState : [null, null, null];

      if (currentStatus === 3) {
        // Abandon
        handleEndGameModal(winner, loser, sender, "Abandon");
      } else if (currentStatus === 4) {
        // Fin (mat ou autre)
        handleEndGameModal(winner, loser, sender, "Fin de partie (Mat)");
      }
      // Maj de "gameActive"
      setGameActive(currentStatus === 1);
    }
  }, [gameState, sender]);

  // handleEndGameModal => ouvre la modal en fonction du winner/loser
  function handleEndGameModal(winner: string, loser: string, localUser: string | undefined, typeMessage: string) {
    if (!localUser) return;

    // Calcul du nouveau solde => user?.balance / 1e18
    const newBalance = user ? Number(user.balance) / 1e18 : 0;

    if (localUser === winner) {
      // Gagnant
      setEndGameTitle("Félicitations, vous avez gagné ! 🏆");
      setEndGameMessage(
        `Type de fin: ${typeMessage}\n\n` +
          `Vous recevez ${(Number(gameDetails.betAmount) * 2 * 0.75) / 1e18} CHESS\n\n` +
          `Votre nouveau solde : ${newBalance.toFixed(2)} CHESS`
      );
    } else if (localUser === loser) {
      // Perdant
      setEndGameTitle("Vous avez perdu !");
      setEndGameMessage("Dommage, réessayez une prochaine fois.");
    } else {
      // Observateur
      setEndGameTitle("La partie est terminée.");
      setEndGameMessage(`Type de fin : ${typeMessage}`);
    }
    setShowEndGameModal(true);
  }

  // Mise à jour de drawProposed
  useEffect(() => {
    if (typeof drawProposedFromSC === "boolean") {
      setDrawProposed(drawProposedFromSC);
    }
    if (proposerFromSC) {
      setProposer(proposerFromSC);
    }
  }, [drawProposedFromSC, proposerFromSC]);

  // Fonctions utilitaires pour générer / mettre à jour moves
  const generateValidMoves = () => {
    const dests = new Map();
    squares.forEach((square) => {
      const moves = chess.moves({ square: square as Square, verbose: true });
      if (moves.length > 0) {
        dests.set(
          square,
          moves.map((move) => move.to)
        );
      }
    });
    return dests;
  };

  const updateValidMoves = () => {
    const dests = generateValidMoves();
    setValidMoves(dests);
  };

  // Contrôle du tour => si c'est au localUser de jouer => showToast
  const handleTurnChange = () => {
    const turn = chess.turn();
    const isPlayerTurn =
      (turn === "w" && sender === gameDetails?.player1?.userAddress) ||
      (turn === "b" && sender === gameDetails?.player2?.userAddress);
    setShowToast(isPlayerTurn);
  };

  // Au montage => update moves
  useEffect(() => {
    updateValidMoves();
  }, []);

  // À chaque update de gameState => reconstruit le board local
  useEffect(() => {
    handleTurnChange();
    if (gameState && gameState[0].length > 0) {
      const moves = gameState[0];
      chess.reset();
      moves.forEach((encodedMove: number) => {
        const from = decodeSquare(encodedMove >> 6);
        const to = decodeSquare(encodedMove & 0x3f);
        chess.move({ from, to });
      });
      updateValidMoves();
    }
  }, [gameState]);

  // Jouer un coup => encode moves => write SC
  const handleMove = (orig: string, dest: string) => {
    if (!gameActiveFromSC) {
      setShowInactivePopup(true);
      return;
    }

    const move = chess.move({ from: orig, to: dest, promotion: "q" });
    if (move) {
      try {
        const moves = chess.history({ verbose: true });
        const encodedMoves = moves.map(({ from, to }) => encodeMove(from, to));
        writeChessTemplate("playMove", [encodedMoves], gameAddress as `0x${string}`);
        setShowToast(false);
      } catch (error) {
        console.error("Erreur lors de l'envoi du mouvement :", error);
      }
    } else {
      console.log("Mouvement invalide");
    }
  };

  // Abandon => status=3 => event "GameAbandoned"
  const handleAbandon = () => {
    try {
      writeChessTemplate("abandon", [], gameAddress as `0x${string}`);
    } catch (error) {
      console.error("Erreur lors de l'abandon :", error);
    }
  };

  const handleProposeDraw = () => {
    try {
      writeChessTemplate("proposeDraw", [], gameAddress as `0x${string}`);
      setDrawProposed(true);
    } catch (error) {
      console.error("Erreur lors de la proposition d'égalité :", error);
    }
  };

  const handleAcceptDraw = () => {
    try {
      writeChessTemplate("acceptDraw", [], gameAddress as `0x${string}`);
      setShowToast(false);
    } catch (error) {
      console.error("Erreur lors de l'acceptation d'égalité :", error);
    }
  };

  // Configuration Chessground
  const isPlayer1 = sender === gameDetails?.player1?.userAddress;
  const isPlayer2 = sender === gameDetails?.player2?.userAddress;
  const chessgroundConfig = {
    fen: chess.fen(),
    orientation: isPlayer1 ? "white" : "black",
    turnColor: chess.turn() === "w" ? "white" : "black",
    movable: {
      color: isPlayer1 ? "white" : isPlayer2 ? "black" : null,
      dests: validMoves,
      showDests: true,
      free: false,
    },
    events: {
      move: handleMove,
    },
  };

  return (
    <>
      {/* Modal de fin de partie (Gagnant / Perdant) */}
      {showEndGameModal && (
        <div className="modal modal-open">
          <div className="modal-box bg-primary text-white">
            <h3 className="font-bold text-lg whitespace-pre-line">{endGameTitle}</h3>
            <p className="py-4 whitespace-pre-line">{endGameMessage}</p>
            <div className="modal-action">
              <button
                className="btn bg-white text-primary hover:bg-gray-200"
                onClick={() => setShowEndGameModal(false)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal si le jeu est inactif */}
      {showInactivePopup && (
        <div className="modal modal-open">
          <div className="modal-box bg-primary text-white">
            <h3 className="font-bold text-lg">Le jeu est inactif</h3>
            <p className="py-4">Impossible de jouer car le jeu est terminé ou abandonné.</p>
            <div className="modal-action">
              <button
                className="btn bg-white text-primary hover:bg-gray-200"
                onClick={() => setShowInactivePopup(false)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Barre info du joueur */}
      <div className="flex justify-between flex-row">
        <div>
          <p>Pseudo : {user?.pseudo}</p>
          <p>Balance : {Number(user?.balance) / 1e18} ChessToken</p>
        </div>
      </div>

      {/* Section principale */}
      <div className="flex items-center justify-center">
        <div className="flex flex-col space-y-8 mr-4">
          <Image
            src="/images/game_board/arrow_left_black.png"
            alt="arrow left black to return home"
            width={30}
            height={30}
          />
          <h2 className="text-[#38B6FF] font-bold">Partie en cours</h2>
          {isLoading ? (
            <p>Chargement des détails de la partie...</p>
          ) : (
            <div>
              <p className="font-bold">
                {gameDetails.player1.pseudo} (Blancs) / {gameDetails.player2.pseudo} (Noirs)
              </p>
              <p className="font-bold">Récompense</p>
              <div className="flex flex-row">
                <p className="mr-2">{(Number(gameDetails.betAmount) * 2 * 0.75) / 1e18} CHESS</p>
                <Image src="/images/game_board/award.png" alt="award icon" width={24} height={24} />
              </div>
            </div>
          )}
        </div>

        {/* Plateau d'échecs */}
        <div className="flex flex-col items-center justify-center w-1/3 space-y-4">
          {showToast && gameActive && (
            <div className="toast">
              <div className="alert bg-primary text-white">
                <span>À toi de jouer !</span>
              </div>
            </div>
          )}
          <Chessground width={600} height={600} config={chessgroundConfig} />
        </div>

        {/* Boutons d'actions (nulle, abandon) */}
        <div className="flex flex-col space-y-8 ml-4">
          <button
            className={`btn btn-wide ${drawProposed && proposer !== sender ? "btn-success" : "btn-primary"}`}
            onClick={() => {
              if (drawProposed && proposer !== sender) {
                handleAcceptDraw();
              } else if (!drawProposed) {
                handleProposeDraw();
              }
            }}
            disabled={!gameActive || (drawProposed && proposer === sender)}
          >
            {drawProposed && proposer !== sender
              ? "Accepter le match nul"
              : drawProposed && proposer === sender
              ? "Match nul (en attente)"
              : "Match nul"}
          </button>

          <button className="btn btn-error btn-wide" onClick={handleAbandon} disabled={!gameActive || drawProposed}>
            Abandonner
          </button>
        </div>
      </div>
    </>
  );
}
