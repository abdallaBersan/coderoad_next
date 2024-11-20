"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import Menu from "./Menu";

const Header = () => {
  return (
    <header>
      <nav>
          <div>
            <Link href="/">
              <Image src="/images/logo-coderoad.png" alt="Logo" className="h-10" width={50} height={50} />
              <h1>Coderoad</h1>
            </Link>
          </div>

          <Menu />
      </nav>
    </header>
  );
};

export default Header;
