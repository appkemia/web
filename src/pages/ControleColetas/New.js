import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dig from 'object-dig';
import * as Yup from 'yup';

import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import CardContainer from 'components/Card/CardContainer';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Button from 'components/Button/Button';
import GridContainerFooter from 'components/Grid/GridContainerFooter';
import InputDate from 'components/Input/InputDate';

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
  const [status_coleta, setStatus_coleta] = useState('1');
  const [condicao_coleta, setCondicao_coleta] = useState('1');

  // const [error, setError] = useState({});

  const handleChangeStatusColeta = (event) => {
    setStatus_coleta(event.target.value);
  };

  const handleChangeCondicaoColeta = (event) => {
    setCondicao_coleta(event.target.value);
  };

  async function onSubmit(event) {
    event.preventDefault();

    const dados = {
      data: formatDate(data, 'yyyy-MM-dd'),
      status_coleta,
      condicao_coleta,
      empresa_id: dig(empresa, 'id'),
      local_id: dig(local, 'id'),
    };

    const schema = Yup.object().shape({
      status_coleta: Yup.string()
        .min(1, 'Status da coleta é obrigatório')
        .required('Status da coleta é obrigatório'),
      condicao_coleta: Yup.string()
        .min(1, 'Condição da coleta é obrigatório')
        .required('Condição da coleta é obrigatório'),
    });

    const validation = await yupValidator(schema, dados);

    // setError(validation);
    if (isPresent(validation)) return;

    setLoading(true);
    try {
      const response = await api.post('/controle-coletas', dados);
      setLoading(false);

      toast.success('Salvo com sucesso!');
      navigate(`/controle-coletas/show/${response.data.id}`);
    } catch (error) {
      setLoading(false);
      handlingErros(error);
      // const validation = handlingErros(error);
      // setError(validation);
    }
  }

  return (
    <>
      <Breadcrumbs maxItems={4} aria-label="breadcrumb">
        <Chip
          label="Controle Coleta"
          onClick={() => navigate('/controle-coletas')}
        />
        <Typography color="textPrimary">Novo Controle Coleta</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={PlaylistAddCheckIcon}
        iconColor="blue"
        title="Novo Controle Coleta"
        loading={loading}
      >
        <GridContainer>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputDate label="Data" value={data} onChange={setData} required />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Status</FormLabel>
              <RadioGroup
                aria-label="status_coleta"
                name="status_coleta"
                value={status_coleta}
                onChange={handleChangeStatusColeta}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Realiazada"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Adiada"
                />
              </RadioGroup>
            </FormControl>
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Condição de Coleta (tempo e clima)
              </FormLabel>
              <RadioGroup
                aria-label="condicao_coleta"
                name="condicao_coleta"
                value={condicao_coleta}
                onChange={handleChangeCondicaoColeta}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Ensoralado"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Chuvoso"
                />
                <FormControlLabel value="3" control={<Radio />} label="Garoa" />
              </RadioGroup>
            </FormControl>
          </GridItem>
        </GridContainer>

        <GridContainerFooter>
          <Button
            onClick={() => navigate('/controle-coletas')}
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
