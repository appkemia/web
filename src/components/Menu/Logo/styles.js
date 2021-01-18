import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  menuButton: {
    marginLeft: theme.spacing(2),
    color: theme.palette.primary.contrastText,
  },
  text: {
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
    fontSize: 32,
    marginLeft: 10,
    textAlign: 'left',
    textTransform: 'none',
  },
  image: {
    height: (theme.spacing(5) * 122) / 100,
    // width: theme.spacing(20),
  },
}));
