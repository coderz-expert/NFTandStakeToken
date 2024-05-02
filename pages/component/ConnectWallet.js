'use client'
import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import useDarkMode from "use-dark-mode";

const ConnectWallet = () => {
  const darkMode = useDarkMode(false);

  const pathname = usePathname();
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    connectWallet()
  }, []);

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);


  const connectWallet = async () => {

    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };
  useEffect(() => {
       
    async function check() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      try {
        if (!ethereum) {
          sethaveMetamask(false);
        }
    
        const accounts = await ethereum.request({
          method: 'eth_accounts',
        });
        let balance = await provider.getBalance(accounts[0]);
        let bal = ethers.utils.formatEther(balance);
        console.log("tttttttttttttttttt"+bal);
        setAccountAddress(accounts[0]);
        setAccountBalance(bal);
        setIsConnected(true);
      }  catch (error) {
        setIsConnected(false);
      }
    }

    
    
    setTimeout(() => {check();}, 1000);

  }, []);
  const checkCurrentAccount = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async () => {
       const accounts = await window.ethereum.request({
         method: "eth_accounts",
       });
       let balance = await provider.getBalance(accounts[0]);
       let bal = ethers.utils.formatEther(balance);
       console.log("tttttttttttttttttt"+bal);
       setAccountAddress(accounts[0]);
       setAccountBalance(bal);
       setIsConnected(true);
     });
    }
   };
   
   useEffect(() => {
    checkCurrentAccount();
   }, []);



  return (

            <div className="btn_main">

              

              {haveMetamask ? (
                <div className="card_dark_main" >

                  {isConnected ? (
 <button className="btn" onClick={connectWallet}>
  {accountAddress.slice(0, 4)}...
                          {accountAddress.slice(38, 42)}({accountBalance})
</button>

                  
                  ) : (
                    
                    <button className="btn" onClick={connectWallet}>
                      Connect
                    </button>
                  )}
                </div>
              ) : (
                <p>Please Install MataMask</p>
              )}

            </div>
     
  );
};

export default ConnectWallet;