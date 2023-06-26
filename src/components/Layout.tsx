import { type ReactNode } from "react";
import Navbar from "./home/Navbar";
import Footer from "./home/Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
