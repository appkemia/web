import { makeStyles } from '@material-ui/core/styles';
import color from 'color';

const makeTextColor = (palette) => ({
  'color': palette.main,
  '&:hover,&:focus': {
    backgroundColor: color(palette.main).alpha(0.08).string(),
  },
});

const makeOutlinedColor = (palette) => ({
  'color': palette.main,
  'border': `1px solid ${color(palette.main).alpha(0.5)}`,
  '&:hover,&:focus': {
    backgroundColor: color(palette.main).alpha(0.08).string(),
  },
});

const makeContainedColor = (palette) => ({
  'backgroundColor': palette.main,
  'color': palette.contrastText,
  'boxShadow': `0 2px 2px 0 ${color(palette.main).alpha(
    0.14
  )}, 0 3px 1px -2px ${color(palette.main).alpha(0.2)}, 0 1px 5px 0 ${color(
    palette.main
  ).alpha(0.12)}`,
  '&:hover,&:focus': {
    backgroundColor: palette.dark,
    boxShadow: `0 14px 26px -12px ${color(palette.main).alpha(
      0.42
    )}, 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px ${color(
      palette.main
    ).alpha(0.2)}`,
  },
});

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: 'green[500]',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },

  button: {
    margin: '.3125rem 1px',
  },

  textPrimary: makeTextColor(theme.palette.primary),
  outlinedPrimary: makeOutlinedColor(theme.palette.primary),
  containedPrimary: makeContainedColor(theme.palette.primary),

  textBlue: makeTextColor(theme.palette.blue),
  outlinedBlue: makeOutlinedColor(theme.palette.blue),
  containedBlue: makeContainedColor(theme.palette.blue),

  textBlack: makeTextColor(theme.palette.black),
  outlinedBlack: makeOutlinedColor(theme.palette.black),
  containedBlack: makeContainedColor(theme.palette.black),

  textGrey: makeTextColor(theme.palette.grey),
  outlinedGrey: makeOutlinedColor(theme.palette.grey),
  containedGrey: makeContainedColor(theme.palette.grey),

  textSecondary: makeTextColor(theme.palette.secondary),
  outlinedSecondary: makeOutlinedColor(theme.palette.secondary),
  containedSecondary: makeContainedColor(theme.palette.secondary),

  textSuccess: makeTextColor(theme.palette.success),
  outlinedSuccess: makeOutlinedColor(theme.palette.success),
  containedSuccess: makeContainedColor(theme.palette.success),

  textWarning: makeTextColor(theme.palette.warning),
  outlinedWarning: makeOutlinedColor(theme.palette.warning),
  containedWarning: makeContainedColor(theme.palette.warning),

  textError: makeTextColor(theme.palette.error),
  outlinedError: makeOutlinedColor(theme.palette.error),
  containedError: makeContainedColor(theme.palette.error),
}));
