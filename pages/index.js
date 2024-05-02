"use client"
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import ContractMarketplace from "../artifacts/contracts/NFTMARKETPLACE.sol/NFTMARKETPLACE.json"
import Link from "next/link";


const Marketplace = () => {
    const [data, updateData] = useState([]);
    const [dataFetched, updateFetched] = useState(false);

    const contractAddress = process.env.CONTRACT_ADDRESS;
    console.log("CONTRACT_ADDRESS", contractAddress)

    const contractABI = ContractMarketplace.abi;

    const GetIpfsUrlFromPinata = (pinataUrl) => {
        var IPFSUrl = pinataUrl.split("/");
        const lastIndex = IPFSUrl.length;
        IPFSUrl = "https://ipfs.io/ipfs/" + IPFSUrl[lastIndex - 1];
        return IPFSUrl;
    };

    async function getAllNFTs() {
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(contractAddress, contractABI, signer)
        //create an NFT Token
        console.log("getting this get AllNFTs");
        let transaction = await contract.getAllNFTs()
        console.log("fetched this get AllNFTs");
        //Fetch all the details of every NFT from the contract and display
        const items = await Promise.all(transaction.map(async i => {
            var tokenURI = await contract.tokenURI(i.tokenId);
            console.log("getting this tokenUri", tokenURI);
            tokenURI = GetIpfsUrlFromPinata(tokenURI);
            let meta = await axios.get(tokenURI);
            meta = meta.data;


            let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.image,
                name: meta.name,
                description: meta.description,
            }
            return item;
        }));
        updateFetched(true);
        updateData(items);
    }

    useEffect(() => {
        setTimeout(() => {getAllNFTs();}, 1000);
 
    }, []);

    return (
        <div className="home_cart_main" >
            <div className="home_cart">
                <h2 className="Top_NFTs"> Top NFTs </h2>

                <div className="home_cartIn">

                    {dataFetched &&
                        <>
                            {data.map((value, index) => {

                                const newTo = {
                                    pathname: "/" + value.tokenId
                                }

                                const IPFSUrl = GetIpfsUrlFromPinata(value.image);
                                console.log(IPFSUrl);
                                //   return <NFTTile data={value} key={index}></NFTTile>;
                                return (
                                    <div className="carts_main" key={index}>
                                        <Link passHref href={newTo}>
                                            <div className="carts_all">
                                                <div className="topcarts_image">
                                                    <Image
                                                        src={IPFSUrl}
                                                        alt={value.name}
                                                        className="dark:invert"
                                                        width={100}
                                                        height={150}
                                                        priority
                                                    />
                                                </div>
                                                <div className="topNFT_desc">
                                                    <strong className="text-xl">{value.name}</strong>
                                                    <p className="display-inline">
                                                        {value.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </>
                    }

                </div>
            </div>
        </div>
    );
};

export default Marketplace;