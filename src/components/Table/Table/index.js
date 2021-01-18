import React from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from './styles';

const Pagination = ({ emptyData, loading, columns, children }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {columns}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && (
            <TableRow key="loading">
              <TableCell align="center" colSpan={100}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
          {!loading && emptyData && (
            <TableRow key="empty">
              <TableCell align="center" colSpan={100}>
              Não há dados
              </TableCell>
            </TableRow>
          )}
          {!loading && !emptyData && <>{children}</>}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Pagination;
