import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dig from 'object-dig';

import PoolIcon from '@material-ui/icons/Pool';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import CardContainer from 'components/Card/CardContainer';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputCheckBox from 'components/Input/InputCheckBox';
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
  const [is_ph, setIs_ph] = useState(false);
  const [is_od, setIs_od] = useState(false);
  const [is_ss, setIs_ss] = useState(false);
  const [is_aeracao, setIs_aeracao] = useState(false);
  const [is_observacao, setIs_observacao] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);

      try {
        const response = await api.get(`/lagoas/${id}`);
        setLoading(false);
        const { data } = response;
        setData(data);
        setIs_ph(data.is_ph);
        setIs_od(data.is_od);
        setIs_ss(data.is_ss);
        setIs_aeracao(data.is_aeracao);
        setIs_observacao(data.is_observacao);
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
        <Chip label="Lagoas" onClick={() => navigate('/lagoas')} />
        <Typography color="textPrimary">Visualizando lagoa</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={PoolIcon}
        iconColor="blue"
        title="Visualizando lagoa"
        loading={loading}
      >
        <GridAction>
          <Button onClick={() => navigate(`/lagoas/edit/${id}`)} color="orange">
            Editar
          </Button>
        </GridAction>

        <GridContainer>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputShow label="Nome" value={dig(data, 'nome')} />
          </GridItem>

          <GridItem xs={12} sm={8} md={8} lg={8} xl={8}>
            <InputShow label="Descrição" value={dig(data, 'descricao')} />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputCheckBox disabled value={is_ph} label="pH" />
            <InputCheckBox disabled value={is_od} label="OD" />
            <InputCheckBox disabled value={is_ss} label="SS" />
            <InputCheckBox disabled value={is_aeracao} label="Aeração" />
            <InputCheckBox disabled value={is_observacao} label="Observações" />
          </GridItem>
        </GridContainer>
      </CardContainer>
    </>
  );
};

export default Show;
