import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  cell: {
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    // overflow: 'auto'
  },
  row: {
    whiteSpace: 'nowrap',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  title: {
    flex: '1 1 100%',
  },
  show: {
    color: theme.palette.green.main,
    // cursor: 'pointer',
    // marginRight: 6,
  },
  edit: {
    color: theme.palette.orange.main,
    // cursor: 'pointer',
    // marginRight: 6,
  },
  delete: {
    color: theme.palette.red.main,
    // cursor: 'pointer',
    // marginRight: 6,
  },
}));
