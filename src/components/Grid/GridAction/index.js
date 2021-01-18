import React from 'react';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

import useStyles from './styles';

const GridAction = ({ children, style }) => {
  const classes = useStyles();
  return (
    <GridContainer className={classes.flex} style={style}>
      <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
        {children}
      </GridItem>
    </GridContainer>
  );
};

export default GridAction;
