"use client"

import React, { useState, useRef, useEffect } from "react";
import { ethers } from 'ethers';
import StakeToken from "../artifacts/contracts/StakeToken.sol/StakeToken.json";
import StakingC from "../artifacts/contracts/Staking.sol/Staking.json";
import { toast } from "react-hot-toast";

const Staking = () => {

  const [active, setActive] = useState("1")

  const [Reward, setReward] = useState(true)
  const [Deposit, setDeposit] = useState(false)
  const [Withdraw, setWithdraw] = useState(false)

  function handleReward(id) {
    setActive(id)

    setReward(true)
    setDeposit(false)
    setWithdraw(false)
  }

  function handleDeposit(id) {
    setActive(id)

    setReward(false)
    setDeposit(true)
    setWithdraw(false)
  }

  function handleWithdraw(id) {
    setActive(id)

    setReward(false)
    setDeposit(false)
    setWithdraw(true)
  }

  const reward = () => {
    return (
      <div className="reward_main">
        <div className="reward-rate">
          <p className="reward_one">Reward Rate: </p> <p className="reward_two">{rewardRate} token/sec </p>
        </div>

        <div className="reward-rate">
          <p className="reward_one">Staked Amount: </p> <p className="reward_two">{stakedAmount}</p>
        </div>

        <div className="reward-rate">
          <p className="reward_one">Earned Reward:</p> <p className="reward_two">{rewardVal}</p>
        </div>

        <button className="claim_reward" onClick={claimReward}>
          Claim Rewards
        </button>

      </div>
    )
  }

  const deposit = () => {
    return (
      <div className="deposit_main">
        <div className="deposit_inside">
          <div className="stake-wrapper">
            <form onSubmit={approveToken} className="token-amount-form">
              <h4 className="token-input-label">Token Approval:</h4>
              <input type="text" ref={approvedTokenRef} />
              <p className="Token_approval">
                <button onClick={approveToken} type="submit">
                  Token Approval
                </button>
              </p>
            </form>


            <form onSubmit={stakeToken} className="stake-amount-form token-amount-form">
              <h4 className="stake-input-label token-input-label">Enter Staked Amount:</h4>
              <input type="text" ref={stakeAmountRef} />
              <p className="Token_approval">
                <button onClick={stakeToken} type="submit">
                  Stake Token
                </button>
              </p>
            </form>

          </div>
        </div>
      </div>
    )
  }

  const withdraw = () => {
    return (
      <div className="withdraw_main">
        <div className="withdraw_inside">
          <div className="stake-wrapper">
            <form className="withdraw-form token-amount-form" onSubmit={withdrawStakeToken}>
              <h4 className="token-input-label">Withdraw Token:</h4>
              <input type="text" ref={withdrawStakeAmountRef} />

              <p className="Token_approval">
                <button onClick={withdrawStakeToken} type="submit">
                  Withdraw Staked Token
                </button>
              </p>

            </form>
          </div>
        </div>
      </div>
    )
  }



  /////////////////////////////////////////////////

  const approvedTokenRef = useRef();

  //After adding your Hardhat network to your metamask, this code will get providers and signers
  //  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner();
  const approveToken = async (e) => {
    e.preventDefault();
    const amount = approvedTokenRef.current.value.trim();
    if (isNaN(amount) || amount <= 0) {
      console.error("Please enter a valid positive number");
      return;
    }

    try {
      const contractAddress = process.env.STAKETOKEN_CONTRACT_ADDRESS;
      const contractABI = StakeToken.abi;
      const stakingAddress = process.env.STAKING_CONTRACT_ADDRESS;

      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(contractAddress, contractABI, signer);
      const amountToSend = ethers.utils.parseUnits(amount, 18).toString();
      const transaction = await contract.approve(stakingAddress, amountToSend);
      await toast.promise(transaction.wait(),
        {
          loading: "Transaction is pending...",
          success: 'Transaction successful 👌',
          error: 'Transaction failed 🤯'
        });
      approvedTokenRef.current.value = "";
      const receipt = await transaction.wait();
      if (receipt.status === 1) {
        console.log("Transaction is successful");
        toast.success("Transaction is successful")
        approvedTokenRef.current.value = "";
      } else {
        console.log("Transaction failed. Please try again.");
        toast.error("Transaction failed. Please try again.")
      }
    } catch (error) {
      toast.error("Transaction failed. Please try again.");
      console.log("Transaction failed. Please try again.");
      console.error(error.message)
    }
  };

  const stakeAmountRef = useRef();

  const stakeToken = async (e) => {
    e.preventDefault();
    const amount = stakeAmountRef.current.value.trim();
    console.log(amount)
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid positive number.");
      return;
    }

    try {

      const contractABI = StakingC.abi;

      const stakingAddress = process.env.STAKING_CONTRACT_ADDRESS;

      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const amountToStake = ethers.utils.parseUnits(amount, 18).toString();
      //Pull the deployed contract instance
      let contract = new ethers.Contract(stakingAddress, contractABI, signer);

      const transaction = await contract.stake(amountToStake)

      await toast.promise(transaction.wait(),
        {
          loading: "Transaction is pending...",
          success: 'Transaction successful 👌',
          error: 'Transaction failed 🤯'
        });
      const receipt = await transaction.wait();
      if (receipt.status === 1) {
        toast.success("Transaction is successful");
        console.log("Transaction is successful");
        approvedTokenRef.current.value = "";
      } else {
        console.log("Transaction failed. Please try again.");
        toast.error("Transaction failed. Please try again.")
      }
    } catch (error) {
      console.log("Token Stake Failed");
      toast.error("Token Approval Failed");
      console.error(error.message)
    }
  };


  const withdrawStakeAmountRef = useRef();

  const withdrawStakeToken = async (e) => {
    e.preventDefault();
    const amount = withdrawStakeAmountRef.current.value.trim();
    console.log(amount)
    if (isNaN(amount) || amount <= 0) {
      console.error("Please enter a valid positive number");
      return;
    }

    const contractABI = StakingC.abi;

    const stakingAddress = process.env.STAKING_CONTRACT_ADDRESS;

    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    //Pull the deployed contract instance
    let contract = new ethers.Contract(stakingAddress, contractABI, signer);
    const amountToWithdraw = ethers.utils.parseUnits(amount, 18).toString();
    console.log(amountToWithdraw)
    try {
      const transaction = await contract.withdrawStakedTokens(amountToWithdraw)
      await toast.promise(transaction.wait(),
        {
          loading: "Transaction is pending...",
          success: 'Transaction successful 👌',
          error: 'Transaction failed 🤯'
        });
      withdrawStakeAmountRef.current.value = "";

      const receipt = await transaction.wait();
      if (receipt.status === 1) {
        console.log("Transaction is successful");
        withdrawStakeAmountRef.current.value = "";
      } else {
        toast.error("Transaction failed. Please try again.")
      }
    } catch (error) {
      toast.error("Staking Failed");
      console.error(error.message)
    }
  };

  const claimReward = async (e) => {
    try {
      e.preventDefault();
      const contractABI = StakingC.abi;

      const stakingAddress = process.env.STAKING_CONTRACT_ADDRESS;

      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(stakingAddress, contractABI, signer);

      const transaction = await contract.getReward();
      await toast.promise(transaction.wait(),
        {
          loading: "Transaction is pending...",
          success: 'Transaction successful 👌',
          error: 'Transaction failed 🤯'
        });
      const receipt = await transaction.wait();
      if (receipt.status === 1) {
        setTransactionStatus("Transaction Is Successful")
        setTimeout(() => {
          setTransactionStatus("")
        }, 5000)
      } else {
        setTransactionStatus("Transaction failed. Please try again.");
      }
    } catch (error) {
      console.error("Claim Reward Failed", error.message)
    }
  }


  const [rewardRate, setRewardRate] = useState("0");
  useEffect(() => {
    const fetchRewardRate = async () => {
      try {
        const contractABI = StakingC.abi;

        const stakingAddress = process.env.STAKING_CONTRACT_ADDRESS;

        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(stakingAddress, contractABI, signer);
        const rewardRateWei = await contract.REWARD_RATE();
        const rewardRateEth = ethers.utils.formatUnits(rewardRateWei.toString(), 18);
        setRewardRate(rewardRateEth)
      } catch (error) {
        toast.error("Error fetching reward rate");
        console.error(error.message)
      }
    }
    setTimeout(() => {fetchRewardRate();}, 1000);
   
  }, []);


  const [stakedAmount, setStakedAmount] = useState("0");

  useEffect(() => {
    const fetchStakedBalance = async () => {
      try {
        const contractABI = StakingC.abi;

        const stakingAddress = process.env.STAKING_CONTRACT_ADDRESS;

        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(stakingAddress, contractABI, signer);
        const amountStakedWei = await contract.stakedBalance("0x68E45EFaD566Eeb3B0f8C14bca3072842fb0625d")
        const amountStakedEth = ethers.utils.formatUnits(amountStakedWei.toString(), 18);
        setStakedAmount(amountStakedEth)
      } catch (error) {
        toast.error("Error fetching staked amount");
        console.error(error.message)
      }
    }
    setTimeout(() => {fetchStakedBalance();}, 1000);
   
  }, [])


  const [rewardVal, setRewardVal] = useState("0");

  useEffect(() => {
    const fetchStakeRewardInfo = async () => {
      try {
        //fetching earned amount of a user
        const contractABI = StakingC.abi;

        const stakingAddress = process.env.STAKING_CONTRACT_ADDRESS;

        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(stakingAddress, contractABI, signer);
        const rewardValueWei = await contract.earned("0x68E45EFaD566Eeb3B0f8C14bca3072842fb0625d");
        const rewardValueEth = ethers.utils.formatUnits(rewardValueWei, 18).toString();
        const roundedReward = parseFloat(rewardValueEth).toFixed(2)
        setRewardVal(roundedReward)
      } catch (error) {
        toast.error("Error fetching the reward:");
        console.error(error.message)
      }
    }
   
    const interval = setInterval(() => {
      fetchStakeRewardInfo();
    }, 10000)
    return () => clearInterval(interval)
  }, [])


  return (
    <div className="staking_main">
      <div className="staking_inside">
        <div className="staking_cards">
          <div className="stacard_main">
            <div className="stacard_middle">

              <div className="stacard_middle_one">
                <div className="stacard_menu" onClick={() => handleReward("1")}>
                  <h4 className={`stacard_menu_head ${active === "1" ? "active" : ""}`}>REWARDS</h4>
                </div>
                <div className="stacard_menu" onClick={() => handleDeposit("2")}>
                  <h4 className={`stacard_menu_head ${active === "2" ? "active" : ""}`}>STAKE</h4>
                </div>
                <div className="stacard_menu" onClick={() => handleWithdraw("3")}>
                  <h4 className={`stacard_menu_head ${active === "3" ? "active" : ""}`}>WITHDRAW</h4>
                </div>
              </div>

              <hr />
              <hr />
            </div>

            <div className="stacard_footer">
              {Reward && reward()}
              {Deposit && deposit()}
              {Withdraw && withdraw()}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Staking;