import { useWeb3React } from '@web3-react/core';
import React , {useEffect,useState} from 'react';
import { loadContract, round, toFixed } from '../../utils';
import { bep20, pool } from '../../wallet/abis';
import { pooladd, token } from '../../wallet/addresses';
import {  useToasts } from 'react-toast-notifications';



function Reward(props:any){
    const { active,account , deactivate ,library } = useWeb3React();
    const [reward,setReward] = [props.reward,props.setReward];
    const [staked,setStaked] = [props.staked,props.setStaked];
    const [Symbol,setSymbol] = useState("ABC");
    const {addToast} = useToasts();


    const getRewards = props.getRewards;
    const getStaked = props.getStaked;
    

    async function getTokenSymbol(){
      try{
        let c = loadContract(library,bep20,token);
        let resp = await c.methods.symbol().call();
        setSymbol(resp);
      }catch(e:any){
        console.log(e);
      }
        
    }

    async function claimRewards(){
        let c = loadContract(library,pool,pooladd);
        c.methods.claimRewards(account).send({from:account}).on('receipt',(receipt:any) => {
            addToast("Transaction Confirmed", {
                appearance: 'success',
                autoDismiss: true,
              })
            
              getRewards();
              getStaked();

        }).on('transactionHash',(hash:any) => {
            addToast("Transaction Created : "+hash, {
                appearance: 'success',
                autoDismiss: true,
              })
        }).on('error',(err:any)=>{
            addToast('Transaction Failed', {
                appearance: 'error',
                autoDismiss: true,
              })
        }).then((resp:any) => console.log(resp))
    }

    function getRewardRate(){
      let avgduration = 0;
      if (props.deposits.length > 0){
        for (let i = 0; i < props.deposits.length ; i++){
          avgduration += (props.deposits[i][2] - props.deposits[i][1])
        }
        avgduration /= props.deposits.length;
        avgduration /= 3600;
      }
      
      return avgduration;

    }


    useEffect(()=>{
        (async () => {
            if (active){
                console.log('fetching data');
                await getTokenSymbol();
                await getRewards();
                await getStaked();
            }
            
        }
      )()
      }
          , [active,account,library]
      )

    const html = <div className="col-md-6">
    <div className="card box-1">
      <div className="card-header">
        <div className="row text-center">
          <div className="col-md-2">
            <i className="fa fa-circle fa-3x" />
          </div>
          <div className="col-md-3">
            <h4>{toFixed(round(staked/ 10**18))}</h4>
            <span>{Symbol} Staked</span>
          </div>
          <div className="col-md-3">
            <h4>{toFixed(round(reward / 10 **18))}</h4>
            <span>Open Claims</span>
          </div>
          { active && library ?  <div className="col-md-4">
            <button onClick={claimRewards} type="button" className="btn btn-approve btn-block">
              Claim
            </button>
          </div> : ''}
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <img src="assets/img/trophy.png" />
            <h1 className="mt-2">{ active   ?  toFixed( round(reward /(10**18*4))) :0 } </h1>
            <small>per week</small>
          </div>
          <div className="col-md-6 mx-auto">
            <img src="assets/img/trophy.png" />
            <h1 className="mt-2">{ active   ?  toFixed(round(reward/10**18)) : 0 }</h1>
            <small>per month</small>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="row">
          <div className="col-md-12">
            <p className="text-center pt-2">
              <small>Your approximate reward (by ${ active ? toFixed(round((reward / (10**18 *  4)) * props.price)) : 0  })</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>;
    
    return (html);
}


export default Reward;