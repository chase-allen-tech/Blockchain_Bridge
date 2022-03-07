import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CollapsingRow from '../GeneralComponents/CollapsingRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { makeStyles } from '@mui/styles';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import FilterListIcon from '@mui/icons-material/FilterList';

// import { client } from '../../apollo/client';
// import { GET_FARMS } from '../../apollo/query';


function FarmsTable(props: any) {

  const { rows } = props;

  const [filterValue, setFilterValue] = useState("");
  const [sortBy, setSortBy] = useState<any>("asc");
  const [filteredData, setFilteredData] = useState<any>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (filterValue == "") {
      setFilteredData(rows)
    }
  }, [props]);

  useEffect(() => {
    if (filterValue != "") {
      const filteredFarm: any = [];
      rows.map((item: any) => {
        let pairName = item.pair.toLowerCase();
        if (pairName.includes(filterValue.toLowerCase())) {
          filteredFarm.push(item);
        }
      })
      setFilteredData(filteredFarm)
    } else {
      setFilteredData(rows)
    }
  }, [filterValue]);

  const sortingbypair = () => {
    if (sortBy == "asc") {
      filteredData.sort((a: any, b: any) => (a.pair > b.pair) ? -1 : 1);
      setFilteredData([...filteredData]);
      setSortBy("dec");
    }
    else {
      filteredData.sort((a: any, b: any) => (a.pair > b.pair) ? 1 : -1);
      setFilteredData([...filteredData]);
      setSortBy("asc");
    }
  }

  const sortingbyprovider = () => {
    if (sortBy == "asc") {
      filteredData.sort((a: any, b: any) => (a.provider > b.provider) ? -1 : 1);
      setFilteredData([...filteredData]);
      setSortBy("dec");
    }
    else {
      filteredData.sort((a: any, b: any) => (a.provider > b.provider) ? 1 : -1);
      setFilteredData([...filteredData]);
      setSortBy("asc");
    }
  }

  const sortingbyapr = () => {
    if (sortBy == "asc") {
      filteredData.sort((a: any, b: any) => (a.apr > b.apr) ? -1 : 1);
      setFilteredData([...filteredData]);
      setSortBy("dec");
    }
    else {
      filteredData.sort((a: any, b: any) => (a.apr > b.apr) ? 1 : -1);
      setFilteredData([...filteredData]);
      setSortBy("asc");
    }
  }

  const sortingbyfarm = () => {
    if (sortBy == "asc") {
      filteredData.sort((a: any, b: any) => (a.farm > b.farm) ? -1 : 1);
      setFilteredData([...filteredData]);
      setSortBy("dec");
    }
    else {
      filteredData.sort((a: any, b: any) => (a.farm > b.farm) ? 1 : -1);
      setFilteredData([...filteredData]);
      setSortBy("asc");
    }
  }

  const sortingbyliquidity = () => {
    if (sortBy == "asc") {
      filteredData.sort((a: any, b: any) => (a.liquidity > b.liquidity) ? -1 : 1);
      setFilteredData([...filteredData]);
      setSortBy("dec");
    }
    else {
      filteredData.sort((a: any, b: any) => (a.liquidity > b.liquidity) ? 1 : -1);
      setFilteredData([...filteredData]);
      setSortBy("asc");
    }
  }

  const sortingbyearned = () => {
    if (sortBy == "asc") {
      filteredData.sort((a: any, b: any) => (a.earned > b.earned) ? -1 : 1);
      setFilteredData([...filteredData]);
      setSortBy("dec");
    }
    else {
      filteredData.sort((a: any, b: any) => (a.earned > b.earned) ? 1 : -1);
      setFilteredData([...filteredData]);
      setSortBy("asc");
    }
  }

  const html = (
    <>
      {props.availableSearch && 
        <TextField 
          id="outlined-basic" 
          style={{
            marginBottom: 15,
            borderColor: '#ffffff',
            color: '#ffffff'
          }} 
          label="Filter Pair" 
          variant="outlined" 
          onChange={(e) => setFilterValue(e.target.value)} 
          value={filterValue} 
          endAdornment={<InputAdornment position="end">kg</InputAdornment>}
      />}

      <TableContainer component={Paper}>
        <Table className="table-striped table-dark collapse-table" aria-label="collapsible table" size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell onClick={() => sortingbypair()}>Pair <img src="/assets/icons/sort/sort1.png" width="18px" alt="" /></TableCell>
              <TableCell onClick={() => sortingbyprovider()} align="center">Provider <img src="/assets/icons/sort/sort1.png" width="18px" alt="" /></TableCell>
              <TableCell onClick={() => sortingbyfarm()} align="center">Farm <img src="/assets/icons/sort/sort1.png" width="18px" alt="" /></TableCell>
              <TableCell onClick={() => sortingbyearned()} align="center">Rewards <img src="/assets/icons/sort/sort1.png" width="18px" alt="" /></TableCell>
              <TableCell onClick={() => sortingbyapr()} align="center">APR <img src="/assets/icons/sort/sort1.png" width="18px" alt="" /></TableCell>
              <TableCell onClick={() => sortingbyliquidity()} align="right">Liquidity <img src="/assets/icons/sort/sort1.png" width="18px" alt="" /></TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, i: any) => (
              <CollapsingRow key={filteredData.sort ? "B" + i : "A" + i} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br/>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>)

  return html;

}

export default FarmsTable;