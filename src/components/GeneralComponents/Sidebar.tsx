import React from 'react';
import {useState,useEffect} from 'react';
import { useWeb3React } from '@web3-react/core';
import { truncate } from '../../utils';
import {Link} from "react-router-dom";
import SelectNetwork from "./selectBox";

function Sidebar(props:any){

    const [flag, setFlag] = useState(false);

    const {active,account,deactivate} = useWeb3React();


    async function disconnect(){
      try {
       
          deactivate();
      }catch (exc){
          console.log(exc);
      }
      
  }

    const html = <div className="bg-black" id="sidebar-wrapper">
      <div className="sidebar-heading bg-black">ABC PROJECT</div>
      <div className="sidebar-footer bg-black">
        <a className="btn btn-lg btn-outline" href="#!"><span className="fa fa-user icon" />{active ? truncate(account) : "0x0"}</a>
        <Link className= {props.current=='stake' ? "btn btn-lg btn-sidebar active" : "btn btn-lg btn-sidebar" }   to="/"><span className="fa fa-wallet icon" />Transaction</Link>
        <Link className={props.current=='swap' ? "btn btn-lg btn-sidebar active" : "btn btn-lg btn-sidebar" }  to="/swap"><span className="fa fa-sync icon" />Swap</Link>
        <a className="btn btn-lg btn-sidebar" href="#!"><span className="fa fa-coins icon" />Liquidity</a>
        <Link className={props.current=='farm' ? "btn btn-lg btn-sidebar active" : "btn btn-lg btn-sidebar" }  to="/farm"><span className="fa fa-seedling icon" />Farm</Link>
        <Link className={props.current=='bridge' ? "btn btn-lg btn-sidebar active" : "btn btn-lg btn-sidebar" }  to="/bridge"><span className="fa fa-link icon" />Bridge</Link>
        {/*<a className="btn btn-lg btn-sidebar" href="#!"><span className="fa fa-link icon" />Bridge</a>*/}
        <a className="btn btn-lg btn-sidebar" href="#!"><span className="fa fa-piggy-bank icon" />Staking</a>
        {/* <SelectNetwork  /> */}
        {active ? <a onClick={disconnect} className="btn btn-lg btn-logout bottom-position-logout"><span className="fa fa-sign-out-alt icon"  />Logout</a> : ''}
      </div>
    </div>
;


    return html;

}


export default Sidebar;