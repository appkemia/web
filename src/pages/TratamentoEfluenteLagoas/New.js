import React, { useEffect, useState } from 'react';
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
import InputText from 'components/Input/InputText';
import Button from 'components/Button/Button';
import GridContainerFooter from 'components/Grid/GridContainerFooter';
import InputDate from 'components/Input/InputDate';
import InputShow from 'components/Input/InputShow';
import InputSelect from 'components/Input/InputSelect';

import isPresent from 'utils/isPresent';
import api from 'services/api';
import yupValidator from 'utils/yupValidator';
import handlingErros from 'utils/handlingErros';
import { useAuth } from 'contexts/auth';
import formatDate from 'utils/formatDate';

const New = () => {
  const navigate = useNavigate();
  const { user, empresa, local } = useAuth();

  const [loading, setLoading] = useState(false);
  const [lagoas, setLagoas] = useState([]);
  const [lagoa, setLagoa] = useState(null);

  const [data, setData] = useState(Date.now());
  const [ph, setPh] = useState('');
  const [od, setOd] = useState('');
  const [ss, setSs] = useState('');
  const [aeracao, setAeracao] = useState('');
  const [observacao, setObservacao] = useState('');
  const [nivel_lagoa, setNivel_lagoa] = useState('');
  const [bomba_recalque_funcionando, setBomba_recalque_funcionando] = useState(
    ''
  );
  const [observacao_geral, setObservacao_geral] = useState('');
  const [error, setError] = useState({});

  const handleChangeNivelLagoa = (event) => {
    setNivel_lagoa(event.target.value);
  };

  const handleChangeBombaRecalqueFuncionando = (event) => {
    setBomba_recalque_funcionando(event.target.value);
  };

  async function onSubmit(event) {
    event.preventDefault();

    const dados = {
      data: formatDate(data, 'yyyy-MM-dd'),
      ph,
      od,
      ss,
      aeracao,
      observacao,
      nivel_lagoa,
      bomba_recalque_funcionando,
      observacao_geral,
      lagoa_id: dig(lagoa, 'id'),
      empresa_id: dig(empresa, 'id'),
      local_id: dig(local, 'id'),
      operador_id: dig(user, 'id'),
    };

    const schema = Yup.object().shape({
      lagoa_id: Yup.string()
        .min(1, 'Por favor selecione a Lagoa')
        .required('Por favor selecione a Lagoa'),
    });

    const validation = await yupValidator(schema, dados);

    setError(validation);
    if (isPresent(validation)) return;

    setLoading(true);
    try {
      const response = await api.post('/tratamento-efluente-lagoas', dados);
      setLoading(false);

      toast.success('Salvo com sucesso!');
      navigate(`/tratamento-efluente-lagoas/show/${response.data.id}`);
    } catch (error) {
      setLoading(false);
      const validation = handlingErros(error);
      setError(validation);
    }
  }

  useEffect(() => {
    async function getLagoas() {
      setLoading(true);

      try {
        const response = await api.get(`/lagoas?localId=${dig(local, 'id')}`);
        setLoading(false);
        const { data } = response;
        setLagoas(data);
      } catch (error) {
        setLoading(false);
        handlingErros(error);
      }
    }

    if (local) {
      getLagoas();
    }
  }, [local]);

  return (
    <>
      <Breadcrumbs maxItems={4} aria-label="breadcrumb">
        <Chip
          label="Tratamento Efluente Lagoa"
          onClick={() => navigate('/tratamento-efluente-lagoas')}
        />
        <Typography color="textPrimary">
          Novo Tratamento Efluente Lagoa
        </Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={PlaylistAddCheckIcon}
        iconColor="blue"
        title="Novo Tratamento Efluente Lagoa"
        loading={loading}
      >
        <GridContainer>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputDate label="Data" value={data} onChange={setData} required />
          </GridItem>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputShow label="Operador" value={dig(user, 'nome')} />
          </GridItem>
        </GridContainer>

        <GridContainer justify="center" alignItems="center">
          <GridItem xs={12} sm={6} md={6} lg={6} xl={6}>
            <InputSelect
              options={lagoas}
              name="nome"
              optionValue="id"
              value={lagoa}
              loading={loading}
              label="Lagoa"
              placeholder="Buscar"
              error={isPresent(error.lagoa_id)}
              helperText={error.lagoa_id}
              onChange={(eta) => {
                setLagoa(eta);
              }}
            />
          </GridItem>
        </GridContainer>

        <GridContainer>
          {lagoa?.is_ph && (
            <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
              <InputText
                value={ph}
                label="pH"
                type="number"
                error={isPresent(error.ph)}
                helperText={error.ph}
                onChange={(text) => setPh(text)}
              />
            </GridItem>
          )}

          {lagoa?.is_od && (
            <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
              <InputText
                value={od}
                label="OD"
                type="number"
                error={isPresent(error.od)}
                helperText={error.od}
                onChange={(text) => setOd(text)}
              />
            </GridItem>
          )}

          {lagoa?.is_ss && (
            <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
              <InputText
                value={ss}
                label="SS"
                type="number"
                error={isPresent(error.ss)}
                helperText={error.ss}
                onChange={(text) => setSs(text)}
              />
            </GridItem>
          )}

          {lagoa?.is_aeracao && (
            <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
              <InputText
                value={aeracao}
                label="Aeração"
                type="number"
                error={isPresent(error.aeracao)}
                helperText={error.aeracao}
                onChange={(text) => setAeracao(text)}
              />
            </GridItem>
          )}

          {lagoa?.is_observacao && (
            <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
              <InputText
                value={observacao}
                label="Observação"
                error={isPresent(error.observacao)}
                helperText={error.observacao}
                onChange={(text) => setObservacao(text)}
              />
            </GridItem>
          )}
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Nível da Lagoa</FormLabel>
              <RadioGroup
                aria-label="nivel_lagoa"
                name="nivel_lagoa"
                value={nivel_lagoa}
                onChange={handleChangeNivelLagoa}
              >
                <FormControlLabel value="1" control={<Radio />} label="Baixo" />
                <FormControlLabel value="2" control={<Radio />} label="Médio" />
                <FormControlLabel value="3" control={<Radio />} label="Alto" />
              </RadioGroup>
            </FormControl>
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Bombas de recalque funcionando
              </FormLabel>
              <RadioGroup
                aria-label="bomba_recalque_funcionando"
                name="bomba_recalque_funcionando"
                value={bomba_recalque_funcionando}
                onChange={handleChangeBombaRecalqueFuncionando}
              >
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="Ambos" />
              </RadioGroup>
            </FormControl>
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
            <InputText
              value={observacao_geral}
              label="Observação Geral"
              error={isPresent(error.observacao_geral)}
              helperText={error.observacao_geral}
              onChange={(text) => setObservacao_geral(text)}
            />
          </GridItem>
        </GridContainer>

        <GridContainerFooter>
          <Button
            onClick={() => navigate('/tratamento-efluente-lagoas')}
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
