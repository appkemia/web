import React from 'react';

import CardContent from '@material-ui/core/CardContent';
import GridContainer from 'components/Grid/GridContainer';

const GridContainerFooter = ({ children }) => {
  return (
    <GridContainer
      container
      direction="row"
      justify="flex-end"
      alignItems="flex-end"
    >
      <CardContent>{children}</CardContent>
    </GridContainer>
  );
};

export default GridContainerFooter;
