const { ethers } = require("hardhat");
async function main() {
    // Grab the contract factory 
   //const NFT = await ethers.getContractFactory("NFTMARKETPLACE");
   const NFT = await ethers.getContractFactory("Staking");
    // Start deployment, returning a promise that resolves to a contract object
const nft = await NFT.deploy("0x34F85cf7a77A129bfE23534089b5069F0DDb1780","0x4058e2F8aC9c515f09135220871c6f7E17f30815"); // Instance of the contract 
  //const nft = await NFT.deploy("10000000"); // Instance of the contract 
	
    console.log("Contract deployed to address:", nft.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });