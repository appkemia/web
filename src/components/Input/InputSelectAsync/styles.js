import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  asterisk: {
    color: 'red',
  },
  option: {
    // '&[data-focus="true"]': {
    //   backgroundColor: theme.palette.blue.light,
    // },
    '&:hover': {
      backgroundColor: theme.palette.blue.light,
    },
    '&[aria-selected="true"]': {
      backgroundColor: theme.palette.blue.main,
    },
  },
}));

export default styles;
