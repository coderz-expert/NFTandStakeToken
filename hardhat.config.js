//require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
   compilers: [
     {
       version: "0.8.20",
     },
     {
       version: "0.8.19"
     },
     {
       version: "0.6.0"
     }
   ],
 },
  defaultNetwork: "sepolia",
  networks: {
    hardhat: { throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      allowUnlimitedContractSize: true,
      timeout: 1800000,
      gas: 5000000, //units of gas you are willing to pay, aka gas limit
      gasPrice:  50000000000, //gas is typically in units of gwei, but you must enter it as wei here
},
    sepolia: {
       url: API_URL,
       accounts: [`0x${PRIVATE_KEY}`]
    }
 }
};
