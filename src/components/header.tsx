"use client";
import { constants } from "@/constants";
import { useApp } from "@/providers/app";
import { useWallet } from "@mintbase-js/react";
import { usePathname, useRouter } from "next/navigation";
import InlineSVG from "react-inlinesvg";
import Link from 'next/link'

const Header = () => {
  const pathname = usePathname();
  const { isConnected } = useWallet();
  const { push } = useRouter();
  const { openModal } = useApp();

  const { isClosed } = constants;

  return (
    <>
      <header className="fixed left-0 top-0 flex w-full justify-center h-12 bg-primary text-headerText">
        <div className="flex w-full justify-between px-4 lg:px-12 items-center">
          <button className="h-8 w-8 text-headerText" onClick={() => push('/')}>
            <InlineSVG
              src="/images/arrow_back.svg"
              className="fill-current text-headerText"
            />
          </button>
          <div className="flex gap-4 items-center">
            <Link
              className={`link ${pathname === '/store' ? 'active font-semibold' : ''}`}
              href="/store"
            >
              Store
            </Link>
            <Link
              className={`link ${pathname === '/lib' ? 'active font-semibold' : ''}`}
              href="/lib"
            >
              My Books
            </Link>
            <Link
              className={`link ${pathname === '/publish' ? 'active font-semibold' : ''}`}
              href="/publish"
            >
              Publish
            </Link>
            <button className="border px-2 py-1 rounded-full" onClick={() => openModal("default")}>
              {isConnected ? "Connected" : "Connect Wallet"}
            </button>
          </div>
        </div>
      </header>
      {isClosed ? (
        <div className="text-center text-mainText w-full absolute m-auto left-0 right-0 notify text-sm font-sans">
          Minting is closed. Thanks to everyone who participated.
        </div>
      ) : null}
    </>
  );
};

export default Header;
