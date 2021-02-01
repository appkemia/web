import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import InputSelect from 'components/Input/InputSelect';

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
  const [tanques, setTanques] = useState([]);
  const [tanque, setTanque] = useState(null);

  const [data, setData] = useState(Date.now());
  const [hora, setHora] = useState(Date.now());
  const [tempo_ligado_2cv, setTempo_ligado_2cv] = useState('');
  const [tempo_desligado_2cv, setTempo_desligado_2cv] = useState('');
  const [tempo_ligado_5cv, setTempo_ligado_5cv] = useState('');
  const [tempo_desligado_5cv, setTempo_desligado_5cv] = useState('');
  const [acao_corretiva, setAcao_corretiva] = useState('');

  const [error, setError] = useState({});

  async function onSubmit(event) {
    event.preventDefault();

    const dados = {
      data: formatDate(data, 'yyyy-MM-dd'),
      hora: formatDate(hora, 'HH:mm:ss'),
      tempo_ligado_2cv,
      tempo_desligado_2cv,
      tempo_ligado_5cv,
      tempo_desligado_5cv,
      acao_corretiva,
      tanque_id: dig(tanque, 'id'),
      empresa_id: dig(empresa, 'id'),
      local_id: dig(local, 'id'),
    };

    const schema = Yup.object().shape({
      tanque_id: Yup.string().min(1, 'Tanque é obrigatório').required('Tanque é obrigatório'),
      tempo_ligado_2cv: Yup.string().required('Tempo ligado 2cv é obrigatório'),
      tempo_desligado_2cv: Yup.string().required('Tempo desligado 2cv é obrigatório'),
      tempo_ligado_5cv: Yup.string().required('Tempo ligado 5cv é obrigatório'),
      tempo_desligado_5cv: Yup.string().required('Tempo desligado 5cv é obrigatório'),
      acao_corretiva: Yup.string().required('Ação corretiva é obrigatório'),
  });

    const validation = await yupValidator(schema, dados);

    setError(validation);
    if (isPresent(validation)) return;

    setLoading(true);
    try {
      await api.put(`/controle-tanques/${id}`, dados);
      setLoading(false);

      toast.success('Salvo com sucesso!');
      navigate(`/controle-tanques/show/${id}`);
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
        const response = await api.get(`/controle-tanques/${id}`);
        setLoading(false);
        const { data } = response;

        let d = new Date();
        let [hours, minutes, seconds] = data.hora.split(':');
        d.setHours(+hours);
        d.setMinutes(minutes);
        d.setSeconds(seconds);

        setData(new Date(data.data));
        setHora(d);
        setTempo_ligado_2cv(data.tempo_ligado_2cv);
        setTempo_desligado_2cv(data.tempo_desligado_2cv);
        setTempo_ligado_5cv(data.tempo_ligado_5cv);
        setTempo_desligado_5cv(data.tempo_desligado_5cv);
        setAcao_corretiva(data.acao_corretiva);
        setTanque(data.tanque);
      } catch (error) {
        setLoading(false);
        handlingErros(error);
      }
    }

    getData();
  }, [id, empresa]);

  useEffect(() => {
    async function getTanques() {
      setLoading(true);

      try {
        const response = await api.get(`/tanques?localId=${dig(local, 'id')}`);
        setLoading(false);
        const { data } = response;
        setTanques(data);
      } catch (error) {
        setLoading(false);
        handlingErros(error);
      }
    }

    if (local) {
      getTanques();
    }
  }, [local]);

  return (
    <>
      <Breadcrumbs maxItems={4} aria-label="breadcrumb">
        <Chip
          label="Controle Tanque"
          onClick={() => navigate('/controle-tanques')}
        />
        <Typography color="textPrimary">Editando Controle Tanque</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={PlaylistAddCheckIcon}
        iconColor="blue"
        title="Editanto Controle Tanque"
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
          <GridItem xs={12} sm={6} md={6} lg={6} xl={6}>
            <InputSelect
              options={tanques}
              name="nome"
              optionValue="id"
              value={tanque}
              loading={loading}
              label="Tanque"
              placeholder="Buscar"
              error={isPresent(error.tanque_id)}
              helperText={error.tanque_id}
              onChange={(tanque) => {
                setTanque(tanque);
              }}
            />
          </GridItem>

          <GridItem xs={12} sm={6} md={6} lg={6} xl={6}>
            <InputText
              value={acao_corretiva}
              label="Ação corretiva"
              error={isPresent(error.acao_corretiva)}
              helperText={error.acao_corretiva}
              required
              onChange={(text) => setAcao_corretiva(text)}
            />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputText
              value={tempo_ligado_2cv}
              label="Tempo ligado 2cv"
              type="number"
              error={isPresent(error.tempo_ligado_2cv)}
              helperText={error.tempo_ligado_2cv}
              required
              onChange={(text) => setTempo_ligado_2cv(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputText
              value={tempo_desligado_2cv}
              label="Tempo desligado 2cv"
              type="number"
              error={isPresent(error.tempo_desligado_2cv)}
              helperText={error.tempo_desligado_2cv}
              required
              onChange={(text) => setTempo_desligado_2cv(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputText
              value={tempo_ligado_5cv}
              label="Tempo ligado 5cv"
              type="number"
              error={isPresent(error.tempo_ligado_5cv)}
              helperText={error.tempo_ligado_5cv}
              required
              onChange={(text) => setTempo_ligado_5cv(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputText
              value={tempo_desligado_5cv}
              label="Tempo desligado 5cv"
              type="number"
              error={isPresent(error.tempo_desligado_5cv)}
              helperText={error.tempo_desligado_5cv}
              required
              onChange={(text) => setTempo_desligado_5cv(text)}
            />
          </GridItem>
        </GridContainer>

        <GridContainerFooter>
          <Button
            onClick={() => navigate('/controle-tanques')}
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
