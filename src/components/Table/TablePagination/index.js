import React from 'react';

import TablePagination from '@material-ui/core/TablePagination';

const Pagination = ({
  count,
  rowsPerPage,
  page,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 20, 50, 100, 200]}
      component="div"
      labelRowsPerPage={'labelRowsPerPage'}
      backIconButtonText={'backIconButtonText'}
      nextIconButtonText={'nextIconButtonText'}
      labelDisplayedRows={({ from, to, count }) => {
        return `${from}-${to} ${count}`;
      }}
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
    />
  );
};

export default Pagination;
