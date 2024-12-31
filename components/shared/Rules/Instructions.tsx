"use client";

import React, { useState } from "react";

export default function Instructions() {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleToggle = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="relative">
      {!showInstructions && (
        <a
          onClick={handleToggle}
          className="text-[#38B6FF] mx-auto mt-4 cursor-pointer underline hover:text-[#2F9BD8] transition"
        >
          Comment ça marche ?
        </a>
      )}
      {showInstructions && (
        <div className="fixed inset-0 bg-white p-8 overflow-y-auto z-50">
          <h1 className="text-2xl font-bold mb-4">Comment ça marche ?</h1>
          <p className="text-left">
            Bienvenue sur Chess to Earn, la plateforme d&apos;échecs en ligne nouvelle génération, basée sur le Web 3.
            Découvrez comment vous inscrire, jouer et gagner grâce à notre système &quot;Play to Earn&quot; et notre
            token natif CHESS.
          </p>
          <h2 className="mt-6 font-bold">1. Inscription et connexion</h2>
          <p className="text-left">
            Pour rejoindre Chess to Earn, connectez simplement votre wallet Web 3 préféré (Metamask, Coinbase, Rainbow,
            etc.). Lors de votre inscription, nous vous offrons 1000 CHESS pour commencer vos premières parties.
          </p>
          <h2 className="mt-6 font-bold">3. Fonctionnement des parties</h2>
          <p className="text-left">
            <strong>Participation et mise en jeu :</strong>
            <br />
            Frais d&apos;inscription : Chaque joueur paie des frais en CHESS pour participer à une partie. Par exemple,
            pour une partie à 1000 CHESS par joueur, un total de 2000 CHESS est en jeu.
          </p>
          <ul className="list-disc pl-6">
            <li>Répartition des gains : Le vainqueur remporte 1500 CHESS.</li>
            <li>500 CHESS sont prélevés par la plateforme pour couvrir les frais de fonctionnement.</li>
            <li>
              En cas d&apos;égalité : La somme totale en jeu est divisée équitablement entre les deux joueurs - les
              frais de la plateforme.
            </li>
          </ul>
          <h2 className="mt-6 font-bold">Temps de réflexion</h2>
          <p className="text-left">
            Chaque joueur dispose d&apos;un délai maximum de 2 heures pour jouer son coup. Si un joueur dépasse ce
            délai, il perd automatiquement la partie, et son adversaire est déclaré vainqueur.
          </p>
          <h2 className="mt-6 font-bold">Options en cours de partie :</h2>
          <ul className="list-disc pl-6">
            <li>
              <strong>Proposer un match nul :</strong> Un joueur peut proposer un match nul en cliquant sur &quot;Match
              nul&quot;. Si l’autre joueur accepte, la partie est déclarée nulle, et les gains sont partagés.
            </li>
            <li>
              <strong>Abandonner :</strong> Un joueur peut abandonner à tout moment en cliquant sur
              &quot;Abandonner&quot;. Dans ce cas, l’autre joueur est déclaré vainqueur et remporte les gains.
            </li>
          </ul>
          <p className="text-left">
            Prêt à jouer ? Connectez votre wallet, inscrivez-vous à une partie et défiez des joueurs du monde entier sur
            Chess to Earn ! ♟️
          </p>
          <button onClick={handleToggle} className="btn btn-primary mt-8">
            Retour
          </button>
        </div>
      )}
    </div>
  );
}
