'use client';
import '@rainbow-me/rainbowkit/styles.css';
// @ts-expect-error: Module 'lodash.merge' lacks type definitions
import merge from 'lodash.merge';
import {
    getDefaultConfig,
    RainbowKitProvider,
    lightTheme,
    Theme,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { holesky } from '@/utils/holesky';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Chaîne personnalisée avec le bon chainId
// const customLocalhost = {
//     id: 31337, // Le chainId attendu par votre nœud Hardhat
//     name: "Hardhat Local",
//     network: "hardhat",
//     nativeCurrency: {
//         name: "Ether",
//         symbol: "ETH",
//         decimals: 18,
//     },
//     rpcUrls: {
//         default: {
//             http: ["http://127.0.0.1:8545"],
//         },
//     },
//     blockExplorers: {
//         default: { name: "None", url: "" },
//     },
//     testnet: true,
// };

  const myCustomTheme = merge(lightTheme(), {
    colors: {
      accentColor: '#38B6FF',
    },
  } as Theme);

const config = getDefaultConfig({
    appName: 'Chess To Earn',
    projectId: 'd9e9f4694f87803a5a2e1769aaeab1b2',
    chains: [holesky],
    ssr: true,
});

const queryClient = new QueryClient();

const CustomRainbowKitProvider = ({ children }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={myCustomTheme}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};

export default CustomRainbowKitProvider;
