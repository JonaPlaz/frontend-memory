"use client";
import { useReadContract, useWriteContract, useWatchContractEvent, useAccount } from "wagmi";
import { CONTRACT_ABI as ChessFactoryABI, CONTRACT_ADDRESS as ChessFactoryAddress } from "@/contracts/ChessFactory";
import { CONTRACT_ABI as ChessTemplateABI, CONTRACT_ADDRESS as ChessTemplateAddress } from "@/contracts/ChessTemplate";

export const useChessFactory = () => {
  const { address } = useAccount();

  const readChessFactory = (functionName: string, args: any[] = []) => {
    const { data, isLoading, isError, refetch } = useReadContract({
      address: ChessFactoryAddress,
      abi: ChessFactoryABI,
      functionName,
      args,
    });

    return { data, isLoading, isError, refetch };
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

  const watchChessFactoryEvent = (eventName: string, onLogs: () => void) => {
    useWatchContractEvent({
      address: ChessFactoryAddress,
      abi: ChessFactoryABI,
      eventName,
      onLogs,
    });
  };

  return { readChessFactory, writeChessFactory, watchChessFactoryEvent };
};

export const useChessTemplate = () => {
  const { address } = useAccount();

  const readChessTemplate = (functionName: string, args: any[]) => {
    const { data, isLoading, isError } = useReadContract({
      address: ChessTemplateAddress,
      abi: ChessTemplateABI,
      functionName,
      args,
    });

    return { data, isLoading, isError };
  };

  const { writeContract } = useWriteContract();

  const writeChessTemplate = (functionName: string, args: any[]) => {
    writeContract({
      address: ChessTemplateAddress,
      abi: ChessTemplateABI,
      functionName,
      args,
      account: address,
    });
  };

  return { readChessTemplate, writeChessTemplate };
};
