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
import Can from 'contexts/Can';

const Show = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    async function getData() {
      setLoading(true);

      try {
        const response = await api.get(`/controle-coletas/${id}`);
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
          label="Controle Coleta"
          onClick={() => navigate('/controle-coletas')}
        />
        <Typography color="textPrimary">
          Visualizando Controle Coleta
        </Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={PlaylistAddCheckIcon}
        iconColor="blue"
        title="Visualizando Controle Coleta"
        loading={loading}
      >
        <GridAction>
          <Can I="edit" a="ControleColetas">
            <Button
              onClick={() => navigate(`/controle-coletas/edit/${id}`)}
              color="orange"
            >
              Editar
            </Button>
          </Can>
        </GridAction>

        <GridContainer>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="Data" value={dig(data, 'dateFormat')} />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow
              label="Status"
              value={data?.status_coleta === 1 ? 'Realiazada' : 'Adiada'}
            />
          </GridItem>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow
              label="Condição da Coleta"
              value={
                data?.condicao_coleta === 1
                  ? 'Ensoralado'
                  : data?.condicao_coleta === 2
                  ? 'Chuvuso'
                  : 'Garoa'
              }
            />
          </GridItem>
        </GridContainer>
      </CardContainer>
    </>
  );
};

export default Show;
