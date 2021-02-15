import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dig from 'object-dig';

import OpacityIcon from '@material-ui/icons/Opacity';

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
import Can from 'contexts/Can';

const Show = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [is_vazao, setIs_vazao] = useState(false);
  const [is_ph, setIs_ph] = useState(false);
  const [is_pac, setIs_pac] = useState(false);
  const [is_polimero, setIs_polimero] = useState(false);
  const [is_hipoclorito, setIs_hipoclorito] = useState(false);
  const [is_observacao, setIs_observacao] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);

      try {
        const response = await api.get(`/etas/${id}`);
        setLoading(false);
        const { data } = response;
        setData(data);
        setIs_vazao(data.is_vazao);
        setIs_ph(data.is_ph);
        setIs_pac(data.is_pac);
        setIs_polimero(data.is_polimero);
        setIs_hipoclorito(data.is_hipoclorito);
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
        <Chip label="ETAs" onClick={() => navigate('/etas')} />
        <Typography color="textPrimary">Visualizando ETA</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={OpacityIcon}
        iconColor="blue"
        title="Visualizando ETA"
        loading={loading}
      >
        <GridAction>
          <Can I="edit" a="Etas">
            <Button onClick={() => navigate(`/etas/edit/${id}`)} color="orange">
              Editar
            </Button>
          </Can>
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
            <InputCheckBox disabled value={is_vazao} label="Vazão" />
            <InputCheckBox disabled value={is_ph} label="pH" />
            <InputCheckBox disabled value={is_pac} label="% PAC" />
            <InputCheckBox disabled value={is_polimero} label="% Polímero" />
            <InputCheckBox
              disabled
              value={is_hipoclorito}
              label="% Hipoclorito"
            />
            <InputCheckBox disabled value={is_observacao} label="Observações" />
          </GridItem>
        </GridContainer>
      </CardContainer>
    </>
  );
};

export default Show;
