import React from 'react';
import { Container as MaterialContainer } from '@material-ui/core';

import useStyles from './styles';

const Container = ({ children }) => {
  const classes = useStyles();
  return (
    <MaterialContainer maxWidth="xl" className={classes.container}>
      { children }
    </MaterialContainer>
  );
}

export default Container;