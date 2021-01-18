import React from 'react';

// import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

const GridFilter = ({ expanded, children }) => {
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <GridContainer>{children}</GridContainer>
        </Collapse>
      </GridItem>
    </GridContainer>

    // <Collapse in={expanded} timeout="auto" unmountOnExit>
    //   {/* <CardContent> */}
    //     <GridContainer>{children}</GridContainer>
    //   {/* </CardContent> */}
    // </Collapse>
  );
};

export default GridFilter;
