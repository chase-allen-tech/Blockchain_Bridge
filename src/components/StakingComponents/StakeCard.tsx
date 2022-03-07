import { useWeb3React } from '@web3-react/core';
import React , {useEffect,useState} from 'react';
import {calculateAP, formatNumber, loadContract, round, toFixed} from '../../utils';
import { bep20, pool } from '../../wallet/abis';
import { pooladd, token } from '../../wallet/addresses';
import {  useToasts } from 'react-toast-notifications';
import Web3  from 'web3';




function StakeCard(props:any){
    const { active,account , deactivate ,library } = useWeb3React();
    const [duration,setDuration] = useState(0);
    const balance = props.balance;
    const [Symbol,setSymbol] = useState("ABC");
    const [APR,setApr] = useState(100);
    const {addToast} = useToasts();
    const [approved,setApproved] = useState(false);


    const getBalance = props.getBalance;
    const getDeposits = props.getDeposits;
    const getStaked = props.getStaked;
    const getRewards = props.getRewards;

    function handleBar(e:any){
        let val = e.target.value;
        console.log(val);
        /* if (active){
            let temp = val == 0 ? 600 : val * 3600 * 24 * 7;
            
            getApr(temp);
        } */
        setDuration(Number(val));
      }

    async function getTokenSymbol(){
      try{
        let c = loadContract(library,bep20,token);
        let resp = await c.methods.symbol().call();
        setSymbol(resp);
      }catch(e:any){
        console.log(e);
      }
        
    }

    

    async function getApr(period:number){
        await calculateAP(library,pool,pooladd,setApr,false,period);
    }

    async function handleAPR(elem:any){
        let val = elem.target.value;
        console.log(val);
        if (active){
            let temp = val == 0 ? 600 : val * 3600 * 24 * 7;
            
            getApr(temp);
        };
    }

    function getRange(){
        if (duration == 0){
            return 600;
        }else{
            return duration * 7 * 24 * 3600;
        }
    }
    function getAmount(){
        let elem = document.getElementById('amount') as HTMLInputElement;
        if (elem){
            let val:any = elem.value;
            val = Number(val.replace(',','.'))
            if (val == NaN){
                return false;
            }else{
                return val;
            }
        }else{
            return false;
        }


    }

    async function approve(){
        let c = loadContract(library,bep20,token);
        let value = getAmount();
        
        if (value){
          console.log( Web3.utils.toWei(String(value),'ether'));
            c.methods.approve(pooladd,Web3.utils.toWei(String(value),'ether')).send({from:account}).on('receipt',(receipt:any) => {
                addToast("Transaction Confirmed", {
                    appearance: 'success',
                    autoDismiss: true,
                  })
                setApproved(true);
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
           
        }else{
            addToast('Amount Incorrect', {
                appearance: 'error',
                autoDismiss: true,
              })
        }
        
    }

    async function Deposit(){
        let c = loadContract(library,pool,pooladd);
        let value = getAmount();
        
        if (value){
            c.methods.deposit(Web3.utils.toWei(String(value),'ether'),getRange(),account).send({from:account}).on('receipt',(receipt:any) => {
                addToast("Transaction Confirmed", {
                    appearance: 'success',
                    autoDismiss: true,
                  })
                  setApproved(false);
                  getBalance();
                  getRewards();
                  getStaked();
                  getDeposits();
                  props.getLiquidity();
                  props.getTotalReward();
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
            })
           
        }else{
            addToast('Amount Incorrect', {
                appearance: 'error',
                autoDismiss: true,
              })
        }
        
    }


      useEffect(()=>{
        (async () => {
            if (active){
                console.log('fetching data');
                await getTokenSymbol();
                await getBalance();
                await getApr(getRange());
            }
            
        }
      )()
      }
          , [active,account,library]
      )

    

    const html = <div className="col-md-6">
    <div className="card box-1">
      <form>
        <div className="card-body">
          <div className="btn-group btn-group-flex">
            <button type="button" className={duration == 0 ? "btn btn-locked" : "btn btn-flexible" }>
              Flexible
            </button>
            <button type="button" className={duration > 0 ? "btn btn-locked" : "btn btn-flexible" } >Locked</button>
          </div>
          <div className="form-group mt-3">
            <label className="float-left">Lock for: {duration} weeks</label>
            <label className="float-right">Weight: {1 + round(duration / 52)}</label>
            <input type="range" className="custom-range" defaultValue={duration} max={52} onMouseLeave={handleAPR} onChange={handleBar} id="customRange1" />
          </div>
          <div className="form-group mt-3">
            <label className="float-left">Amount</label>
            {active ? <label className="float-right">Balance: {formatNumber(toFixed(balance / 10**18))}</label> : '' }
            
            <div className="input-group">
              <input type="text" id='amount' disabled={active &&  balance != 0 ? false : true} placeholder="0" className="form-control input-amount"   />
              <div className="input-group-append">
                <span className="input-group-text input-group-main-text" id="basic-addon2"><i className="fa fa-circle" />  {Symbol}</span>
              </div>
            </div>
            {active && balance == 0 ?  <small className="form-text">Insufficient funds, your balance is 0 {Symbol}</small> : ''}
            
          </div>
        </div>
        
        <div className="card-footer">
            {active ? <div className="row">
            <div className="col-md-12">
              <h4 className="float-left">Est. APR</h4>
              <h4 className="float-right">{round(props.rate * (1+duration /52))}%</h4>
            </div>
          </div> : ""}
          
          {active && balance != 0 ?<div className="row mt-2">
            <div className="col-md-6">
              <button type="button" onClick={approve} className= {approved ? "btn btn-deposit btn-block"  : "btn btn-approve btn-block"} >
                Approve
              </button>
            </div>
            <div className="col-md-6">
              <button type="button" onClick={Deposit} className={!approved ? "btn btn-deposit btn-block"  : "btn btn-approve btn-block"} >
                Deposit
              </button>
            </div>
          </div> : "" }
          
        </div>
      </form>
    </div>
  </div>;

    return (html);
}


export default StakeCard;