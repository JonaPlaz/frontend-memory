"use client";
import { useReadContract, useWriteContract, useWatchContractEvent, useAccount } from "wagmi";
import { CONTRACT_ABI as ChessFactoryABI, CONTRACT_ADDRESS as ChessFactoryAddress } from "@/contracts/ChessFactory";
import { CONTRACT_ABI as ChessTemplateABI } from "@/contracts/ChessTemplate";

export const useChessFactory = () => {
  const { address } = useAccount();

  const readChessFactory = <T = unknown>(functionName: string, args: any[] = []) => {
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

  const writeChessFactory = (functionName: string, args: any[], value: string = "0") => {
    writeContract({
      address: ChessFactoryAddress,
      abi: ChessFactoryABI,
      functionName,
      args,
      account: address,
      value: BigInt(value),
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

  const readChessTemplate = <T>(functionName: string, args: any[], cloneAddress: `0x${string}`) => {
    const { data, isLoading, isError, refetch } = useReadContract({
      address: cloneAddress,
      abi: ChessTemplateABI,
      functionName,
      args,
    });
  
    return { data: data as T, isLoading, isError, refetch };
  };
  

  const { writeContract } = useWriteContract();

  const writeChessTemplate = (functionName: string, args: any[], cloneAddress: `0x${string}`) => {
    return writeContract({
      address: cloneAddress,
      abi: ChessTemplateABI,
      functionName,
      args,
      account: address,
    });
  };

  const watchChessTemplateEvent = (eventName: string, onLogs: () => void, cloneAddress: `0x${string}`) => {
    useWatchContractEvent({
      address: cloneAddress,
      abi: ChessTemplateABI,
      eventName,
      onLogs,
    });
  };

  return { readChessTemplate, writeChessTemplate, watchChessTemplateEvent };
};
