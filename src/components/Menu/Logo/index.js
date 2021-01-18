import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import useStyles from './styles';
import logo from 'assets/images/logo-kemia.png';

const Logo = ({ drawerOpen, setDrawerOpen }) => {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
      }}
    >
      <Button
        className={classes.menuButton}
        color="inherit"
        onClick={() => navigate('/')}
        style={{ lineHeight: 0 }}
      >
        <img src={logo} className={classes.image} alt="logo" />
        {/* <Typography className={classes.text}>Kemia</Typography> */}
      </Button>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        className={classes.menuButton}
        onClick={() => {
          setDrawerOpen(!drawerOpen);
        }}
      >
        <MenuOpenIcon />
      </IconButton>
    </div>
  );
};

export default Logo;
