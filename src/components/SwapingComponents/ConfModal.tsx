import React,{useState} from "react";
import { Modal } from "react-bootstrap";



export default function ConfModal({show,closeHandler,data,platform,id,address}:any){
    function close(f:any){
        let temp = {...data};
        temp.show = false;
        closeHandler(temp);
    }

    const html = (
        <Modal className="coin-modal" show={show} onHide={close}>
          <Modal.Header className="bg-black">
              
            
          </Modal.Header>
          <Modal.Body className="bg-black">

            <div className="text-center">
              <h4>{platform + "Exchange Order Details"}</h4>
              <p>{"Your Exchange ID is : " + id }</p>
              <div className="h6">
                Deposit funds<br />
                <span className="badge badge-secondary">{address}</span>
              </div>
            </div>

           
          </Modal.Body>
        </Modal>
      );

    return html;





}