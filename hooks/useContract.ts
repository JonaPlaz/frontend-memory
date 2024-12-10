"use client";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { CONTRACT_ABI as ChessFactoryABI, CONTRACT_ADDRESS as ChessFactoryAddress } from "@/contracts/ChessFactory";
import { CONTRACT_ABI as ChessTemplateABI, CONTRACT_ADDRESS as ChessTemplateAddress } from "@/contracts/ChessTemplate";

export const useChessFactory = () => {
  const { address } = useAccount();

  const {
    data: chessUsers,
    isLoading,
    isError,
  } = useReadContract({
    address: ChessFactoryAddress,
    abi: ChessFactoryABI,
    functionName: "getAllUsers",
    account: address,
  });

  const { writeContract } = useWriteContract();

  const writeChessFactory = (functionName: string, args: any[]) => {
    writeContract({
      address: ChessFactoryAddress,
      abi: ChessFactoryABI,
      functionName,
      args,
      account: address,
    });
  };

  return { chessUsers, isLoading, isError, writeChessFactory };
};

export const useChessTemplate = () => {
  const chessTemplate = useReadContract({
    address: ChessTemplateAddress,
    abi: ChessTemplateABI,
  });

  return chessTemplate;
};
