import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function TablePaginationDemo(props: any) {
  const table_data = props;
  const {count, page, rowsPerPage, setPage, setRowsPerPage} = props

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      style={{color:"white"}}
    />
  );
}
