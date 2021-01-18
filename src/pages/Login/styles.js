import { makeStyles } from '@material-ui/core/styles';

const imageSize = 80;
export default makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `linear-gradient(to bottom right, ${theme.palette.blue.dark}, ${theme.palette.blue.light})`,
    // padding: 10,
  },
  container: {
    borderRadius: 10,
    marginTop: 100,
    backgroundColor: '#ffffff',
  },
  paper: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageLogoRoot: {
    marginTop: imageSize * -1,
    marginBottom: theme.spacing(4),
    width: imageSize + 40,
    height: imageSize + 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLogo: {
    height: imageSize,
  },
  title: {
    fontWeight: 'bold',
    paddingBottom: 40,
  },
  submit: {
    marginTop: theme.spacing(3),
  },
}));
