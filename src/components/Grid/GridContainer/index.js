import React from 'react';
import Grid from '@material-ui/core/Grid';

const GridContainer = ({ children, ...props }) => {
  return (
    <Grid container spacing={4} {...props}>
      {children}
    </Grid>
  );
};

export default GridContainer;
