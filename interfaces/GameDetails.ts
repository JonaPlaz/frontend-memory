import { User } from "@/interfaces/User";

export interface GameDetails {
  betAmount: number;
  gameAddress: bigint;
  player1: User;
  player2: User;
  startTime: bigint;
}
