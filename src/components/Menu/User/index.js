import React, { useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// import Avatar from '@material-ui/core/Avatar';
import Button from 'components/Button/Button';

import { useAuth } from 'contexts/auth';
import Storage from 'providers/Storage';
// import { URL } from 'config/uri';

// import useStyles from './styles';

function User() {
  // const classes = useStyles();
  // const { user, setUser } = useAuth();
  const { setUser } = useAuth();

  const [openLogoff, setOpenLogoff] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  function handleLogoffOpen() {
    setOpenLogoff(true);
  }

  function handleLogoffClose() {
    setOpenLogoff(false);
    setAnchorEl(null);
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  async function logoff() {
    setUser(null);
    await Storage.removeItem(Storage.tokenKey);
    await Storage.removeItem(Storage.refreshTokenKey);
    await Storage.removeItem(Storage.userKey);
    await Storage.removeItem(Storage.corporationKey);
    await Storage.removeItem(Storage.hasCorporationBranchesKey);
  }

  return (
    <>
      <IconButton color="inherit" onClick={handleProfileMenuOpen}>
        {/* <Avatar
          alt="profile"
          src={`${URL}/public/user_face/${user.uuid}.jpg?size=140`}
        /> */}
        {/* <img
          src={`${URL}/public/user_face/${user.uuid}.jpg?size=140`}
          className={classes.image}
          alt="profile"
        /> */}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleLogoffOpen}>
          <ExitToApp />
          Sair
        </MenuItem>
      </Menu>

      <Dialog open={openLogoff} onClose={handleLogoffClose}>
        <DialogTitle>{'Sair'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Sair</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="text"
            color="blue"
            onClick={handleLogoffClose}
          >
            Sair
          </Button>
          <Button
            variant="text"
            color="blue"
            onClick={() => {
              handleLogoffClose();
              logoff();
            }}
          >
            Sair
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default User;
