import * as React from 'react';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Stack, Link } from "@mui/material";
import Web3 from 'web3';

const PrettoSlider = styled(Slider)({
  color: '#52af77',
  height: 15,
  '& .MuiSlider-track': {
    border: 'none',
    backgroundColor: '#1a2b44',
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#435a7a',
  },
  '& .MuiSlider-thumb': {
    height: 26,
    width: 26,
    backgroundColor: '#1a2b44',
    border: '6px solid #2bf6d4',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  }
});

let web3 = new Web3("https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161")

export default function CustomizedSlider(props: any) {
  const [gas, setGas] = React.useState(0);
  const [slow, setSlow] = React.useState(0);
  const [fast, setFast] = React.useState(0);
  const [ethPrice, setEthPrice] = React.useState(0);
  const [gasPrice, setGasPrice] = React.useState(0);

  React.useEffect(() => {
    getGasState();
  }, []);

  const setValue = (e) => {
    setGas(e.target.value);
    console.log(e.target.value)
    props.setGasLimit(e.target.value)
  }

  const getGasState = async () => {
    let gasState = await (await fetch("https://ethgasstation.info/api/ethgasAPI.json?api-key=1ecdbc34bc88791dc886a1c055d8f975a1aeef84c8d6cc6c3dc4fd89780f")).json()
    let _ethPrice = (await (await fetch("https://api.etherscan.io/api?module=stats&action=ethprice&apikey=RR34X3FQPI37TSKY3PDHUGFHYMXG6UWG2Y")).json()).result.ethusd
    console.log("ethPrice=>", _ethPrice)
    setSlow(gasState.safeLow / 10)
    setFast(gasState.fastest / 10)
    setGas((gasState.fastest + gasState.safeLow) / 20)
    console.log(gasState.fastest / 10, gasState.safeLow / 10, (gasState.fastest + gasState.safeLow) / 20);
    let _gasPrice = await web3.eth.getGasPrice();
    setEthPrice(_ethPrice)
    setGasPrice(_gasPrice)
    console.log(_gasPrice);
    props.setGasLimit((gasState.fastest + gasState.safeLow) / 20)
  }

  const onClick = (val: any) => {
    setGas(val);
    props.setGasLimit(val);
  }

  return (
    <>
      <Stack alignItems="center" direction="row" spacing={5} justifyContent="space-between" sx={{ px: 1, py:1, borderRadius: 1}}>
        <Link>Set Gas</Link>
        <Link sx={{ color: '#2bf6d4 !important' }}>{gas} GWei (~${(gas * gasPrice * ethPrice / 10**15).toFixed(2)})</Link>
      </Stack>

      <Box sx={{ width: "100%", px: "9px" }}>
        <PrettoSlider
          valueLabelDisplay="off"
          aria-label="pretto slider"
          onChange={setValue}
          value={Number(gas)}
          min={Number(slow)}
          max={Number(fast)}
        />
      </Box>

      <Stack alignItems="center" direction="row" spacing={5} justifyContent="space-between" sx={{ px: 2, py:1, borderRadius: 1}}>
        <Link onClick={e => onClick(slow)}>Slow</Link>
        <Link onClick={e => onClick((fast + slow) / 2)}>Standard</Link>
        <Link onClick={e => onClick(fast)}>Fast</Link>
      </Stack>
    </>
  );
}
