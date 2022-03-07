import React, { useState, useEffect } from 'react';
import ModalConnect from './GeneralComponents/ModalConnect';
import Sidebar from './GeneralComponents/Sidebar';
import TopNav from './GeneralComponents/TopNav';
import Load from './GeneralComponents/Load';
import { useWeb3React } from '@web3-react/core';
import FarmsTable from './FarmsComponents/FarmsTable';
import { loadContract, getPriceCoin, round } from "../utils/index";
import { farmsContainer } from '../constants/farms';
import { useToasts } from 'react-toast-notifications';
import { ERC20_ABI } from '../constants/abis/erc20';
import OneInchAbi from "../constants/1inchfarm.json";
import MasterchefAbi from "../constants/abis/Masterchef.json";


// import DinoAbi from "../constants/dinofarm.json";
import { Infura_API } from '../constants';

import Web3 from 'web3';
// *** ADD
import { getSushiFarms } from "../hooks/getSushiFarms";

import fetchFarms from '../hooks/fetchFarms'
import fetchFarms_1 from '../hooks/fetchFarms_1'



var w3:any, w3_sushi:any, totalAllocPoint:any, sushiPerBlock:any;

function Farm(props: any) {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [farms, setFarms]: any = useState([])

  const { account, active, chainId, library } = useWeb3React();
  const { addToast } = useToasts();


  async function FormatOneInchFarms(data: any, provider: any = null) {

    
    w3_sushi = new Web3("https://polygon-rpc.com/");

    if (provider) {
      w3 = new Web3(provider);
    } else {
      w3 = library;
    }

    // console.log("w3" + w3);

    let cont = [];
    let flag = true;
    for (let farm of data) {

      let res = {
        pair: farm.name,
        icon: "/assets/media/dex/ONEINCH.svg",
        farm: "1Inch",
        earned: 4468,
        apr: 19.16,
        liquidity: 0,
        data: {},
        pair_id: ""
      }
      let OneInchContract = loadContract(w3, OneInchAbi, farm.address);

      let mooniAddress = await OneInchContract.methods.mooniswap().call();
      // let mooniAddress = "0x4d5f08eccd3d9281632aa3fc6937e98441564544";

      let staked = 0;
      for (let stake of farm.stakeCoins) {
        let rate = await getPriceCoin(stake.id);
        let CoinContract = loadContract(w3, ERC20_ABI, stake.address);
        let balance = await CoinContract.methods.balanceOf(mooniAddress).call();
        // let decimals = await CoinContract.methods.decimals().call();
        let decimals = 18;
        staked += ((Number(balance) / (10 ** Number(decimals))) * rate);
      }
      staked = round(staked);
      // let rewardContract = loadContract(w3, ERC20_ABI, farm.rewardToken.address);
      res.liquidity = staked;
      // let decimals = await rewardContract.methods.decimals().call();
      let earn;
      if (account) {
        // let reward_rate = await getPriceCoin(farm.rewardToken.id);
        // earn = await OneInchContract.methods.earned(farm.rewardToken['1inch_id'], account).call();
        // res.earned = ((Number(earn) / (10 ** Number(decimals)))) * reward_rate;
      } else {
        // earn = 0;
        // res.earned = earn;
      }
      // let balance = await rewardContract.methods.balanceOf(farm.address).call();
      // let totalSupply = await OneInchContract.methods.totalSupply().call();
      // let rate = (Number(balance) / Number(totalSupply));
      // res.apr = round((((1 + rate) ** 12) - 1) * 100);
      if (flag === false) {
        res.apr = 48.23
        res.earned = 476
      }
      
      res['data'] = farm;
      res['pair_id'] = mooniAddress;
      cont.push(res);
      flag = false;
    }
    let temp = [...farms, ...cont];
    console.log(temp)

    // *** SushiSwap
    // let MasterchefContract = loadContract(w3, MasterchefAbi, "0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd");
    // totalAllocPoint = await MasterchefContract.methods.totalAllocPoint().call();
    // sushiPerBlock = await MasterchefContract.methods.sushiPerBlock().call();

    // let temp1 = await getSushiFarms(totalAllocPoint, sushiPerBlock);
    let temp1 = await getSushiFarms(609383, 100000000000000000000);
    console.log(temp1)

    let _temp_arr:any = [];
    for (var i = 0; i < temp1.length; i++) {
      let res = {
        // kat3martynova_official 
        pair: temp1[i].token0.symbol + "/" + temp1[i].token1.symbol,
        icon: "/assets/icons/sushi.png",
        farm: "Sushi",
        // earned: 0,
        earned: Number(Number(temp1[i].rewardPerday).toFixed(2)),
        apr: Number(Number(temp1[i].rewardAPR + temp1[i].feeAPR).toFixed(2)),
        liquidity: Number(Number(temp1[i].liquidity).toFixed(2)),
        data: {
          address: temp1[i].id,
        },
        pid: temp1[i].pid,
        token0: temp1[i].token0.id,
        token1: temp1[i].token1.id,
      }
      _temp_arr.push(res)
    }
    // *** 

    // *** Dinoswap 
    let _farms = await fetchFarms();
    let farms_1:any = _farms.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X');
    console.log("fetchFarms=>", _farms, farms_1)

    let _temp_arr1:any = [];
    for (var i = 0; i < farms_1.length; i++) {
      let token1_price:any = (farms_1[i].quoteToken.address[56] === "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619") ? 2420 : 10**12
      let liquidity:any = Number(farms_1[i].lpTotalInQuoteToken * token1_price);
      let res = {
        // kat3martynova_official 
        pair: farms_1[i].lpSymbol,
        icon: "/assets/icons/dino.png",
        farm: "Dino",
        // earned: 0,
        earned: Number(Number(farms_1[i].poolWeight * 7 * 41142.85).toFixed(2)),
        apr: Number(Number(farms_1[i].poolWeight * 365.25 * 7 * 41142.85 * 100 * 0.0428 / liquidity ).toFixed(2)),
        liquidity: Number(liquidity.toFixed(2)),
        data: {
          address: farms_1[i].pairid,
        },
        pid: farms_1[i].pid,
        token0: farms_1[i].token.address[56],
        token1: farms_1[i].quoteToken.address[56],
      }
      // console.log(res)
      _temp_arr1.push(res)
    }
    // ***

    // *** quickswap 
    let _farms_1 = await fetchFarms_1();
    let farms_2:any = _farms_1.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X');
    // console.log("fetchFarms=>", _farms, farms_1)

    let _temp_arr2:any = [];
    for (var i = 0; i < farms_2.length; i++) {
      let token1_price:any = (farms_2[i].quoteToken.address[56] === "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619") ? 2420 : 10**12
      let liquidity:any = Number(farms_2[i].lpTotalInQuoteToken * token1_price);
      // console.log("token1_price", farms_2[i].lpTotalInQuoteToken)
      let res = {
        // kat3martynova_official 
        pair: farms_2[i].lpSymbol,
        icon: "/assets/icons/quick.png",
        farm: "Quick",
        // earned: 0,
        earned: Number(Number(farms_2[i].poolWeight * 1 * 41142.85).toFixed(2)),
        apr: Number(Number(farms_2[i].poolWeight * 365.25 * 1 * 41142.85 * 100 * 0.0428 / liquidity ).toFixed(2)),
        liquidity: Number((liquidity - 30000).toFixed(2)),
        data: {
          address: farms_2[i].quoteToken.address[56],
        },
        pid: farms_2[i].pid,
        token0: farms_2[i].token.address[56],
        token1: farms_2[i].quoteToken.address[56],
      }
      // console.log(res)
      _temp_arr2.push(res)
    }
    // ***

    setFarms([...temp, ..._temp_arr, ..._temp_arr1, ..._temp_arr2]);
    setIsLoading(false);
    // console.log(temp)
    // console.log(_temp_arr)
    // console.log(_temp_arr1)
    addToast("Loaded 1Inch Farms", {
      appearance: "success",
      autoDismiss: true
    })
  }


  // async function FormatDinoFarms(provider: any = null) {

  //   var w3;
  //   if (provider) {
  //     w3 = new Web3(provider);
  //   } else {
  //     w3 = library;
  //   };

  //   let dinoContract = await loadContract(w3, DinoAbi, '0x1948abC5400Aa1d72223882958Da3bec643fb4E5');
  //   let poollength = await dinoContract.methods.poolLength().call();

  //   let lpaddress = "";
  //   let i = 0;
  //   for (i = 0; i < poollength; i++) {
  //     lpaddress = await dinoContract.methods.poolinfo(i).call();
  //     console.log();
  //   }

  // }


  useEffect(() => {
    
    loadData().then(res => {
      console.log("finished");
    })
  }, [])

  async function loadData() {
    //  await FormatDinoFarms();
    if (active && chainId && library) {
      if (farmsContainer[chainId]) {
        await FormatOneInchFarms(farmsContainer[chainId]['1inch']);
      }
    } else {
      if (farmsContainer[1]) {
        console.log(Infura_API)
        await FormatOneInchFarms(farmsContainer[1]['1inch'], Infura_API);
      }
    }
  }



  const html = (
    <div id="page-content-wrapper">
      {/* Top navigation*/}
      <TopNav show={[show, setShow]} />
      {/* Page content*/}
      <div className="right-side">
        <div className="container-fluid">
          <div className="row mt-4">
            <h1>Farm</h1>
            <p>Description text here</p>
          </div>

          {
            isLoading ? <Load loaded={true} />
            :
            <React.Fragment>
              <div className="row mt-4">
                <div className="col-md-12">
                  <div className="card box-2">
                    <div className="card-header">
                      <h5>Trending Farms</h5>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <FarmsTable availableSearch={false} sort={true} rows={farms.sort((a:any, b:any) => b.liquidity - a.liquidity).slice(0, 10)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row my-4">
                <div className="col-md-12">
                  <div className="card box-2">
                    <div className="card-header">
                      <h5>All Farms</h5>
                      <FarmsTable availableSearch={true} rows={farms} />
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          }

        </div>
        <div className="mt-5">
          <footer>
            <p className="text-center text-white">
              <a href="#" className="text-white"><small>Terms &amp; Condition</small></a> | <a href="#" className="text-white"><small>Privacy Policy</small></a>
              <br />
              <small>© 2021 ABC Token</small>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
  return <div className="d-flex" id="wrapper">
    <Sidebar current={props.current} />
    {html}
    <ModalConnect show={show} setShow={setShow} />
  </div>;
}

export default Farm;