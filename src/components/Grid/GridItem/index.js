import React from 'react';
import Grid from '@material-ui/core/Grid';

const GridItem = ({ children, ...props }) => {
  return (
    <Grid item {...props}>
      {children}
    </Grid>
  );
};

export default GridItem;
