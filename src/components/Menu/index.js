import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useNavigate, useLocation } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from '@material-ui/icons/Brightness4';

import User from './User';
import Logo from './Logo';

import useStyles from './styles';
import items from './routeItems';

const Menu = ({ darkTheme, setDarkTheme, isMobile, drawerOpen, setDrawerOpen }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const themeIcon = !darkTheme ? <Brightness4Icon /> : <Brightness7Icon />;

  const pathnames = location.pathname.split('/').filter((x) => x);

  useEffect(() => {
    if (isMobile) {
      setDrawerOpen(false);
    }
    if (!isMobile) {
      setDrawerOpen(true);
    }
  }, [isMobile, setDrawerOpen]);

  return (
    <div>
      <div className={classes.grow}>
        <AppBar
          position="fixed"
          className={clsx(
            (!isMobile || drawerOpen) && classes.appBarOpen,
            (isMobile || !drawerOpen) && classes.appBarClose
          )}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => {
                setDrawerOpen(!drawerOpen);
              }}
              className={clsx(
                (!isMobile || drawerOpen) && classes.menuButtonOpen,
                (isMobile || !drawerOpen) && classes.menuButtonClose
              )}
            >
              <MenuIcon />
            </IconButton>

            <div className={classes.grow} />

            <IconButton
            color="inherit"
            onClick={() => setDarkTheme(!darkTheme)}
          >
            {themeIcon}
          </IconButton>

            <User />
          </Toolbar>
        </AppBar>
      </div>

      <Drawer
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
          paperAnchorLeft: classes.paperAnchorLeft,
        }}
      >
        <List>
          <Logo drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />

          {items.map((item) => {
            return (
              <ListItem
                key={item.path}
                button
                classes={{
                  selected: classes.rootSelected,
                }}
                selected={pathnames[0] === item.root}
                onClick={() => {
                  if (isMobile) {
                    setDrawerOpen(false);
                  }
                  navigate(item.path);
                }}
              >
                <ListItemIcon
                  classes={{
                    root: clsx(
                      classes.textItem,
                      pathnames[0] === item.root && classes.textSelected
                    ),
                  }}
                >
                  <item.Icon />
                </ListItemIcon>
                <Typography
                  className={clsx(
                    classes.textItem,
                    pathnames[0] === item.root && classes.textSelected
                  )}
                >
                  {item?.name}
                </Typography>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
};

export default Menu;
