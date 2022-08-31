import { useEffect, useState } from "react";
import Link from "next/link";
import logo from "../public/icons/metag_logo.svg"
import Image from "next/image";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import providerOptionsObject from '../providerOptions';
import UNSD from "./UNSD/index";


function Navbar() {

  const connectWallet = async () => {
    let providerOptions = providerOptionsObject.providerOptions;
    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: false, // optional
      providerOptions // required
    });
    
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
}


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
          Connect Wallet
        </button>
      </div>
    </header>
  );
}

export default Navbar;
