"use client"
import React, { useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import ContractMarketplace from "../artifacts/contracts/NFTMARKETPLACE.sol/NFTMARKETPLACE.json"
import Link from "next/link";
const Profile = () => {

    const [data, updateData] = useState([]);
    const [dataFetched, updateFetched] = useState(false);
    const [address, updateAddress] = useState("0x");
    const [totalPrice, updateTotalPrice] = useState("0");


    const GetIpfsUrlFromPinata = (pinataUrl) => {
        var IPFSUrl = pinataUrl.split("/");
        const lastIndex = IPFSUrl.length;
        IPFSUrl = "https://ipfs.io/ipfs/" + IPFSUrl[lastIndex - 1];
        return IPFSUrl;
    };

    async function getNFTData(tokenId) {
        const ethers = require("ethers");
        let sumPrice = 0;
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();

        const contractAddress = process.env.CONTRACT_ADDRESS;
        const contractABI = ContractMarketplace.abi;
        //Pull the deployed contract instance
        let contract = new ethers.Contract(contractAddress, contractABI, signer)

        //create an NFT Token
        let transaction = await contract.getMyNFTs()

        /*
        * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
        * and creates an object of information that is to be displayed
        */

        const items = await Promise.all(transaction.map(async i => {
            const tokenURI = await contract.tokenURI(i.tokenId);
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
            sumPrice += Number(price);
            return item;
        }))

        updateData(items);
        updateFetched(true);
        updateAddress(addr);
        updateTotalPrice(sumPrice.toPrecision(3));
    }

    // const params = useParams();
    const tokenId = 1;//params.tokenId;

    useEffect(() => {
        getNFTData(tokenId);
    }, [])

    return (
        <div className="home_cart_main">
            <div className="home_cartIn">
                <div className="profile_main">
                    <h5 className="profile_head">Wallet Address</h5>
                    <p className="profile_num">   {address}</p>

                    <div className="profile_middle_main">
                        <div className="profile_middle_inside">
                            <p className="profile_middle_one">No. of NFTs</p>
                            <p className="profile_middle_two"> {data.length}</p>
                        </div>

                        <div className="profile_middle_inside">
                            <p className="profile_middle_one">Total Value</p>
                            <p className="profile_middle_two"> {totalPrice} ETH </p>
                        </div>
                    </div>

                    <p className="your_nfts" >Your NFTs</p>

                    <div className="profile_bottom_main">
                        {data.map((value, index) => {

                            const newTo = {
                                pathname: "/" + value.tokenId
                            }

                            const IPFSUrl = GetIpfsUrlFromPinata(value.image);
                            console.log(IPFSUrl, typeof value.tokenId);
                            console.log("pathnametokenid", typeof value.tokenId)
                            //   return <NFTTile data={value} key={index}></NFTTile>;
                            return (
                                <div className="carts_main" key={index}>
                                    <Link href={newTo}>
                                        <div className="carts_all">
                                            <Image
                                                src={IPFSUrl}
                                                alt={value.name}
                                                className="dark:invert"
                                                width={100}
                                                height={150}
                                                priority
                                            />

                                            <div className="topNFT_desc profile_desc">
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
                        <div className="mt-10 text-xl no_nft_msg">
                            {data.length == 0 ? "Oops, No NFT data to display (Are you logged in?)" : ""}
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
};

export default Profile;