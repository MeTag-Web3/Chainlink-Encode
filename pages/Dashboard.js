import Image from "next/image";
import metamask from "../public/icons/metamask.svg";
import portis from "../public/icons/portis.svg";
import binance from "../public/icons/binance.svg";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import tooltip from "../public/icons/tooltip.svg"
import providerOptionsObject from '../providerOptions';
import { useState } from "react";
import twitter from "../public/icons/twitter.svg";
import discord from "../public/icons/discord.svg";
import telegram from "../public/icons/telegram.svg";
import logo from "../public/icons/metag_logo.svg";
import Gradient from "../components/Gradient";
import axios from "axios";
import Link from "next/link";
import React from "react";


function Dashboard() {


  // const [image, setImage] = useState("");
  const inputRef = React.useRef(null);
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");


  const handleInputChange = (e) => {
    const val = e.target.value;
    setUserName(val);
  };
    const handleValueChange = (e) => {
      const val = e.target.value;
      setDescription(val);
    };

  const [metamaskAccount, setMetamaskAccount] = useState("");
  const [binanceAccount, setBinanceAccount] = useState("");
  const [portisAccount, setPortisAccount] = useState("");
  const [imgUrl, setimgUrl] = useState("");
  
  const connectWallet = async (event) => {
    
    let injectedProvider;
    let providerOptions;

    if (event.target.name == 'metamask') {
      providerOptions = providerOptionsObject.metamask;
      injectedProvider = false;
    }
    if (event.target.name == 'portis') {
      providerOptions = providerOptionsObject.portis;
      injectedProvider = true;
    }
    if (event.target.name == 'binance') {
     providerOptions = providerOptionsObject.binance;
     injectedProvider = true;
    }

    const web3Modal = new Web3Modal({
      cacheProvider: false, // optional
      disableInjectedProvider: injectedProvider,
      providerOptions
    });

    await web3Modal.clearCachedProvider();

    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      if (event.target.name == 'metamask') {
        setMetamaskAccount(accounts[0]);
      }
      if (event.target.name == 'binance') {
        setBinanceAccount(accounts[0]);
      }
      if (event.target.name == 'portis') {
        setPortisAccount(accounts[0]);
      }

      provider.on("accountsChanged", (accounts) => {
        if (event.target.name == 'metamask') {
          setMetamaskAccount(accounts[0]);
         }
         if (event.target.name == 'binance') {
          setBinanceAccount(accounts[0]);
         }
         if (event.target.name == 'portis') {
          setPortisAccount(accounts[0]);
         }
      });
    }
      catch (error) {
        console.log('error', error);
    }
  }
  
  

  const onSubmit = async (params) => {
    
    const form = new FormData();
    console.log(inputRef)
    form.append("file", inputRef.current.files[0]);

    const options = {
      method: "POST",
      body: form,
      headers: {
        Authorization: "0f9b00bf-73e0-4c0c-8691-06e70948d2b6",
      },
    };

await fetch("https://api.nftport.xyz/v0/files", options)
  .then(response => {
    return response.json()
  })
  .then(responseJson => {
    // Handle the response
    console.log(responseJson);
    console.log(responseJson.ipfs_url);

    setimgUrl(responseJson.ipfs_url);
    
    // const { ipfs_url } = responseJson;
    // document.getElementById('image').textContent = image;
    
  })

    
   await fetch(
      "https://api.nftport.xyz/v0/mints/easy/files?" +
        new URLSearchParams({
          chain: "polygon",
          name: userName,
          description: description,
          mint_to_address: metamaskAccount,
        }),
      options
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (responseJson) {
        // Handle the response
        console.log(responseJson);
      });
  }


  return (
    <>
      <Gradient />
      <div className="text-[#F8FAFC] text-[24px] px-24 pb-6 pt-10 font-roboto font-bold relative">
        Admin Dashboard
      </div>
      <div className="flex flex-col px-24 relative">
        <div className=" bg-[#0f172a4d] rounded-3xl p-7">
          <div className="flex flex-col ">
            <h4>Crypto Accounts</h4>
            <h5 className="text-[#94A3B8] font-normal">
              Attach your wallet address
            </h5>
            <div className="flex  items-center mt-8 justify-between">
              <div className="flex">
                <Image src={metamask} alt="wallet_logo" />
                <h6 className="pl-3 pr-2 font-medium">Metamask</h6>
                <Image src={tooltip} alt="info" />
              </div>
              <input
                type="text"
                placeholder="Press Connect..."
                className="border-[#334155] border bg-[#1E293B] rounded-lg text-[#DBEAFE] py-2 px-10 w-[600px]"
                value={metamaskAccount}
              />
              <button
                className=" font-roboto  border px-[60px] py-2 border-[#6633FF] hover:bg-[#6633FF]"
                onClick={connectWallet}
                name="metamask"
              >
                Connect
              </button>
            </div>
            <div className="flex  items-center justify-between mt-10">
              <div className="flex">
                <Image src={portis} alt="wallet_logo" />
                <h6 className="pl-3 pr-2 font-medium">Portis Wallet</h6>
                <Image src={tooltip} alt="info" />
              </div>
              <input
                type="text"
                placeholder="Press Connect..."
                className="border-[#334155] border bg-[#1E293B] rounded-lg text-[#DBEAFE] py-2 px-10 w-[600px]"
                value={portisAccount}
              />
              <button
                className="font-roboto  border px-[60px] py-2 border-[#6633FF] hover:bg-[#6633FF]"
                onClick={connectWallet}
                name="portis"
              >
                Connect
              </button>
            </div>
            <div className="flex  items-center justify-between mt-10 mb-10">
              <div className="flex">
                <Image src={binance} alt="wallet_logo" />
                <h6 className="pl-3 pr-2 font-medium">Binance Wallet</h6>
                <Image src={tooltip} alt="info" />
              </div>
              <input
                type="text"
                placeholder="Press Connect..."
                className="border-[#334155] border bg-[#1E293B] rounded-lg text-[#DBEAFE] py-2 px-10 w-[600px]"
                value={binanceAccount}
              />
              <button
                className="font-roboto  border px-[60px] py-2 border-[#6633FF] hover:bg-[#6633FF]"
                onClick={connectWallet}
                name="binance"
              >
                Connect
              </button>
            </div>
          </div>
          <button className="font-roboto  border px-[60px] py-2 border-[#6633FF] hover:bg-[#6633FF]">
            Add New Wallet
          </button>
        </div>
        <div className=" bg-[#0f172a4d] rounded-3xl p-7 mt-6">
          <div className="flex flex-col">
            <h4>Social Media Accounts</h4>
            <h5 className="text-[#94A3B8] font-normal">
              Link Your Social Accounts
            </h5>
            <div className="flex  items-center justify-between mt-8">
              <div className="flex">
                <Image src={twitter} alt="wallet_logo" />
                <h6 className="pl-3 pr-2 font-medium">Twitter</h6>
                <Image src={tooltip} alt="info" />
              </div>
              <input
                type="text"
                placeholder="@getmetag"
                className="border-[#334155] border bg-[#1E293B] rounded-lg text-[#DBEAFE] py-2 px-10 w-[600px]"
                //   value={metamaskAccount}
                //   onChange={(e) => setMetamaskAccount(e.target.value)}
              />
              <button className="font-roboto  border px-[60px] py-2 border-[#6633FF] hover:bg-[#6633FF]">
                Connect
              </button>
            </div>
            <div className="flex  items-center justify-between mt-10">
              <div className="flex">
                <Image src={discord} alt="wallet_logo" />
                <h6 className="pl-3 pr-2 font-medium">Discord</h6>
                <Image src={tooltip} alt="info" />
              </div>
              <input
                type="text"
                placeholder="https://discord.gg/hCNkDQcd"
                className="border-[#334155] border bg-[#1E293B] rounded-lg text-[#DBEAFE] py-2 px-10 w-[600px]"
                //   value={metamaskAccount}
                //   onChange={(e) => setMetamaskAccount(e.target.value)}
              />
              <button className="font-roboto  border px-[60px] py-2 border-[#6633FF] hover:bg-[#6633FF]">
                Connect
              </button>
            </div>
            <div className="flex  items-center justify-between mt-10 mb-10">
              <div className="flex">
                <Image src={telegram} alt="wallet_logo" />
                <h6 className="pl-3 pr-2 font-medium">Telegram</h6>
                <Image src={tooltip} alt="info" />
              </div>
              <input
                type="text"
                placeholder="@getmetag"
                className="border-[#334155] border bg-[#1E293B] rounded-lg text-[#DBEAFE] py-2 px-10 w-[600px]"
                //   value={metamaskAccount}
                //   onChange={(e) => setMetamaskAccount(e.target.value)}
              />
              <button className="font-roboto border px-[60px] py-2 border-[#6633FF] hover:bg-[#6633FF]">
                Connect
              </button>
            </div>
          </div>

          <button className="font-roboto  border px-[60px] py-2 border-[#6633FF] hover:bg-[#6633FF]">
            Add New Social Account
          </button>
        </div>
        <div className=" bg-[#0f172a4d] rounded-3xl p-7 mt-6">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <h4>MINT YOUR NFT</h4>

                <div className="flex flex-col mt-8">
                  <input
                    type="text"
                    placeholder="UserName"
                    className="border-[#334155] border bg-[#1E293B] rounded-lg text-[#DBEAFE] py-2 px-10 w-[400px] mb-5"
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    className="border-[#334155] border bg-[#1E293B] rounded-lg text-[#DBEAFE] py-2 px-10 w-[400px]"
                    onChange={handleValueChange}
                  />
                </div>
                <form>
                  <input
                    type="file"
                    className="border-[#334155] border bg-[#1E293B] rounded-lg text-[#DBEAFE] py-2 px-10 w-[400px] mt-5"
                    id="myFile"
                    name="filename"
                    ref={inputRef}
                  />
                </form>
              </div>
              <div className="flex mt-10 mb-10 space-x-4">
                <button
                  className="font-roboto  border-2 px-[40px] py-2 border-[#6633FF] hover:bg-[#6633FF]"
                  onClick={onSubmit}
                >
                  MINT NFT
                </button>
              </div>

              <div className="flex space-x-3">
                <button className="font-roboto  border-2 px-[60px] py-2 border-[#22C55E] hover:bg-[#22C55E]">
                  EDIT
                </button>
                <button className="font-roboto  border-2 px-[60px] py-2 border-[#22C55E] hover:bg-[#22C55E]">
                  SAVE
                </button>
              </div>
            </div>

            <div className="mr-10 mt-10">
              <img src={imgUrl} alt="NFT" width="300" height="400"></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
