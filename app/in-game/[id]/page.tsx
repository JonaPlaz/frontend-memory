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
  // modifier les récompenses : récupérer les infos de la blockchain
  // vérifier que la partie est active dans la blockchain pour permettre de jouer, sinon on affiche une popin
  // si décalage on met un loader

  // 1 - Abandon - popin winner et popin loser - premier chargement de la popin à l'event ou à l'état du status mais pas au click
  // 2 - Draw - popin pour le proposant et le disposant - impossible de playMove si accepté - plateforme 10% du pot et chq joueur 45% du pot
  // 3 - victoire de l'opposant si on a pas joué depuis 24h (5 minutes pour les tests) - popin winner et popin loser - impossible de playMove
  // 4 - echet et mat

  // 5 - flèche retour home : faire le lien

  const { address: sender } = useAccount();

  const [showInactivePopup, setShowInactivePopup] = useState(false);

  const [chess] = useState(new Chess());
  const [validMoves, setValidMoves] = useState(new Map());

  const [gameActive, setGameActive] = useState<boolean>(false);

  const [showToast, setShowToast] = useState(false);
  const [showWinnerPopup, setShowWinnerPopup] = useState(false);
  const [showLoserPopup, setShowLoserPopup] = useState(false);

  const [drawProposed, setDrawProposed] = useState(false);
  const [proposer, setProposer] = useState<string | null>(null);

  const { useReadChessFactory } = useChessFactory();
  const { useReadChessTemplate, useWriteChessTemplate, useWatchChessTemplateEvent } = useChessTemplate();

  const params = useParams();
  const gameAddress = params.id;

  const { data: gameDetails, isLoading } = useReadChessFactory<GameDetails>("getGameDetails", [gameAddress]);
  const { data: user, refetch } = useReadChessFactory<User>("getUser");

  const { data: gameActiveFromSC } = useReadChessTemplate("isGameActive", [], gameAddress as `0x${string}`);
  const { data: gameState } = useReadChessTemplate("getGameState", [], gameAddress as `0x${string}`);

  const { data: drawProposedFromSC } = useReadChessTemplate("drawProposed", [], gameAddress as `0x${string}`);
  const { data: proposerFromSC } = useReadChessTemplate("proposer", [], gameAddress as `0x${string}`);

  useEffect(() => {
    if (typeof gameActiveFromSC === "boolean") {
      setGameActive(gameActiveFromSC);
    }
  }, [gameActiveFromSC]);

  useWatchChessTemplateEvent(
    "MovePlayed",
    () => {
      refetch();
    },
    gameAddress as `0x${string}`
  );

  useWatchChessTemplateEvent(
    "GameAbandoned",
    () => {
      refetch();
      if (gameState) {
        const [moves, outcome, currentStatus, winner, loser] = gameState;

        // Gérer les pop-ups en fonction du statut
        if (currentStatus === 2) {
          // Abandoned
          if (sender === winner) {
            setShowWinnerPopup(true);
          } else if (sender === loser) {
            setShowLoserPopup(true);
          }
        } else if (currentStatus === 3) {
          // Ended
          if (sender === winner) {
            setShowWinnerPopup(true);
          } else {
            setShowLoserPopup(true);
          }
        }

        // Met à jour l'état actif du jeu
        setGameActive(currentStatus === 1);
      }
    },
    gameAddress as `0x${string}`
  );

  useWatchChessTemplateEvent(
    "GameEnded",
    () => {
      console.log("La partie est terminée !");
    },
    gameAddress as `0x${string}`
  );

  const isPlayer1 = sender === gameDetails?.player1?.userAddress;
  const isPlayer2 = sender === gameDetails?.player2?.userAddress;

  const handleTurnChange = () => {
    const turn = chess.turn();
    const isPlayerTurn = (turn === "w" && isPlayer1) || (turn === "b" && isPlayer2);
    setShowToast(isPlayerTurn);
  };

  useEffect(() => {
    updateValidMoves();
  }, []);

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

  useEffect(() => {
    if (gameState) {
      const [moves, outcome, currentStatus, winner, loser] = gameState;

      // Gérer les pop-ups en fonction du statut
      if (currentStatus === 2) {
        // Abandoned
        if (sender === winner) {
          setShowWinnerPopup(true);
        } else if (sender === loser) {
          setShowLoserPopup(true);
        }
      } else if (currentStatus === 3) {
        // Ended
        if (sender === winner) {
          setShowWinnerPopup(true);
        } else {
          setShowLoserPopup(true);
        }
      }
      setGameActive(gameActiveFromSC);
    }
  }, [gameState, sender]);

  useEffect(() => {
    if (typeof drawProposedFromSC === "boolean") {
      setDrawProposed(drawProposedFromSC);
    }
    if (proposerFromSC) {
      setProposer(proposerFromSC);
    }
  }, [drawProposedFromSC, proposerFromSC]);

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
        useWriteChessTemplate("playMove", [encodedMoves], gameAddress as `0x${string}`);
        setShowToast(false);
      } catch (error) {
        console.error("Erreur lors de l'envoi du mouvement :", (error as any).message);
      }
    } else {
      console.log("Mouvement invalide");
    }
  };

  const handleAbandon = () => {
    try {
      useWriteChessTemplate("abandon", [], gameAddress as `0x${string}`);
      setShowLoserPopup(true);
    } catch (error) {
      console.error("Erreur lors de l'abandon :", (error as any).message);
    }
  };

  const handleProposeDraw = () => {
    try {
      useWriteChessTemplate("proposeDraw", [], gameAddress as `0x${string}`);
      setDrawProposed(true);
    } catch (error) {
      console.error("Erreur lors de la proposition d'égalité :", error);
    }
  };

  const handleAcceptDraw = () => {
    try {
      useWriteChessTemplate("acceptDraw", [], gameAddress as `0x${string}`);
      setShowToast(false);
    } catch (error) {
      console.error("Erreur lors de l'acceptation d'égalité :", error);
    }
  };

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
      {showWinnerPopup && (
        <div className="modal modal-open">
          <div className="modal-box bg-primary text-white">
            <h3 className="font-bold text-lg">Félicitations, vous avez gagné !</h3>
            <p className="py-4">Votre adversaire a abandonné.</p>
            <div className="modal-action">
              <button className="btn bg-white text-primary hover:bg-gray-200" onClick={() => setShowWinnerPopup(false)}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {showLoserPopup && (
        <div className="modal modal-open">
          <div className="modal-box bg-primary text-white">
            <h3 className="font-bold text-lg">Vous avez abandonné...</h3>
            <p className="py-4">Votre adversaire remporte la partie.</p>
            <div className="modal-action">
              <button className="btn bg-white text-primary hover:bg-gray-200" onClick={() => setShowLoserPopup(false)}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {drawProposed && proposer === sender && <p>Vous avez proposé un match nul. Attente de réponse...</p>}

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

      <div className="flex justify-between flex-row">
        <div>
          <p>Pseudo : {user?.pseudo}</p>
          <p>Balance : {Number(user?.balance) / 10 ** 18} ChessToken</p>
        </div>
      </div>
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
                <p className="mr-2">
                  {(Number(gameDetails.betAmount) * 2 - (Number(gameDetails.betAmount) * 2) / 20) / 1e18} CHESS
                </p>
                <Image src="/images/game_board/award.png" alt="award icon" width={24} height={24} />
              </div>
            </div>
          )}
        </div>
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
        <div className="flex flex-col space-y-8 ml-4">
          <button
            className={`btn btn-wide ${drawProposed && proposer !== sender ? "btn-success" : "btn-primary"}`}
            onClick={() => {
              if (drawProposed && proposer !== sender) {
                handleAcceptDraw(); // L'autre joueur accepte
              } else if (!drawProposed) {
                handleProposeDraw(); // Le joueur propose
              }
            }}
            disabled={
              !gameActive || // Le jeu doit être actif
              (drawProposed && proposer === sender) // Désactivé pour le proposant
            }
          >
            {drawProposed && proposer !== sender
              ? "Accepter le match nul" // Affiché pour l'autre joueur
              : drawProposed && proposer === sender
              ? "Match nul (en attente)" // Affiché pour le proposant
              : "Match nul"}{" "}
          </button>
          <button
            className="btn btn-error btn-wide"
            onClick={handleAbandon}
            disabled={!gameActive || drawProposed} // Désactivé si le jeu est inactif ou si une égalité est en attente
          >
            Abandonner
          </button>
        </div>
      </div>
    </>
  );
}
