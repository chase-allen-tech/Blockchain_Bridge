import React, { useEffect, useState } from 'react';
import { loadContract, getPriceCoin, round, formatNumber, toFixed } from "../../utils/index";
import { farmsContainer } from '../../constants/farms';
import { useToasts } from 'react-toast-notifications';
import { useWeb3React } from '@web3-react/core';
import { ERC20_ABI } from '../../constants/abis/erc20';
import OneInchAbi from "../../constants/1inchfarm.json";
import MooniSwapAbi from "../../constants/mooniswap.json";
import { BigNumber } from "@0x/utils";
import ModalConnect from '../GeneralComponents/ModalConnect';
import PairSushiAbi from '../../constants/abis/pair_sushi.json';
import Pair1inchAbi from '../../constants/abis/1inch_pair.json';
import MasterchefAbi from '../../constants/abis/Masterchef.json';
import MasterchefDinoAbi from '../../constants/abis/masterchef_dino.json';





function ExchangeCard(props) {
  const [show, setShow] = useState(false);
  const { account, active, chainId, library } = useWeb3React();
  const [balance, setBalance] = useState(0);
  const [Staked, setStaked] = useState(0);
  const [Reward, setReward] = useState(0);
  const [StakedPerc, setStakedPerc] = useState(0);
  const [WithdrawPerc, setWithdrawPerc] = useState(0);
  const [rewardRate, setrewardRate] = useState(0);
  const { addToast } = useToasts();
  const [status, setStatus] = useState(true);

  useEffect(() => {
    if (props.data == "connect") {
      setStatus(false);
    } else {
      setStatus(true);
    }
  }, [props]);

  // console.log(props);

  function showconnect() {
    setShow(true);
  }

  // *** Switch Chain
  const switchChain = async (chain_id:any) => {
    const win:any = window;
    // console.log("window", chainId, chain_id)
    if (win.ethereum && chainId !== chain_id) {
      // console.log("window", win.ethereum)
      try {
        await win.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x' + chain_id.toString(16) }],
        })
        return true; 
      } catch (switchError) {
        return false;
      }
    }
    return true; 
  }
  // ***

  async function handleWrite(c, name, ...args) {
    try {
      c.methods[name](...args).send({ from: account }).on('receipt', (receipt) => {
        addToast("Transaction Confirmed", {
          appearance: 'success',
          autoDismiss: true,
        })
      }).on('transactionHash', (hash) => {
        addToast("Transaction Created : " + hash, {
          appearance: 'success',
          autoDismiss: true,
        })
      }).on('error', (err) => {
        addToast('Transaction Failed', {
          appearance: 'error',
          autoDismiss: true,
        })
      }).then((resp) => console.log(resp))
    } catch (e) {
      addToast(e, {
        appearance: 'error',
        autoDismiss: true,
      })
    }


  }

  async function getData() {
      // console.log(chainId)
    if (props.data.farm == '1Inch') {
      let result = await switchChain(1)
      if (result) {
        let OneInch = loadContract(library, OneInchAbi, props.data.data.address);
        let mooniAddress = await OneInch.methods.mooniswap().call();
        let MooniSwap = loadContract(library, MooniSwapAbi, mooniAddress)
        let bal = await MooniSwap.methods.balanceOf(account).call();
        setBalance(bal);
        // let OneInch = loadContract(library, OneInchAbi, props.data.data.address);
        let stak = await OneInch.methods.balanceOf(account).call();
        setStaked(stak);
        let reward_rate = await getPriceCoin(props.data.data.rewardToken.id);
        setrewardRate(reward_rate);
        let earn = await OneInch.methods.earned(props.data.data.rewardToken['1inch_id'], account).call();
        setReward(earn);
      }
    } else if (props.data.farm === 'Sushi') {
      let result = await switchChain(1)
      if (result) {
        console.log("1. Sushi", props.data.data.address)
        let sushiContract = loadContract(library, PairSushiAbi, props.data.data.address);
        let balance = await sushiContract.methods.balanceOf(account).call();
        setBalance(balance);
        //*** Get Stake
        let sushiFarmContract = loadContract(library, MasterchefAbi, "0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd");
        let staked = await sushiFarmContract.methods.userInfo(props.data.pid, account).call();
        console.log("staked", staked)
        setStaked(staked.amount);
        //*** Get Reward
        let earn = await sushiFarmContract.methods.pendingSushi(props.data.pid, account).call();
        setReward(earn);
      }
    } else if (props.data.farm === 'Dino') {
      let result = await switchChain(137)
      if (result) {
        console.log("1. Dino", props.data.data.address)
        let dinoContract = loadContract(library, PairSushiAbi, props.data.data.address);
        let balance = await dinoContract.methods.balanceOf(account).call();
        console.log("balance", balance)
        setBalance(balance.toString());
        //*** Get Stake
        let dinoFarmContract = loadContract(library, MasterchefDinoAbi, "0x1948abC5400Aa1d72223882958Da3bec643fb4E5");
        let staked = await dinoFarmContract.methods.userInfo(props.data.pid, account).call();
        console.log("staked", staked)
        setStaked(staked.amount);
        //*** Get Reward
        let earn = await dinoFarmContract.methods.pendingDino(props.data.pid, account).call();
        // console.log(earn)
        setReward(earn);
      }
    }
  }

  // async function getStaked() {
  //   if (props.data.farm == '1Inch') {
  //     let OneInch = loadContract(library, OneInchAbi, props.data.data.address);
  //     let bal = await OneInch.methods.balanceOf("0xA26C0b9fe99e1945aaAd58228F4fEd3f6408Ba3C").call();
  //     setStaked(bal);
  //   } else if (props.data.farm === 'Sushi') {
  //     let sushiContract = loadContract(library, MasterchefAbi, "0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd");
  //     let staked = await sushiContract.methods.userInfo(props.data.pid, account).call();
  //     console.log("staked", staked)
  //     setStaked(staked.amount);
  //   } else if (props.data.farm === 'Dino') {
  //     let dinoContract = loadContract(library, MasterchefDinoAbi, "0x1948abC5400Aa1d72223882958Da3bec643fb4E5");
  //     let staked = await dinoContract.methods.userInfo(props.data.pid, account).call();
  //     console.log("staked", staked)
  //     setStaked(staked.amount);
  //   }
  // }

  // async function getReward() {
  //   if (props.data.farm == '1Inch') {
  //     let OneInch = loadContract(library, OneInchAbi, props.data.data.address);
  //     let reward_rate = await getPriceCoin(props.data.data.rewardToken.id);
  //     setrewardRate(reward_rate);
  //     let earn = await OneInch.methods.earned(props.data.data.rewardToken['1inch_id'], "0xA26C0b9fe99e1945aaAd58228F4fEd3f6408Ba3C").call();
  //     setReward(earn);
  //   } else if (props.data.farm === 'Sushi') {
  //     let sushiContract = loadContract(library, MasterchefAbi, "0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd");
  //     let earn = await sushiContract.methods.pendingSushi(props.data.pid, account).call();
  //     setReward(earn);
  //   } else if (props.data.farm === 'Dino') {
  //     let dinoContract = loadContract(library, MasterchefDinoAbi, "0x1948abC5400Aa1d72223882958Da3bec643fb4E5");
  //     let earn = await dinoContract.methods.pendingDino(props.data.pid, account).call();
  //     console.log(earn)
  //     setReward(earn);
  //   }

  // }

  function formatReward(r) {
    if (props.data.farm == "1Inch") {
      let earn = r;
      return round(((Number(earn) / (10 ** Number(props.data.data.rewardToken.decimals)))) * rewardRate);
    }

  }

  function handleInpChange(e) {
    let target = e.target;
    let val = target.value;
    let id = target.id;
    switch (id) {
      case "balance":
        setStakedPerc(Number(val));
        break;
      case "staked":
        setWithdrawPerc(Number(val));
        break;


    }
  }

  async function Stake() {
    
    let stake_amount = ((StakedPerc / 100) * balance);
    if (props.data.farm == '1Inch') {
      let result = await switchChain(1)
      if (result) {
        if (balance == 0) {
          addToast('Your Balance is 0', {
            appearance: 'error',
            autoDismiss: true,
          })
          return
        }
        try {
          let OneInchPair = loadContract(library, Pair1inchAbi, props.data.pair_id);
          let approved_value = await OneInchPair.methods.allowance(account, props.data.data.address).call();
          if (approved_value < stake_amount) {
            OneInchPair.methods["approve"](props.data.data.address, stake_amount.toFixed(0)).send({ from: account }).on('receipt', async (receipt) => {
              addToast("Transaction Confirmed", {
                appearance: 'success',
                autoDismiss: true,
              })
              let OneInch = loadContract(library, OneInchAbi, props.data.data.address);
              await handleWrite(OneInch, "stake", stake_amount.toFixed(0));
            }).on('transactionHash', (hash) => {
              addToast("Transaction Created : " + hash, {
                appearance: 'success',
                autoDismiss: true,
              })
            }).on('error', (err) => {
              addToast('Transaction Failed', {
                appearance: 'error',
                autoDismiss: true,
              })
            }).then((resp) => console.log(resp))
          } else {
            let OneInch = loadContract(library, OneInchAbi, props.data.data.address);
            await handleWrite(OneInch, "stake", stake_amount.toFixed(0));
          }
        } catch (e) {
          addToast(e, {
            appearance: 'error',
            autoDismiss: true,
          })
        }

      }
    } else if (props.data.farm === 'Sushi') {
      let result = await switchChain(1)
      if (result) {
        if (balance == 0) {
          addToast('Your Balance is 0', {
            appearance: 'error',
            autoDismiss: true,
          })
          return
        }
        console.log("props.data.data.address", props.data.data.address);
        try {
          let SushiPairContract = loadContract(library, PairSushiAbi, props.data.data.address);
          let approved_value = await SushiPairContract.methods.allowance(account, "0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd").call();
          if (approved_value < stake_amount) {
            SushiPairContract.methods["approve"]("0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd", stake_amount.toFixed(0)).send({ from: account }).on('receipt', async (receipt) => {
              addToast("Transaction Confirmed", {
                appearance: 'success',
                autoDismiss: true,
              })
              let sushiFarmContract = loadContract(library, MasterchefAbi, "0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd");
              await handleWrite(sushiFarmContract, "deposit", props.data.pid, stake_amount.toFixed(0));
            }).on('transactionHash', (hash) => {
              addToast("Transaction Created : " + hash, {
                appearance: 'success',
                autoDismiss: true,
              })
            }).on('error', (err) => {
              addToast('Transaction Failed', {
                appearance: 'error',
                autoDismiss: true,
              })
            }).then((resp) => console.log(resp))
          } else {
            let sushiFarmContract = loadContract(library, MasterchefAbi, "0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd");
            await handleWrite(sushiFarmContract, "deposit", props.data.pid, stake_amount.toFixed(0));
          }
        } catch (e) {
          addToast(e, {
            appearance: 'error',
            autoDismiss: true,
          })
        }
        
      }
    } else if (props.data.farm === 'Dino') {
      let result = await switchChain(137)
      if (result) {
        if (balance == 0) {
          addToast('Your Balance is 0', {
            appearance: 'error',
            autoDismiss: true,
          })
          return
        }
        try {
          let DinoPairContract = loadContract(library, PairSushiAbi, props.data.data.address);
          let approved_value = await DinoPairContract.methods.allowance(account, "0x1948abC5400Aa1d72223882958Da3bec643fb4E5").call();
          if (approved_value < stake_amount) {
            DinoPairContract.methods["approve"]("0x1948abC5400Aa1d72223882958Da3bec643fb4E5", stake_amount.toFixed(0)).send({ from: account }).on('receipt', async (receipt) => {
              addToast("Transaction Confirmed", {
                appearance: 'success',
                autoDismiss: true,
              })
              let dinoFarmContract = loadContract(library, MasterchefDinoAbi, "0x1948abC5400Aa1d72223882958Da3bec643fb4E5");
              await handleWrite(dinoFarmContract, "deposit", props.data.pid, stake_amount.toFixed(0));
            }).on('transactionHash', (hash) => {
              addToast("Transaction Created : " + hash, {
                appearance: 'success',
                autoDismiss: true,
              })
            }).on('error', (err) => {
              addToast('Transaction Failed', {
                appearance: 'error',
                autoDismiss: true,
              })
            }).then((resp) => console.log(resp))
          } else {
            let dinoFarmContract = loadContract(library, MasterchefDinoAbi, "0x1948abC5400Aa1d72223882958Da3bec643fb4E5");
            await handleWrite(dinoFarmContract, "deposit", props.data.pid, stake_amount.toFixed(0));
          }
        } catch (e) {
          addToast(e, {
            appearance: 'error',
            autoDismiss: true,
          })
        }
        
      }
    }
  }

  async function Unstake() {
    
    let withdraw_amount = ((WithdrawPerc / 100) * Staked);
    console.log("withdraw_amount", withdraw_amount)
    if (props.data.farm == '1Inch') {
      let result = await switchChain(1)
      if (result) {
        if (Staked == 0) {
          addToast('Your Staked Balance is 0', {
            appearance: 'error',
            autoDismiss: true,
          })
          return
        }
        let OneInch = loadContract(library, OneInchAbi, props.data.data.address);
        await handleWrite(OneInch, "withdraw", withdraw_amount.toFixed(0));
      }
    } else if (props.data.farm === 'Sushi') {
      let result = await switchChain(1)
      if (result) {
        if (Staked == 0) {
          addToast('Your Staked Balance is 0', {
            appearance: 'error',
            autoDismiss: true,
          })
          return
        }
        console.log("1. Sushi")
        let sushiFarmContract = loadContract(library, MasterchefAbi, "0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd");
        await handleWrite(sushiFarmContract, "withdraw", props.data.pid, withdraw_amount.toFixed(0));
      }
    } else if (props.data.farm === 'Dino') {
      let result = await switchChain(137)
      if (result) {
        if (Staked == 0) {
          addToast('Your Staked Balance is 0', {
            appearance: 'error',
            autoDismiss: true,
          })
          return
        }
        let dinoFarmContract = loadContract(library, MasterchefDinoAbi, "0x1948abC5400Aa1d72223882958Da3bec643fb4E5");
        await handleWrite(dinoFarmContract, "withdraw", props.data.pid, withdraw_amount.toFixed(0));
      }
    }
  }

  async function Claim() {
    if (props.data.farm == '1Inch') {
      let result = await switchChain(1)
      if (result) {
        let OneInch = loadContract(library, OneInchAbi, props.data.data.address);
        // await handleWrite(OneInch, "getReward", props.data.data.rewardToken['1inch_id']);
        await handleWrite(OneInch, "getAllRewards");
      }
    } else if (props.data.farm === 'Sushi') {
      let result = await switchChain(1)
      if (result) {
        console.log("1. Sushi")
        let sushiFarmContract = loadContract(library, MasterchefAbi, "0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd");
        await handleWrite(sushiFarmContract, "deposit", props.data.pid, 0);
      }
    } else if (props.data.farm === 'Dino') {
      let result = await switchChain(137)
      if (result) {
        let dinoFarmContract = loadContract(library, MasterchefDinoAbi, "0x1948abC5400Aa1d72223882958Da3bec643fb4E5");
        await handleWrite(dinoFarmContract, "deposit", props.data.pid, 0);
      }
    }
  }

  useEffect(() => {
    async function loadData() {
      if (active && chainId && library) {
        await getData();
        // await getBalance();
        // await getStaked();
        // await getReward();
      }
    }

    loadData().then(res => {
      console.log("finished");
    })


  }, [account])

  function handleMax(val) {
    switch (val) {
      case "stake":
        setStakedPerc(100);
        break;
      case "unstake":
        setWithdrawPerc(100);
        break;
    }
  }



  const html = (<div className="row mt-2">
    <div className="col-md-4 mx-auto">
      <div className="card box-green">
        <form>
          <div className="card-body">
            <p className="card-title">
              <label className="float-left">
                <a 
                  style={{ color: 'white', textDecoration: 'none' }} 
                  href={
                    props.data.farm === "1Inch" ? 
                      `https://app.1inch.io/#/1/dao/pools?filter=1INCH&token0=${props.data.data.stakeCoins[0].address}&token1=${props.data.data.stakeCoins[1].address}`
                      :
                      (props.data.farm === "Sushi" ? `https://app.sushi.com/add/${props.data.token0}/${props.data.token1}`
                        :
                        (props.data.farm === "Dino" ? `https://trade.dinoswap.exchange/?t=d#/add/${props.data.token0}/${props.data.token1}`
                          :
                          `https://quickswap.exchange/#/add/${props.data.token0}/${props.data.token1}`
                        )
                      )
                  }
                  target="_blank"
                  > 
                  Add LP
                </a>
              </label>
              <label className="float-right">Wallet Balance: {balance / 10**18}
              </label></p>
            <div className="form-group mt-3">
              <input id="balance" max={100} value={StakedPerc} onChange={handleInpChange} type="range" className="custom-range" />
            </div>
            <div className="form-group mt-3">
              <label className="float-left text-white">Stake(%): {StakedPerc}%</label>
              <label onClick={() => handleMax("stake")} className="float-right badge badge-danger">MAX</label>
            </div>
          </div>
          <div className="card-footer mt-4">
            <div className="row">
              <div className="col-md-12">
                {status ? <button onClick={Stake} type="button" className="btn btn-black btn-block">Stake</button> :
                  <button onClick={showconnect} type="button" className="btn btn-black btn-block">Connect Wallet</button>
                }

              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div className="col-md-4 mx-auto">
      <div className="card box-green">
        <form>
          <div className="card-body">
            <p className="card-title"><label className="float-right">Your stake: {Staked / 10**18}</label></p>
            <div className="form-group mt-3">
              <input id="staked" max={100} value={WithdrawPerc} onChange={handleInpChange} type="range" className="custom-range" />
            </div>
            <div className="form-group mt-3">
              <label className="float-left text-white">Withdraw(%): {WithdrawPerc}%</label>
              <label onClick={() => handleMax("unstake")} className="float-right badge badge-danger">MAX</label>

            </div>
          </div>
          <div className="card-footer mt-4">
            <div className="row">

              <div className="col-md-12">
                {status ?
                  <button onClick={Unstake} type="button" className="btn btn-black btn-block">Unstake</button>
                  : <button onClick={showconnect} type="button" className="btn btn-black btn-block">Connect Wallet</button>
                }
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div className="col-md-4 mx-auto">
      <div className="card box-green">
        <form>
          
          <div className="card-body">
            <div className="form-group mt-3">
              <h4 className="">Your Reward <br></br> {Reward / 10**18}</h4>
            </div>
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col-md-12">
                {status ?
                  <button onClick={Claim} type="button" className="btn btn-black btn-block">Claim</button>
                  : <button onClick={showconnect} type="button" className="btn btn-black btn-block">Connect Wallet</button>
                }
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <ModalConnect show={show} setShow={setShow} />
  </div>

  );

  return (html);


}


export default ExchangeCard;
