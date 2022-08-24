import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Logo from "./Generic/Logo";

const Layout = ({ children }) => {
  return (
    <div className="docsContent">
      <main className="pt-12 pb-12">
        <a href="/" className="hover:text-indigo-600">
          <Logo className="w-8 mx-auto mb-12" />
        </a>
        {children}
      </main>
    </div>
  );
};

export default Layout;
