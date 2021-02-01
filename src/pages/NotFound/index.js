import React from 'react';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import lottieNotFound1 from 'assets/lotties/404-not-found-page-1';
import lottieNotFound2 from 'assets/lotties/404-not-found-page-2';
import lottieNotFound3 from 'assets/lotties/404-not-found-page-3';
import lottieNotFound4 from 'assets/lotties/404-not-found-page-4';
import lottieNotFound5 from 'assets/lotties/404-not-found-page-5';
import lottieNotFound6 from 'assets/lotties/404-not-found-page-6';
import lottieNotFound7 from 'assets/lotties/404-not-found-page-7';
import lottieNotFound8 from 'assets/lotties/404-not-found-page-8';
import lottieNotFound9 from 'assets/lotties/404-not-found-page-9';

const NotFound = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const random = Math.floor(Math.random() * 9 + 1);

  const lotties = {
    1: lottieNotFound1,
    2: lottieNotFound2,
    3: lottieNotFound3,
    4: lottieNotFound4,
    5: lottieNotFound5,
    6: lottieNotFound6,
    7: lottieNotFound7,
    8: lottieNotFound8,
    9: lottieNotFound9,
  };

  const lottie = lotties[random];

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottie,
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
            A página que você estava buscando não existe ou não está mais
            disponível.
          </Typography>
          <Typography
            variant="h6"
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Voltar para a
            <Button onClick={() => navigate('/')} color="secondary">
              Página inicial
            </Button>
          </Typography>
        </GridItem>
      </GridContainer>
    </>
  );
};

export default NotFound;
