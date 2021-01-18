import { makeStyles } from '@material-ui/core/styles';

export const drawerWidth = 270;

export default makeStyles((theme) => ({
  appBarOpen: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: theme.palette.menu.main,
  },
  appBarClose: {
    width: '100%',
    marginLeft: 0,
    backgroundColor: theme.palette.menu.main,
  },
  text: {
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 10,
    textAlign: 'left',
  },
  menuButtonOpen: {
    marginRight: theme.spacing(2),
    display: 'none',
  },
  menuButtonClose: {
    marginRight: 0,
    display: 'block',
  },
  grow: {
    flexGrow: 1,
  },
  drawerPaper: {
    paddingRight: 10,
    width: drawerWidth,
    backgroundImage: `linear-gradient(to bottom right, ${theme.palette.menu.dark}, ${theme.palette.menu.light})`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  paperAnchorLeft: {
    border: 'none',
  },
  rootSelected: {
    backgroundColor: `${theme.palette.primary.contrastText} !important`,
    boxShadow:
      '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  rootNone: {
    display: 'none'
  },
  textItem: {
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
    fontSize: 20,
  },
  textSelected: {
    color: theme.palette.blue.main,
    fontWeight: 'bold',
    fontSize: 18,
  },
}));
