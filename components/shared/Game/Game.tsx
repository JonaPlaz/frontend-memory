"use client";
import React, { PureComponent } from "react";
import Image from "next/image";

export class Game extends PureComponent {
  render() {
    return (
      <>
        <div className="flex border-2 border-[#38B6FF]">
          <Image src="/images/logo/logo_white_bg_blue.png" alt="Logo white Chess to earn" width={200} height={200} />
          <div className="mx-8 my-2 flex-grow">
            <div className="flex flex-row justify-between w-full">
              <h2 className="font-bold">
                Player1 / <span>Player2</span>
              </h2>
              <p>001</p>
            </div>
            <div className="flex flex-row justify-between w-2/5 mt-4">
              <div>
                <p>Début de la partie</p>
                <p>01/11/2024 - 21h00</p>
              </div>
              <div>
                <p>Frais d'inscription</p>
                <p>10 CHESS</p>
              </div>
              <div>
                <p>Récompense</p>
                <div className="flex flex-row">
                  <p className="mr-2">19 CHESS</p>
                  <Image src="/images/game/award.png" alt="award icon" width={24} height={24} />
                </div>
              </div>
            </div>
            <button className="btn btn-primary btn-wide mt-6">Voir</button>
          </div>
        </div>
        <div className="flex border-2 border-[#38B6FF] mt-8">
          <Image src="/images/logo/logo_white_bg_blue.png" alt="Logo white Chess to earn" width={200} height={200} />
          <div className="mx-8 my-2 flex-grow">
            <div className="flex flex-row justify-between w-full">
              <h2 className="font-bold">
                Player1 / <span>---</span>
              </h2>
              <p>002</p>
            </div>
            <div className="flex flex-row justify-between w-2/5 mt-4">
              <div>
                <p>Début de la partie</p>
                <p>10/11/2024 - 19h00</p>
              </div>
              <div>
                <p>Frais d'inscription</p>
                <p>20 CHESS</p>
              </div>
              <div>
                <p>Récompense</p>
                <div className="flex flex-row">
                  <p className="mr-2">38 CHESS</p>
                  <Image src="/images/game/award.png" alt="award icon" width={24} height={24} />
                </div>
              </div>
            </div>
            <button className="btn btn-primary btn-wide mt-6">Voir</button>
          </div>
        </div>
      </>
    );
  }
}

export default Game;
