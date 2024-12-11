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

  const {
    data: chessUser
  } = useReadContract({
    address: ChessFactoryAddress,
    abi: ChessFactoryABI,
    functionName: "getUser",
    account: address,
  });

  const readChessFactory = (functionName: string, args: any[]) => {
    const { data, error, isLoading } = useReadContract({
      address: ChessFactoryAddress,
      abi: ChessFactoryABI,
      functionName,
      args,
    });
  
    return { data, error, isLoading };
  };



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

  return { chessUser, chessUsers, isLoading, isError, readChessFactory, writeChessFactory };
};

export const useChessTemplate = () => {
  const chessTemplate = useReadContract({
    address: ChessTemplateAddress,
    abi: ChessTemplateABI,
  });

  return chessTemplate;
};
