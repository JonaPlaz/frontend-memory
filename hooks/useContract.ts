"use client";
import { useReadContract, useWriteContract, useWatchContractEvent, useAccount } from "wagmi";
import { CONTRACT_ABI as ChessFactoryABI, CONTRACT_ADDRESS as ChessFactoryAddress } from "@/contracts/ChessFactory";
import { CONTRACT_ABI as ChessTemplateABI, CONTRACT_ADDRESS as ChessTemplateAddress } from "@/contracts/ChessTemplate";

export const useChessFactory = () => {
  const { address } = useAccount();

  const useReadChessFactory = <T = unknown>(functionName: string, args: any[] = []) => {
    const { data, isLoading, isError, refetch } = useReadContract({
      address: ChessFactoryAddress,
      abi: ChessFactoryABI,
      functionName,
      args,
      account: address,
    });

    return { data: data as T, isLoading, isError, refetch };
  };

  const { writeContract } = useWriteContract();

  const useWriteChessFactory = (functionName: string, args: any[]) => {
    writeContract({
      address: ChessFactoryAddress,
      abi: ChessFactoryABI,
      functionName,
      args,
      account: address,
    });
  };

  const useWatchChessFactoryEvent = (eventName: string, onLogs: () => void) => {
    useWatchContractEvent({
      address: ChessFactoryAddress,
      abi: ChessFactoryABI,
      eventName,
      onLogs,
    });
  };

  return { useReadChessFactory, useWriteChessFactory, useWatchChessFactoryEvent };
};

export const useChessTemplate = () => {
  const { address } = useAccount();

  const useReadChessTemplate = (functionName: string, args: any[]) => {
    const { data, isLoading, isError } = useReadContract({
      address: ChessTemplateAddress,
      abi: ChessTemplateABI,
      functionName,
      args,
      account: address,
    });

    return { data, isLoading, isError };
  };

  const { writeContract } = useWriteContract();

  const useWriteChessTemplate = (functionName: string, args: any[]) => {
    writeContract({
      address: ChessTemplateAddress,
      abi: ChessTemplateABI,
      functionName,
      args,
      account: address,
    });
  };

  return { useReadChessTemplate, useWriteChessTemplate };
};
