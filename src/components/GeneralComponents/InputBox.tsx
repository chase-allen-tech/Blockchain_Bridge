// import {InputBase, Stack, Link } from "@mui/material"

// function InputSample(props: any) {
//   return ( 
//     <Stack alignItems="center" direction="row" spacing={5} justifyContent="space-between" sx={{bgcolor: "#1a2b44", px: 2, py:1, borderRadius: 1}}>
//       <InputBase 
//       	sx={{color: 'white'}} 
//       	onChange={e => props.setAmount(e.target.value)}
//       	value={props.value} />
//       <Link>MAX</Link>
//     </Stack>
//    )
// }

// export default InputSample


import {InputBase, Stack, Link } from "@mui/material"

function InputSample(props: any) {
	const setAmount = (e) => {
    console.log("input=>", e.target.value)
    console.log("props.balance=>", props.balance)
		if (Number(props.balance) >= Number(e.target.value)) {
			props.setAmount(e.target.value)
		}
	}

  return ( 
    <Stack alignItems="center" direction="row" spacing={5} justifyContent="space-between" sx={{bgcolor: "#1a2b44", px: 2, py:1, borderRadius: 1}}>
      <InputBase 
      	sx={{color: 'white'}} 
      	onChange={setAmount}
      	value={props.value}
      	disabled={props.balance == 0} />
      <Link onClick={e => props.setAmount(props.balance)}>MAX</Link>
    </Stack>
   )
}

export default InputSample