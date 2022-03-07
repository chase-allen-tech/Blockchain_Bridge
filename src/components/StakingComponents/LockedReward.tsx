import { useWeb3React } from '@web3-react/core';
import React , {useEffect,useState} from 'react';
import {calculateAP, loadContract, round, timeConverter, toFixed} from '../../utils';
import { bep20, pool } from '../../wallet/abis';
import { escrowadd, pooladd, token } from '../../wallet/addresses';
import {  useToasts } from 'react-toast-notifications';




function LockedReward(props:any){
    const { active,account , deactivate ,library } = useWeb3React();
    const [escrowed,setEscrowed] = useState([]);
    const {addToast} = useToasts();
    const [Symbol,setSymbol] = useState("ABC");

    async function withdraw(i:number){
        let c = loadContract(library,pool,escrowadd);
        c.methods.withdraw(String(i),account).send({from:account}).on('receipt',(receipt:any) => {
            addToast("Transaction Confirmed", {
                appearance: 'success',
                autoDismiss: true,
              })
            
              getLocked();
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

    async function getTokenSymbol(){
        let c = loadContract(library,bep20,token);
        let resp = await c.methods.symbol().call();
        setSymbol(resp);
    }

    

    async function getLocked(){
        let c = loadContract(library,pool,escrowadd);
  let resp = await c.methods.getDepositsOf(account).call();
  console.log(resp);
  setEscrowed(resp);
    }


    useEffect(()=>{
        (async () => {
            if (active){
                console.log('fetching data');
                await getTokenSymbol();
                await getLocked();
            }
            
        }
      )()
      }
          , [active,account,library]
      )

      const html:any =<div className="row my-4">
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

                    



                  <div className="row mb-3">
    <div className="col-md-12">
      <h5>Deposit History</h5>
      <div className="table-responsive">
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Token</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {escrowed.map((e:any,i:number) => {
                let [date,time] = timeConverter(e[2]);
                return (
                <tr>
                <th scope="row">{i}</th>
                <th>{Symbol}</th>
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
  </div>

                    
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      
      
      



    return escrowed.length != 0 ? html : <div></div> ;




}


export default LockedReward;