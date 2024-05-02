
"use client"
import { useRouter } from 'next/router';
import axios from "axios";
import { useState, useEffect } from "react";
import ContractMarketplace from "../artifacts/contracts/NFTMARKETPLACE.sol/NFTMARKETPLACE.json"


export default function NFTPage(props) {

    const router = useRouter();
    console.log(router.asPath[1]);

    const tokenId = router.asPath[1];
    const [data, updateData] = useState({});
    const [dataFetched, updateDataFetched] = useState(false);
    const [message, updateMessage] = useState("");
    const [currAddress, updateCurrAddress] = useState("0x");

    const GetIpfsUrlFromPinata = (pinataUrl) => {
        var IPFSUrl = pinataUrl.split("/");
        const lastIndex = IPFSUrl.length;
        IPFSUrl = "https://ipfs.io/ipfs/" + IPFSUrl[lastIndex - 1];
        return IPFSUrl;
    };

    async function getNFTData(tokenId) {
        const contractAddress = process.env.CONTRACT_ADDRESS;;
        const contractABI = ContractMarketplace.abi;

        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(contractAddress, contractABI, signer)
        //create an NFT Token
        var tokenURI = await contract.tokenURI(tokenId);
        const listedToken = await contract.getListedTokenForId(tokenId);
        tokenURI = GetIpfsUrlFromPinata(tokenURI);
        let meta = await axios.get(tokenURI);
        meta = meta.data;
        console.log(listedToken);

        let item = {
            price: meta.price,
            tokenId: tokenId,
            seller: listedToken.seller,
            owner: listedToken.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        console.log(item);
        updateData(item);
        updateDataFetched(true);
        console.log("address", addr)
        updateCurrAddress(addr);
    }

    async function buyNFT(tokenId) {
        try {
            const contractAddress = "0x6BAc4b5c410DDD83ee9C54dEdC1F43da9dBa5324";
            const contractABI = ContractMarketplace.abi;
            const ethers = require("ethers");
            //After adding your Hardhat network to your metamask, this code will get providers and signers
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            //Pull the deployed contract instance
            let contract = new ethers.Contract(contractAddress, contractABI, signer);
            const salePrice = ethers.utils.parseUnits(data.price, 'ether')
            updateMessage("Buying the NFT... Please Wait (Upto 5 mins)")
            //run the executeSale function
            let transaction = await contract.executeSale(tokenId, { value: salePrice });
            await transaction.wait();

            alert('You successfully bought the NFT!');
            updateMessage("");
        }
        catch (e) {
            alert("Upload Error" + e)
        }
    }

    useEffect(() => {

        if (!dataFetched)

            getNFTData(tokenId);
        if (typeof data.image == "string")
            data.image = GetIpfsUrlFromPinata(data.image);
    }, []);


    return (
        <div style={{ "minHeight": "100vh" }} className='tokenid_main'>
            <div className="flex ml-20 mt-20 showData_main">
                <div className='showData_img'>
                    <img src={data.image} alt="" className="w-2/5" />
                </div>

                <div className="text-xl ml-20 space-y-8 text-white shadow-2xl rounded-lg border-2 p-5 showData_desc">
                    <div className='showData_details'>
                        <span className='showData_head'>Name:</span> {data.name}
                    </div>
                    <div className='showData_details'>
                        <span className='showData_head'>Description:</span> {data.description}
                    </div>
                    <div className='showData_details'>
                        <span className='showData_head'>Price:</span> {data.price + " ETH"}
                    </div>
                    <div className='showData_details'>
                        <span className='showData_head'>Owner:</span> {data.owner}
                    </div>
                    <div className='showData_details'>
                        <span className='showData_head'>Seller:</span> {data.seller}
                    </div>
                    <div className='showData_details'>
                        {currAddress != data.owner && currAddress != data.seller ?
                            <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={() => buyNFT(tokenId)}>Buy this NFT</button>
                            : <div className="text-emerald-700">You are the owner of this NFT</div>
                        }

                        <div className="text-green text-center mt-3">{message}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}