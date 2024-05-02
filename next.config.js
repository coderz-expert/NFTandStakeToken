module.exports = {
    images: {
      domains: ['https://ipfs.io/','ipfs.io'],
    },
    env: {
      API_URL: process.env.API_URL,
      API_KEY: process.env.API_KEY,
      PRIVATE_KEY: process.env.PRIVATE_KEY,
      CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
      REACT_APP_PINATA_KEY: process.env.REACT_APP_PINATA_KEY,
      REACT_APP_JWT: process.env.REACT_APP_JWT,
      STAKETOKEN_CONTRACT_ADDRESS: process.env.STAKETOKEN_CONTRACT_ADDRESS,
      REWARDTOKEN_CONTRACT_ADDRESS: process.env.REWARDTOKEN_CONTRACT_ADDRESS,
      STAKING_CONTRACT_ADDRESS: process.env.STAKING_CONTRACT_ADDRESS,
      NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID
    },
  };
  