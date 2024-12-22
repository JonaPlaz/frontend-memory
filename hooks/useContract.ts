"use client";
import { useReadContract, useWriteContract, useWatchContractEvent, useAccount } from "wagmi";
import { CONTRACT_ABI as ChessFactoryABI, CONTRACT_ADDRESS as ChessFactoryAddress } from "@/contracts/ChessFactory";
import { CONTRACT_ABI as ChessTemplateABI } from "@/contracts/ChessTemplate";

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

  const useReadChessTemplate = (functionName: string, args: any[], cloneAddress: `0x${string}`) => {
    const { data, isLoading, isError, refetch } = useReadContract({
      address: cloneAddress,
      abi: ChessTemplateABI,
      functionName,
      args,
      account: address,
    });

    return { data, isLoading, isError, refetch };
  };

  const { writeContract } = useWriteContract();

  const useWriteChessTemplate = (functionName: string, args: any[], cloneAddress: `0x${string}`) => {
    return writeContract({
      address: cloneAddress,
      abi: ChessTemplateABI,
      functionName,
      args,
      account: address,
    });
  };

  const useWatchChessTemplateEvent = (eventName: string, onLogs: () => void, cloneAddress: `0x${string}`) => {
    useWatchContractEvent({
      address: cloneAddress,
      abi: ChessTemplateABI,
      eventName,
      onLogs,
    });
  };

  return { useReadChessTemplate, useWriteChessTemplate, useWatchChessTemplateEvent };
};
