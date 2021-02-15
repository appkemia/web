import React from 'react';
import Lottie from 'react-lottie';

import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

import notPermissionPageLottie from 'assets/lotties/not-permission-page';

const NotFound = () => {
  const theme = useTheme();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: notPermissionPageLottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
      <GridContainer direction="row" justify="center" alignItems="center">
        <GridItem xs={12} sm={12} md={5} lg={5} xl={5}>
          <Lottie options={defaultOptions} />
        </GridItem>
      </GridContainer>

      <GridContainer direction="row" justify="center" alignItems="center">
        <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography
            variant="h3"
            style={{
              color: theme.palette.secondary.main,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Você não tem permissão para acessar esta página.
          </Typography>
        </GridItem>
      </GridContainer>
    </>
  );
};

export default NotFound;
