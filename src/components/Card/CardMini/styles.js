import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    'display': 'flex',
    'boxShadow': '0 1px 4px 0 rgba(0, 0, 0, 0.50)',
    'borderRadius': '6px',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: 'transform .3s',
    },
  },
  cardContent: {
    padding: 10,
  },
  quantity: {
    fontWeight: 'bold',
  },
  icon: {
    color: theme.palette.white.main,
  },
  blue: { background: theme.palette.blue.main },
  orange: { background: theme.palette.orange.main },
  green: { background: theme.palette.green.main },
  purple: { background: theme.palette.purple.main },
  red: { background: theme.palette.red.main },
  primary: { background: theme.palette.primary.main },
  second: { background: theme.palette.orange.main },
  success: { background: theme.palette.green.main },
  warning: { background: theme.palette.purple.main },
  error: { background: theme.palette.red.main },
}));
