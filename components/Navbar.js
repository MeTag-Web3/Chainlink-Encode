import { useEffect, useState } from "react";
import Link from "next/link";
import logo from "../public/icons/metag_logo.svg";
import Image from "next/image";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import providerOptionsObject from "../providerOptions";
import UNSD from "./UNSD/index";

function Navbar() {
  const [walletAddress, setWalletAddress] = useState(null);
  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setWalletAddress(address);
    console.log("Account:", await signer.getAddress());
  };

  return (
    <header className="flex flex-wrap justify-center items-center sticky top-0 bg-transparent backdrop-blur-lg z-[99] transition duration-200 py-0.5 px-16">
      <div className="flex mr-auto py-2 pl-6">
        <Link href="/">
          <a className="flex mr-auto hover:bg-[#dbd5d533] ease-in transition duration-700 px-2 py-1 border-0 rounded-xl">
            <Link href="https://www.getmetag.io/">
              <Image src={logo} alt="metag_logo" />
            </Link>
          </a>
        </Link>
      </div>

      <div className="items-end flex flex-row space-x-5">
        <UNSD />
        <button
          onClick={connectWallet}
          className="tetiary-1 font-roboto  text-white"
        >
          {walletAddress === null
            ? "Connect Wallet"
            : `${walletAddress.slice(0, 11)}...`}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
