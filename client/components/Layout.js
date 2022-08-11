import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Home.module.css";

const Layout = ({ children }) => {
  return (
    <div className="mainContent">
      <main className="px-2 pb-12">{children}</main>
    </div>
  );
};

export default Layout;
