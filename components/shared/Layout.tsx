import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="mx-8">{children}</main>
    </div>
  );
};

export default Layout;