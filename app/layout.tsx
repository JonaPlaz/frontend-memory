import Layout from "@/components/shared/Layout";
import './globals.css';
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

import RainbowKitAndWagmi from "@/components/RainbowKitAndWagmi/RainbowKitAndWagmi";

export const metadata = {
  title: "Chess To Earn",
  description: "Web3 Chess Game",
};

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RainbowKitAndWagmi>
          <Layout>{children}</Layout>
        </RainbowKitAndWagmi>
      </body>
    </html>
  );
}
