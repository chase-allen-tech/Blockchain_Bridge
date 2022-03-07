import { useWeb3React } from '@web3-react/core';
import React , {useEffect,useState} from 'react';
import {calculateAP, loadContract, round, timeConverter, toFixed} from '../../utils';
import { bep20, pool } from '../../wallet/abis';
import { pooladd, token } from '../../wallet/addresses';
import {  useToasts } from 'react-toast-notifications';




function DepositHistory(props:any){
    const { active,account , deactivate ,library } = useWeb3React();
    const [deposits,setDeposits] = [props.deposits,props.setDeposits];
    const {addToast} = useToasts();

    const getDeposits = props.getDeposits;

    async function withdraw(i:number){
        let c = loadContract(library,pool,pooladd);
        c.methods.withdraw(String(i),account).send({from:account}).on('receipt',(receipt:any) => {
            addToast("Transaction Confirmed", {
                appearance: 'success',
                autoDismiss: true,
              })
            
              getDeposits();
              props.getBalance();

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
    }




    useEffect(()=>{
        (async () => {
            if (active){
                console.log('fetching data');
                await getDeposits();
            }
            
        }
      )()
      }
          , [active,account,library]
      )



    const html = <div className="row mb-3">
    <div className="col-md-12">
      <h5>Deposit History</h5>
      <div className="table-responsive">
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {deposits.map((e:any,i:number) => {
                let [date,time] = timeConverter(e[2]);
                return (
                <tr>
                <th scope="row">{i}</th>
                <td>{toFixed(round(e[0] / 10**18))}</td>
                <td>{date}</td>
                <td>{time}</td>
                <td>
                  <button onClick={() => withdraw(i)} type="button" className="btn btn-connect">Withdraw</button>
                </td>
              </tr>
                )
            })}
            
            {/* <tr>
              <th scope="row">2</th>
              <td>$5632</td>
              <td>22 Nov 2021</td>
              <td>11:02 PM</td>
              <td>
                <button type="button" className="btn btn-connect">Withdraw</button>
              </td>
            </tr> */}
        
            
          </tbody>
        </table>
      </div>
    </div>
  </div>;



    return deposits.length != 0 ? html : <div></div> ;



}


export default DepositHistory;