This is a Dapp application based on the Ethereum blockchain, utilizing the Sepolia network.
## Getting Started

Before you begin, make sure to update the `env.local` files with the following configurations:
```bash
NEXT_PUBLIC_RPC_URL=     // Add the RPC URL here. You can create an account from alchemy.com and create a project. After that, you will receive the RPC URL.
NEXT_PUBLIC_PRIVATE_KEY=  // Add your private key here. You can get it from Metamask by clicking on your account, then on the menu (3-dot button), selecting Account details, and clicking on show Private Key.
DEFAULT_NETWORK=sepolia
NEXT_PUBLIC_ADDRESS=  // When you run `npx hardhat deploy scripts/deploy.js`, you will receive the public address of the contract.
NEXT_PUBLIC_IPFS_ID=   // Please add IPFS id and key.
NEXT_PUBLIC_IPFS_KEY=

API_URL=     // Add the RPC URL here. You can create an account from alchemy.com and create a project. After that, you will receive the RPC URL.
API_KEY=    // Add the Project key from alchemy.com
PRIVATE_KEY=  // Add your private key here. You can get it from Metamask by clicking on your account, then on the menu (3-dot button), selecting Account details, and clicking on show Private Key.
CONTRACT_ADDRESS=  // this is  NFT ERC 721 Token address  When you run `npx hardhat deploy scripts/deploy.js`(Remmever you neet change Contract name in contract factory ), you will receive the public address of the contract.
REACT_APP_PINATA_KEY= // add pinata key 
REACT_APP_PINATA_SECRET=// add pinata secret
REACT_APP_JWT=//add jwt key
STAKETOKEN_CONTRACT_ADDRESS=// this is  NFT ERC 20 Token address  When you run `npx hardhat deploy scripts/deploy.js`(Remmever you neet change Contract name in contract factory ), you will receive the public address of the contract.
REWARDTOKEN_CONTRACT_ADDRESS=// this is  NFT ERC ERC 20 Token address  When you run `npx hardhat deploy scripts/deploy.js`(Remmever you neet change Contract name in contract factory ), you will receive the public address of the contract.
STAKING_CONTRACT_ADDRESS=// this is  NFT ERC staking address  When you run `npx hardhat deploy scripts/deploy.js`(Remmever you neet change Contract name in contract factory ), you will receive the public address of the contract.
NEXT_PUBLIC_PROJECT_ID=
```
Once you've updated the configurations, run the following commands:

```bash
npm install
npx hardhat compile
npx hardhat deploy scripts/deploy.js
```
After deploying the contracts, start the server by running the following command:
```bash
npm run dev
```

You can now view the result by opening http://localhost:3000 in your browser.


