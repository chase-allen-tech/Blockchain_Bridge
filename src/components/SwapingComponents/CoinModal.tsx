import React,{useState} from "react";
import { Modal } from "react-bootstrap";

function CoinModal({ show, setShow, currencies, handleCurr }: any) {

    const [filtered,setFiltered] = useState(currencies);



    function filter(e:any){
        let t = e.target;
        let v = t.value.toLowerCase();
        if (v.length == 0){
            setFiltered(currencies);
        }else{
            let res = [];
            for (let i = 0 ; i < currencies.length; i++){
                if (currencies[i].symbol.toLowerCase().includes(v)){
                    res.push(currencies[i]);
                }

            }
            setFiltered(res);
        }
        
    }


  const html = (
    <Modal className="coin-modal" show={show} onHide={setShow}>
      <Modal.Header className="bg-black">
          <div className="vertical">
          <h4 className="modal-title" id="exampleModalLabel">
          Select Coin
        </h4>
        <div className='coin-search'>
          
            <input onChange={filter} placeholder="Search by Name" className="form-control form-control-lg mt-4 search-coin" />
        </div>
          </div>
        
      </Modal.Header>
      <Modal.Body className="bg-black">
        <div>
          {filtered.map((e:any,i:number) => {
              return (
            <div key={i} className="select-container" onClick={() => handleCurr(currencies.indexOf(e))}>
            <img src={e.logoURI} className="selectcoin" />{" "}
            <span className="p"> {e.symbol}</span>
            <hr />
          </div>
              )
          })}
        </div>
      </Modal.Body>
    </Modal>
  );

  return html;
}



export default CoinModal;