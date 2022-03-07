import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#262626',
    border: '1px solid #fff',
    fontSize: 16,
    padding: '10px 12px 10px 12px',
    marginLeft : '0px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#fff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

export default function SelectNetwork() {
  const [age, setAge] = React.useState('');
  const handleChange = (event: { target: { value: string } }) => {
    setAge(event.target.value);
  };
  return (
    <div className='selectNetworkWrapper'>
      <FormControl sx={{ m: 1 }} variant="standard" fullWidth className="bottom-position-network">
        <NativeSelect
        //   menuPlacement="top"
          id="demo-customized-select-native"
          value={age}
          onChange={handleChange}
          input={<BootstrapInput />}
          className="text-centerForSelect"
        >
          <option aria-label="None" value="" />
          <option value={1} selected>Ethereum</option>
          <option value={137}>Polygon</option>
        </NativeSelect>
      </FormControl>
    </div>
  );
}
