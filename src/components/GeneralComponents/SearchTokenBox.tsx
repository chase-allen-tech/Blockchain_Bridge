import {InputBase, Stack, Link } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

function InputSample(props: any) {
  return ( 
    <Stack alignItems="center" direction="row" spacing={2} justifyContent="space-between" sx={{bgcolor: "#12171e", px: 2, py:1, borderRadius: 50}}>
      <Link><SearchIcon /></Link>
      <InputBase 
      	sx={{color: 'white', width: '100%'}} 
      	placeholder="Search by name or paste address"
      	onChange={e => props.searchToken(e.target.value)}
      	 />
    </Stack>
   )
}

export default InputSample