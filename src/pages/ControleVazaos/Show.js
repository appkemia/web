import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dig from 'object-dig';

import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import CardContainer from 'components/Card/CardContainer';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputShow from 'components/Input/InputShow';
import Button from 'components/Button/Button';
import GridAction from 'components/Grid/GridAction';

import api from 'services/api';
import handlingErros from 'utils/handlingErros';

const Show = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    async function getData() {
      setLoading(true);

      try {
        const response = await api.get(`/controle-vazaos/${id}`);
        setLoading(false);
        const { data } = response;
        setData(data);
      } catch (error) {
        setLoading(false);
        setData([]);
        handlingErros(error);
      }
    }

    getData();
  }, [id]);

  return (
    <>
      <Breadcrumbs maxItems={4} aria-label="breadcrumb">
        <Chip
          label="Controle Vazão"
          onClick={() => navigate('/controle-vazaos')}
        />
        <Typography color="textPrimary">Visualizando Controle Vazão</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={PlaylistAddCheckIcon}
        iconColor="blue"
        title="Visualizando Controle Vazão"
        loading={loading}
      >
        <GridAction>
          <Button
            onClick={() => navigate(`/controle-vazaos/edit/${id}`)}
            color="orange"
          >
            Editar
          </Button>
        </GridAction>

        <GridContainer>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="Data" value={dig(data, 'dateFormat')} />
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="Hora" value={dig(data, 'hora')} />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="Vazão dia" value={dig(data, 'vazao_dia')} />
          </GridItem>
        </GridContainer>
      </CardContainer>
    </>
  );
};

export default Show;
