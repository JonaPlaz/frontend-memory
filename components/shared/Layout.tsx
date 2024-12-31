import Header from "./Header";

import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <main className="mx-8">{children}</main>
    </div>
  );
};

export default Layout;