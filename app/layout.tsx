import Layout from "@/components/shared/Layout";
import './globals.css';

import RainbowKitAndWagmi from "@/components/RainbowKitAndWagmi/RainbowKitAndWagmi";

export const metadata = {
  title: "Chess To Earn",
  description: "Web3 Chess Game",
};

export default function RootLayout({ children }) {
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
