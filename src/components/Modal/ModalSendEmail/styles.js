import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    outline: 0,
    display: 'inline-block',
    position: 'relative',
    // width: '100%',
    width: 320,
    margin: '25px 0',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    borderRadius: '6px',
    color: 'rgba(0, 0, 0, 0.87)',
    background: '#fff',
    overflow: 'initial',
  },
  avatar: {
    margin: '0px',
  },
  icon: {
    paddingTop: '3px',
    paddingLeft: '4px',
    paddingRight: '5px',
    color: '#FFFFFF',
    width: '33px',
    height: '27px',
  },
  flex: {
    display: 'block',
    textAlign: 'right',
  },
  title: {
    paddingBottom: 15,
    marginTop: 0,
    marginBottom: 3,
    color: '#1B3453',
    textDecoration: 'none',
  },
  loading: {
    color: theme.palette.primary.contrastText,
  },
  rootHeader: {
    margin: '-20px 15px 0',
    borderRadius: 3,
    padding: 15,
    float: 'left',
    boxShadow:
      '0 12px 20px -10px rgba(255, 152, 0, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 152, 0, 0.2)',
  },
  spaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: theme.spacing(1),
  },
  blue: { background: theme.palette.blue.main },
  orange: { background: theme.palette.orange.main },
  green: { background: theme.palette.green.main },
  purple: { background: theme.palette.purple.main },
  red: { background: theme.palette.red.main },
  primary: { background: theme.palette.blue.main },
  second: { background: theme.palette.orange.main },
  success: { background: theme.palette.green.main },
  warning: { background: theme.palette.purple.main },
  error: { background: theme.palette.red.main },
}));
