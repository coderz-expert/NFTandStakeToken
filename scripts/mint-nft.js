require('dotenv').config();
const ethers = require('ethers');
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const contract = require("../artifacts/contracts/NFT.sol/NFT.json");
console.log(CONTRACT_ADDRESS);
const provider=new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY,provider);
const nftContract= new ethers.Contract(CONTRACT_ADDRESS,contract.abi,signer);
const tokenUri = "https://gateway.pinata.cloud/ipfs/QmdeD2sNp9wNW6Z7fr6Ce2SeJj2RjTGWPTnedWC8vGc3M9"
async function main(){
    
    const nftTxn =await nftContract.awardItem(signer.getAddress(),tokenUri);
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://sepolia.etherscan.io/tx/${nftTxn.hash}`)

  

}
main();