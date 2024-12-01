'use client';
import { useReadContract } from "wagmi";
import { CONTRACT_ABI as ChessFactoryABI, CONTRACT_ADDRESS as ChessFactoryAddress } from "@/contracts/ChessFactory";
import { CONTRACT_ABI as ChessTemplateABI, CONTRACT_ADDRESS as ChessTemplateAddress } from "@/contracts/ChessTemplate";

export const useChessFactory = () => {
  const chessFactory = useReadContract({
    address: ChessFactoryAddress,
    abi: ChessFactoryABI,
  });

  return chessFactory;
};

export const useChessTemplate = () => {
  const chessTemplate = useReadContract({
    address: ChessTemplateAddress,
    abi: ChessTemplateABI,
  });

  return chessTemplate;
};
