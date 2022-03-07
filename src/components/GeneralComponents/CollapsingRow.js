import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

import { formatNumber } from "../../utils/index";
import { format } from 'path';
import ExchangeCard from '../FarmsComponents/ExchangeCard';
import { useWeb3React } from '@web3-react/core';


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "black",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function CollapsingRow(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const { account, active, chainId, library } = useWeb3React();

  return (
    <React.Fragment>
      <StyledTableRow key={row.id} sx={{ '& > *': { borderBottom: 'unset' } }}>

        <TableCell component="th" scope="row">
          {row.pair}
        </TableCell>
        <TableCell align="center"><img className='farm-icon' src={row.icon} /></TableCell>
        <TableCell align="center">{row.farm}</TableCell>
        <TableCell align="center">{row.earned}</TableCell>
        <TableCell align="center">{row.apr}%</TableCell>
        <TableCell align="right">${formatNumber(row.liquidity)}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </StyledTableRow>
      {
        account && active ? <StyledTableRow key={row.id}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <ExchangeCard data={row} />
            </Collapse>
          </TableCell>
        </StyledTableRow> :

          <StyledTableRow key={row.id}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <ExchangeCard data={"connect"} />
              </Collapse>
            </TableCell>
          </StyledTableRow>
      }
    </React.Fragment>
  );
}

export default CollapsingRow;