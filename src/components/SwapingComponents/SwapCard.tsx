import React, { useEffect } from "react";
import { useWeb3React } from '@web3-react/core';
import { ETHER, Token } from "@uniswap/sdk";
import { formatNumber, toFixed } from "../../utils";
import Web3 from "web3";
import { getCoinBalance } from "../../hooks/loadBalance";
import { BigNumber } from "@0x/utils";
import  InputDecimal from "../GeneralComponents/inputDecimal";
import { toNumber, values } from "lodash";

function SwapCard(props: any) {

  function openModal() {
    props.setSide(props.side);
    props.setShow(!props.show)
  }
  
  // function fontChange( e: any) {
  //   e.preventDefault();
   
  //   let length = e.target.value.length;
  //   console.log("aaaaaaaaaaa", length)
  //   if (length > 10) {
  //     e.target.value.style.fontsize = "20px";
  //   }
  // }

  const { account, active, library, chainId } = useWeb3React();

  useEffect(() => {
    (async () => {
      let currency;
      if (props.selected && props.selected.symbol) {
        currency = new Token(props.selected.chainId, props.selected.address, props.selected.decimals, props.selected.symbol, props.selected.name);
      }
      let selectedCurrencyBalance = await getCoinBalance(
        account ?? undefined,
        active,
        library,
        props.selected && props.selected.symbol === "ETH" && props.selected.symbol ? ETHER : currency
      );
      props.onChangeBalance(selectedCurrencyBalance, props.side);
    })()

  }, [props.address, chainId, account]);

  const html = <div className={props.side == "from" ? "card card-from" : "card card-to mt-2"}  >
    <div className="card-body">
      <p className="card-title">
        <small> {props.side == "from" ? "From" : "To (estimated)"}</small>
        {active ? <small className="float-right">Balance: {(() => {
          // console.log(props.selected);
          // let v = new BigNumber(props.selected.max);
          // return Web3.utils.fromWei(v.toString(), 'ether')
          let balance = props.balance;
          let newBalance = Web3.utils.fromWei(new BigNumber(balance).toString(), 'ether');
          return toNumber(newBalance).toFixed(5);
        })()}</small> : ""}
      </p>
      <p className="card-title mt-3 select-input-container">
        {props.selected && props.selected.symbol ? <span className="selector" onClick={openModal}>
          <img src={props.selected.logoURI} className="mb-4" /> <span className="h1"> {props.selected.symbol}</span> <i className="fa fa-chevron-down icon-left" />
        </span> : <span className="selector" onClick={openModal}>
          <span className="h1"> Select Coin</span> <i className="fa fa-chevron-down icon-left" />
        </span>}

        {/* <input className="float-right Curr-input" disabled={props.side == 'from' ? false : true} defaultValue={props.side == "from" ? props.val : props.rate ?  props.rate.rate * props.val : "0"} onBlur={(e:any) => props.handleValue(e,props.side)}  title="Token Amount" autoComplete="off" autoCorrect="off" type="number" step="any" pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0.0" minLength={1} maxLength={79}  /> */}

        <InputDecimal 
          className="float-right Curr-input" 
          fontStyle={(props.rate && Number(props.val)) ? (props.rate.rate * props.val).toFixed(5).length > 8 : false}
          disabled={props.side == 'from' ? false : true} 
          val={props.side === 'from' ? props.val : (props.rate && Number(props.val)) ? (props.rate.rate * props.val).toFixed(5) : "0"} 
          updateVal={(v: any) => props.handleValue(v, props.side)} />
      </p>
      <p className="card-title">
        {props.selected ? <small>{props.selected.name}</small> : ""}

        {props.from && props.rate && props.to && props.side != "from" ? <small className="float-right">1 {props.from.symbol} ~= {props.rate.rate} {props.to.symbol}</small> : ""}

      </p>

    </div>
    {props.side == "from" ? <div onClick={props.switchHandler} className="text-center">
      <img src="/assets/img/swap.png" className="img-fluid swap-button" />
    </div> : ""}
  </div>

  return html;
}

export default SwapCard