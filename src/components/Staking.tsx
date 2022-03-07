



import { useWeb3React } from '@web3-react/core';
import React , {useEffect,useState} from 'react';
import { bep20, pool } from '../wallet/abis';
import { pooladd, token } from '../wallet/addresses';
import ModalConnect from './GeneralComponents/ModalConnect';
import Sidebar from './GeneralComponents/Sidebar';
import StakeCard from './StakingComponents/StakeCard';
import {calculateAP, loadContract, toFixed , getPrice , round, formatNumber} from '../utils';
import Reward from './StakingComponents/Reward';
import DepositHistory from './StakingComponents/DepositHistory';
import LockedReward from './StakingComponents/LockedReward';
import TopNav from './GeneralComponents/TopNav';

function Staking(props:any) {

    const { active,account , deactivate ,library } = useWeb3React();
    const [balance,setBalance] = useState(0);
    const [reward,setReward] = useState(0);
    const [staked,setStaked] = useState(0);
    const [totalSupply,setTotal] = useState(0);
    const [totalReward,setTReward] = useState(0);
    const [deposits,setDeposits] = useState([]);
    const [show,setShow] = useState(false);
    const [apy,setApy] = useState(100);
    const [price,setPrice] = useState(0);
    const [AprRate,setAprRate] = useState(0);

    async function disconnect(){
      try {
          deactivate();
      }catch (exc){
          console.log(exc);
      }
  }


    async function getBalance(){
      let c = loadContract(library,bep20,token);
      let resp= await c.methods.balanceOf(account).call();
      //console.log(resp);
      setBalance(resp);
  }

  async function getRewards(){
    let c = loadContract(library,pool,pooladd);
    let resp = await c.methods.withdrawableRewardsOf(account).call();
    setReward(Number(resp));
}

async function getStaked(){
    let c = loadContract(library,pool,pooladd);
    let resp = await c.methods.getTotalDeposit(account).call();
    setStaked(Number(resp));
}

async function getDeposits(){
  let c = loadContract(library,pool,pooladd);
  let resp = await c.methods.getDepositsOf(account).call();
  console.log(resp);
  setDeposits(resp);
}

  async function getApy(){
    await calculateAP(library,pool,pooladd,false,setApy,600);
}

  async function getLiquidity(){
    let c = loadContract(library,pool,pooladd);
    let resp = await c.methods.totalSupply().call();
    //console.log(resp * 25.56 / 10**18);
    getAprRate(totalReward,resp / 10**18);
    setTotal(resp / 10**18);
  }


  async function getTotalReward(){
    let c = loadContract(library,bep20,token);
    let resp = await c.methods.balanceOf(pooladd).call();
    getAprRate(resp / 10**18,totalSupply);
    setTReward(resp / 10**18);
  }
  

  function formatStakedAmount(amount:number){
    amount = round(amount * price);
    return formatNumber(amount);

  }

  function getAprRate(totalReward:number,totalSupply:number){
    if (active){
      if (totalSupply != 0){ setAprRate(round((totalReward / totalSupply) * 100))}
    }
  }

  

   

    useEffect(
        () => {
            (async ()=>{
              
              
              if (active && library){
                await getApy();

                await getLiquidity();
                await getTotalReward();
            }
            let p = await getPrice();
            setPrice(p);
            
          
          
          }
            

            )();
            
        },
        [active,account,library,totalReward,totalSupply]
    )


    

    const html = (
  <div id="page-content-wrapper">
    {/* Top navigation*/}
      <TopNav show={[show,setShow]} />
    {/* Page content*/}
    <div className="right-side">
      <div className="container-fluid">
        <div className="row mt-4">
          <h1>Staking</h1>
          <p>Stake ABC Tokens and earn rewards</p>
        </div>
        <div className="row mt-5">
          <div className="left">
            <i className="fa fa-circle fa-4x" />
          </div>
          <div className="right">
            <h4>ABC Staking</h4>
            <span className="badge btn-connect">ETH Rinkeby</span>
            <a href={"https://rinkeby.etherscan.io/address/"+pooladd} className="badge">Contract Testnet <i className="fa fa-external-link-alt" /></a>
            <span className="badge">APY: {AprRate*2}%</span>
          </div>
        </div>
        <div className="row mt-4">
          <StakeCard balance={balance} rate={AprRate} getBalance={getBalance} getDeposits = {getDeposits} getStaked={getStaked} getRewards={getRewards} getLiquidity={getLiquidity} getStakedRewards={getTotalReward} />
          <Reward reward={reward} deposits={deposits} price={price} setReward={setReward} staked={staked} setStaked={setStaked} getRewards={getRewards} getStaked={getStaked} />
        </div>
        <div className="row my-4">
          <div className="col-md-12">
            <div id="accordion">
              <div className="card accordion">
                <div className="card-header accordion-header" id="headingOne">
                  <h5 className="mb-0">
                    <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      <i className="fa fa-chevron-up" /> &nbsp;About this staking
                      pool
                    </button>
                  </h5>
                </div>
                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                  <div className="card-body">

                    <DepositHistory getBalance={getBalance} deposits={deposits} setDeposits={setDeposits} getDeposits={getDeposits} />





                    <div className="row">
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Total Staking rewards</label>
                              <div className="input-group">
                                <input type="text" disabled={true} className="form-control input-about" value={formatStakedAmount(totalReward)} />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Total Pool Liquidity</label>
                              <div className="input-group">
                                <input type="text" disabled={true} className="form-control input-about" value={formatStakedAmount(totalSupply)} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Withdrawal Fee</label>
                              <div className="input-group">
                                <input type="text" disabled={true} className="form-control input-about" defaultValue="0%" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-12">
                            <label>Staking address</label>
                            <div className="input-group">
                              <input type="text" disabled={true} className="form-control input-about" defaultValue={pooladd} />
                              <div className="input-group-append">
                                <a href={"https://rinkeby.etherscan.io/address/"+pooladd} className="
                                    input-group-text input-group-about-text
                                  " id="basic-addon2"><i className="fa fa-external-link-alt" /></a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-md-12">
                            <label>Token address</label>
                            <div className="input-group">
                              <input type="text" disabled={true} className="form-control input-about" defaultValue={token} />
                              <div className="input-group-append">
                                <a href={"https://rinkeby.etherscan.io/address/"+token} className="
                                    input-group-text input-group-about-text
                                  " id="basic-addon2"><i className="fa fa-external-link-alt" /></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Token Rate</label>
                          <p>1 ABC <i className="fa fa-circle" /> = ${price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <LockedReward />
      </div>
    </div>
  </div>
  
 

);



    return <div className="d-flex" id="wrapper">
        <Sidebar current={props.current}/>
        {html}
        <ModalConnect show={show} setShow={setShow} />
    </div>;

}


export default Staking;