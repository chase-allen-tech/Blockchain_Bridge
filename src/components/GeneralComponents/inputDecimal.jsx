import React, {useEffect, useState} from "react";

// export class InputDecimal extends React.Component {
//   constructor(prop) {
//     super(prop);
//     this.state = { input: "" };
//     this.start = 0;
//   }

//   change = e => {
//     this.start = e.target.selectionStart;
//     let val = e.target.value;
    
//     val = val.replace(/([^0-9.]+)/, "");
//     //val = val.replace(/^(0|\.)/, "");
//     const match = /(\d{0,9})[^.]*((?:\.\d{0,9})?)/g.exec(val);
//     const value = match[1] + match[2];

//     e.target.value = value;

//     this.setState({ input: value });
//     this.props.updateVal(value)
//     if (val.length > 0) {
//       e.target.value = value;
//       e.target.setSelectionRange(this.start, this.start);
//       this.setState({ input: value});
//         this.props.updateVal(value)
//     }
//     if(val.length > 8){
//       document.querySelectorAll('.Curr-input')[0].style.fontSize = '22px';
//       document.querySelectorAll('.Curr-input')[1].style.fontSize = '22px';
//       // e.target.style.fontSize = '22px';
//       e.target.style.paddingTop = '10px';
//     }else{
//       // e.target.style.fontSize = '37px';
//       document.querySelectorAll('.Curr-input')[0].style.fontSize = '37px';
//       document.querySelectorAll('.Curr-input')[1].style.fontSize = '37px';
//       e.target.style.paddingTop = '0';
//     }
//   };

//   // blur = e => {
//   //   const val = e.target.value;
//   //   if (val.length > 0) {
//   //     e.target.value = Number(val).toFixed(2);
//   //     this.setState({ input: e.target.value });
//   //   }
//   // };

//   render() {
//     return (
//       <span>
//         <input
//           type="text"      
//           onBlur={this.blur}
//           onChange={this.change}
//           value={this.props.val}
//           // style={{ paddingTop: "10px" }}
//           {...this.props}
//         />
        
//       </span>
//     );
//   }
// }
function InputDecimal (props)  {
  const [input, setInput] = useState("");
  // const [start, setStart] = useState(0);
  useEffect(() => {
    if(props.fontStyle){
      document.querySelectorAll('.Curr-input')[1].style.fontSize = '22px';
      document.querySelectorAll('.Curr-input')[1].style.paddingTop = '10px';
    }else{
      document.querySelectorAll('.Curr-input')[1].style.fontSize = '37px';
      document.querySelectorAll('.Curr-input')[1].style.paddingTop = '0';
    }
  }, [props.fontStyle]); 

  const change = e => {
    // setStart(e.target.selectionStart);
    let val = e.target.value;

    val = val.replace(/([^0-9.]+)/, "");
    const match = /(\d{0,9})[^.]*((?:\.\d{0,9})?)/g.exec(val);
    const value = match[1] + match[2];

    e.target.value = value;

    setInput(value);
    props.updateVal(value);
    if (val.length > 0) {
      e.target.value = value;
      // e.target.setSelectionRange(start, start);
      setInput(value);
      props.updateVal(value)
    }

    if(val.length > 8){
      e.target.style.fontSize = '22px';
      e.target.style.paddingTop = '10px';
    } else {
      e.target.style.fontSize = '37px';
      e.target.style.paddingTop = '0';
    }
  }

    return (
      <span>
        <input
          type="text"      
          //onBlur={blur}
          onChange={change}
          value={props.val}
          // style={{ paddingTop: "10px" }}
          {...props}
        />
        
      </span>
    );
};

export default InputDecimal;
