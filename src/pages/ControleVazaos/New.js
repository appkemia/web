import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dig from 'object-dig';
import * as Yup from 'yup';

import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import CardContainer from 'components/Card/CardContainer';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputText from 'components/Input/InputText';
import Button from 'components/Button/Button';
import GridContainerFooter from 'components/Grid/GridContainerFooter';
import InputDate from 'components/Input/InputDate';
import InputTime from 'components/Input/InputTime';

import isPresent from 'utils/isPresent';
import api from 'services/api';
import yupValidator from 'utils/yupValidator';
import handlingErros from 'utils/handlingErros';
import { useAuth } from 'contexts/auth';
import formatDate from 'utils/formatDate';

const New = () => {
  const navigate = useNavigate();
  const { empresa, local } = useAuth();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(Date.now());
  const [hora, setHora] = useState(Date.now());
  const [vazao_dia, setVazao_dia] = useState('');

  const [error, setError] = useState({});

  async function onSubmit(event) {
    event.preventDefault();

    const dados = {
      data: formatDate(data, 'yyyy-MM-dd'),
      hora: formatDate(hora, 'HH:mm:ss'),
      vazao_dia,
      empresa_id: dig(empresa, 'id'),
      local_id: dig(local, 'id'),
    };

    const schema = Yup.object().shape({
      vazao_dia: Yup.string().required('Por favor digite a Vazão'),
    });

    const validation = await yupValidator(schema, dados);

    setError(validation);
    if (isPresent(validation)) return;

    setLoading(true);
    try {
      const response = await api.post('/controle-vazaos', dados);
      setLoading(false);

      toast.success('Salvo com sucesso!');
      navigate(`/controle-vazaos/show/${response.data.id}`);
    } catch (error) {
      setLoading(false);
      const validation = handlingErros(error);
      setError(validation);
    }
  }

  return (
    <>
      <Breadcrumbs maxItems={4} aria-label="breadcrumb">
        <Chip
          label="Controle Vazão"
          onClick={() => navigate('/controle-vazaos')}
        />
        <Typography color="textPrimary">Novo Controle Vazão</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={PlaylistAddCheckIcon}
        iconColor="blue"
        title="Novo Controle Vazão"
        loading={loading}
      >
        <GridContainer>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputDate label="Data" value={data} onChange={setData} required />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputTime label="Hora" value={hora} onChange={setHora} required />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputText
              value={vazao_dia}
              label="Vazão dia"
              type='number'
              error={isPresent(error.vazao_dia)}
              helperText={error.vazao_dia}
              required
              onChange={(text) => setVazao_dia(text)}
            />
          </GridItem>

        </GridContainer>

        <GridContainerFooter>
          <Button
            onClick={() => navigate('/controle-vazaos')}
            disabled={loading}
            color="grey"
          >
            Cancelar
          </Button>
          <Button
            onClick={onSubmit}
            disabled={loading}
            loading={loading}
            color="success"
          >
            Salvar
          </Button>
        </GridContainerFooter>
      </CardContainer>
    </>
  );
};

export default New;
