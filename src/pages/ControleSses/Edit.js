import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import dig from 'object-dig';
import * as Yup from 'yup';

import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import FormLabel from '@material-ui/core/FormLabel';

import CardContainer from 'components/Card/CardContainer';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputText from 'components/Input/InputText';
import Button from 'components/Button/Button';
import GridContainerFooter from 'components/Grid/GridContainerFooter';
import InputDate from 'components/Input/InputDate';
import InputTime from 'components/Input/InputTime';
import InputFile from 'components/Input/InputFile';

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
  const [hora, setHora] = useState(Date.now());
  const [bruto, setBruto] = useState('');
  const [reator_1, setReator_1] = useState('');
  const [reator_2, setReator_2] = useState('');
  const [reator_3, setReator_3] = useState('');
  const [tratado, setTratado] = useState('');
  const [acao_corretiva, setAcao_corretiva] = useState('');

  const [efluente_bruto, setEfluente_bruto] = useState(null);
  const [efluente_tratado, setEfluente_tratado] = useState(null);

  const [error, setError] = useState({});

  async function onSubmit(event) {
    event.preventDefault();

    const body = {
      data: formatDate(data, 'yyyy-MM-dd'),
      hora: formatDate(hora, 'HH:mm:ss'),
      bruto,
      reator_1,
      reator_2,
      reator_3,
      tratado,
      acao_corretiva,
      empresa_id: dig(empresa, 'id'),
      local_id: dig(local, 'id'),
    };

    const schema = Yup.object().shape({
      bruto: Yup.string().required('Por favor digite o Bruto'),
      reator_1: Yup.string().required('Por favor digite o Reator 1'),
      reator_2: Yup.string().required('Por favor digite o Reator 2'),
      reator_3: Yup.string().required('Por favor digite o Reator 3'),
      tratado: Yup.string().required('Por favor digite o Tratado'),
      acao_corretiva: Yup.string().required(
        'Por favor digite o Ação Corretiva'
      ),
    });

    const validation = await yupValidator(schema, body);

    setError(validation);
    if (isPresent(validation)) return;

    let dados = new FormData();

    Object.keys(body).forEach((key) => {
      dados.append(key, body[key]);
    });

    if (isPresent(efluente_bruto)) {
      dados.append('efluente_bruto', efluente_bruto[0]);
    }

    if (isPresent(efluente_tratado)) {
      dados.append('efluente_tratado', efluente_tratado[0]);
    }

    setLoading(true);
    try {
      await api.put(`/controle-sses/${id}`, dados);
      setLoading(false);

      toast.success('Salvo com sucesso!');
      navigate(`/controle-sses/show/${id}`);
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
        const response = await api.get(`/controle-sses/${id}`);
        setLoading(false);
        const { data } = response;

        let d = new Date();
        let [hours, minutes, seconds] = data.hora.split(':');
        d.setHours(+hours);
        d.setMinutes(minutes);
        d.setSeconds(seconds);

        setData(new Date(data.data));
        setHora(d);
        setBruto(data.bruto);
        setReator_1(data.reator_1);
        setReator_2(data.reator_2);
        setReator_3(data.reator_3);
        setTratado(data.tratado);
        setAcao_corretiva(data.acao_corretiva);
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
          label="Controle de SS"
          onClick={() => navigate('/controle-sses')}
        />
        <Typography color="textPrimary">Editando controle de SS</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={PlaylistAddCheckIcon}
        iconColor="blue"
        title="Editanto controle de SS"
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
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputText
              value={bruto}
              label="Bruto"
              type="number"
              error={isPresent(error.bruto)}
              helperText={error.bruto}
              required
              onChange={(text) => setBruto(text)}
            />
          </GridItem>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputText
              value={reator_1}
              label="Reator 1"
              type="number"
              error={isPresent(error.reator_1)}
              helperText={error.reator_1}
              required
              onChange={(text) => setReator_1(text)}
            />
          </GridItem>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputText
              value={reator_2}
              label="Reator 2"
              type="number"
              error={isPresent(error.reator_2)}
              helperText={error.reator_2}
              required
              onChange={(text) => setReator_2(text)}
            />
          </GridItem>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputText
              value={reator_3}
              label="Reator 3"
              type="number"
              error={isPresent(error.reator_3)}
              helperText={error.reator_3}
              required
              onChange={(text) => setReator_3(text)}
            />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputText
              value={tratado}
              label="Tratado"
              type="number"
              error={isPresent(error.tratado)}
              helperText={error.tratado}
              required
              onChange={(text) => setTratado(text)}
            />
          </GridItem>
          <GridItem xs={12} sm={9} md={9} lg={9} xl={9}>
            <InputText
              value={acao_corretiva}
              label="Ação Corretiva"
              error={isPresent(error.acao_corretiva)}
              helperText={error.acao_corretiva}
              required
              onChange={(text) => setAcao_corretiva(text)}
            />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
            <FormLabel component="legend">Efluente Burto</FormLabel>
            <InputFile
              label="Anexos"
              maxFiles={1}
              onChange={(file) => setEfluente_bruto(file)}
              accept={'image/jpeg, image/png'}
            />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
            <FormLabel component="legend">Efluente Tratado</FormLabel>
            <InputFile
              label="Anexos"
              maxFiles={1}
              onChange={(file) => setEfluente_tratado(file)}
              accept={'image/jpeg, image/png'}
            />
          </GridItem>
        </GridContainer>

        <GridContainerFooter>
          <Button
            onClick={() => navigate('/controle-sses')}
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
