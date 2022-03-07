import React from 'react'
import Switch from '@mui/material/Switch';

export default function SwapSettings(props:any) {

    const [slippage,setSlippage] = props.slip;
    const [speed,setSpeed] = props.speed;
    const [unlimited,setUnlimited] = props.unlimited;
    
    function handleClose(){
        props.setOpenSettings(false);
    }

    function handleSlippage(val:number){
        setSlippage(val);
    }

    function handleSpeed(val:string){
        setSpeed(val)
    }

    function handleChecked(val:any){
        let v = val.target.checked;
        setUnlimited(v);
    }

      return (
        <div className="card color-box">
          <p className="card-title mb-3">
            <span>
              <a onClick={handleClose}>
                <img src="assets/img/left-arrow.png" className="pr-2" />Swap
              </a>
            </span>
            {/* <span className="float-right">
              <a className="btn-sm btn-primary">
                <img src="assets/img/settings.png" />
              </a>
            </span> */}
          </p>
          
          <div className="settings">
            <div className="card card-from">
              <div className="card-body">
                <h6 className="card-title">
                  Transaction Settings
                </h6>
                <div className="mt-3">
                  <span className="plighttext">Slippage Tolerance</span>
                  <span className="plighttext float-right">{slippage}%</span>
                  <div className="mt-1">
                    <span onClick={() => handleSlippage(1)} className={slippage == 1 ?"btn-round active" : "btn-round" }>1.00%</span>
                    <span onClick={() => handleSlippage(2)} className={slippage == 2 ?"btn-round active" : "btn-round" }>2.00%</span>
                    <span onClick={() => handleSlippage(3)} className={slippage == 3 ?"btn-round active" : "btn-round" }>3.00%</span>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="plighttext">Transaction Speed</span>
                  <span className="plighttext float-right">{speed}</span>
                  <div className="mt-1">
                    <span onClick={() => handleSpeed("Standard")} className={speed == "Standard" ?  "btn-round active" :  "btn-round" } >Standard (16 Gwei)</span>
                    <span onClick={() => handleSpeed("Fast")} className={speed == "Fast" ?  "btn-round active" :  "btn-round" }>Fast (17 Gwei)</span>
                    <span onClick={() => handleSpeed("Instant")} className={speed == "Instant" ?  "btn-round active" :  "btn-round" }>Instant (18 Gwei)</span>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="plighttext">Allowance</span>
                  <span className="plighttext float-right">{unlimited == false?"Unlimited":"Limited"}</span>
                  {/* <div className="mt-1">
                    <input checked={unlimited} onChange={handleChecked} type="checkbox" defaultChecked data-toggle="toggle" data-size="sm" data-on="Unlimited" data-off="Limited" data-style="ios" />
                  </div> */}
                  <div className="mt-1">
                    <Switch checked={unlimited} onChange={handleChecked}  />
                  </div>
                </div>
                {/* <div className="mt-3">
                  <span className="plighttext">Estimated Gas Fee</span>
                  <span className="plighttext float-right">$31.14</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
    )
}
