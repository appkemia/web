import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const UsuarioEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { empresa, local } = useAuth();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(Date.now());
  const [status_coleta, setStatus_coleta] = useState('');
  const [condicao_coleta, setCondicao_coleta] = useState('');

  const [error, setError] = useState({});

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

    setError(validation);
    if (isPresent(validation)) return;

    setLoading(true);
    try {
      await api.put(`/controle-coletas/${id}`, dados);
      setLoading(false);

      toast.success('Salvo com sucesso!');
      navigate(`/controle-coletas/show/${id}`);
    } catch (error) {
      setLoading(false);
      const validation = handlingErros(error);
      setError(validation);
    }
  }

  useEffect(() => {
    async function getData() {
      setLoading(true);

      try {
        const response = await api.get(`/controle-coletas/${id}`);
        setLoading(false);
        const { data } = response;

        setData(new Date(data.data));
        setStatus_coleta(data.status_coleta);
        setCondicao_coleta(data.condicao_coleta);
      } catch (error) {
        setLoading(false);
        handlingErros(error);
      }
    }

    getData();
  }, [id, empresa]);

  return (
    <>
      <Breadcrumbs maxItems={4} aria-label="breadcrumb">
        <Chip
          label="Controle Coleta"
          onClick={() => navigate('/controle-coletas')}
        />
        <Typography color="textPrimary">Editando Controle Coleta</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={PlaylistAddCheckIcon}
        iconColor="blue"
        title="Editanto Controle Coleta"
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

export default UsuarioEdit;
