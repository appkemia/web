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
        const response = await api.get(`/tratamento-efluente-lagoas/${id}`);
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
          label="Tratamento Efluente Lagoa"
          onClick={() => navigate('/tratamento-efluente-lagoas')}
        />
        <Typography color="textPrimary">
          Visualizando Tratamento Efluente Lagoa
        </Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={PlaylistAddCheckIcon}
        iconColor="blue"
        title="Visualizando Tratamento Efluente Lagoa"
        loading={loading}
      >
        <GridAction>
          <Button
            onClick={() => navigate(`/tratamento-efluente-lagoas/edit/${id}`)}
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
            <InputShow label="Operador" value={dig(data, 'operador', 'nome')} />
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="Lagoa" value={dig(data, 'lagoa', 'nome')} />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="pH" value={dig(data, 'ph')} />
          </GridItem>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="OD" value={dig(data, 'od')} />
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="SS" value={dig(data, 'ss')} />
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="Aeração" value={dig(data, 'aeracao')} />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="Observação" value={dig(data, 'observacao')} />
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow
              label="Nível da Lagoa"
              value={
                data?.nivel_lagoa === 1
                  ? 'Baixa'
                  : data?.nivel_lagoa === 2
                  ? 'Média'
                  : 'Alta'
              }
            />
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow
              label="Bombas de recalque funcionando"
              value={
                data?.bomba_recalque_funcionando === 1
                  ? '1'
                  : data?.bomba_recalque_funcionando === 2
                  ? '2'
                  : 'Ambos'
              }
            />
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="Observação Geral" value={dig(data, 'observacao_geral')} />
          </GridItem>
        </GridContainer>
      </CardContainer>
    </>
  );
};

export default Show;
