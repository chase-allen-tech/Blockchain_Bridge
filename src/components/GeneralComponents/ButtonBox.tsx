import {InputBase, Stack, Link, Button, Typography } from "@mui/material"

function ButtonBox(props: any) {
  return ( 
    <Stack alignItems="center" direction="row" spacing={5} justifyContent="space-between" sx={{bgcolor: "#1a2b44", px: 2, padding: "5px", borderRadius: 1}}>
      <Button sx={{color: 'white', width: "100%", p: 0, fontSize: "1.4rem", px: "15px"}} onClick={props.handleClickOpen('paper')} >
       	{
       		props.token === null ?
       			"- Select"
       			:
       			<div className="w-100 text-left">
	       			<img src={props.token.token_image} alt="" height="30" width="30" className="rounded-circle" />
	       			&nbsp;&nbsp;
	       			{props.token.symbol}
       			</div>
       	}
      </Button>
    </Stack>
   )
}

export default ButtonBox