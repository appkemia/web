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
import InputShow from 'components/Input/InputShow';
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

  const [etas, setEtas] = useState([]);
  const [eta, setEta] = useState(null);
  const [operador, setOperador] = useState(null);

  const [data, setData] = useState(Date.now());
  const [vazao, setVazao] = useState('');
  const [ph, setPh] = useState('');
  const [pac, setPac] = useState('');
  const [polimero, setPolimero] = useState('');
  const [hipoclorito, setHipoclorito] = useState('');
  const [observacao, setObservacao] = useState('');
  const [ph_caixa_saida_eta, setPh_caixa_saida_eta] = useState('');
  const [ss_caixa_saida_eta, setSs_caixa_saida_eta] = useState('');
  const [observacao_caixa_saida_eta, setObservacao_caixa_saida_eta] = useState(
    ''
  );
  const [ph_caixa_saida_final, setPh_caixa_saida_final] = useState('');
  const [ss_caixa_saida_final, setSs_caixa_saida_final] = useState('');
  const [
    observacao_caixa_saida_final,
    setObservacao_caixa_saida_final,
  ] = useState('');

  const [error, setError] = useState({});

  async function onSubmit(event) {
    event.preventDefault();

    const dados = {
      data: formatDate(data, 'yyyy-MM-dd'),
      vazao,
      ph,
      pac,
      polimero,
      hipoclorito,
      observacao,
      ph_caixa_saida_eta,
      ss_caixa_saida_eta,
      observacao_caixa_saida_eta,
      ph_caixa_saida_final,
      ss_caixa_saida_final,
      observacao_caixa_saida_final,
      eta_id: dig(eta, 'id'),
      empresa_id: dig(empresa, 'id'),
      local_id: dig(local, 'id'),
      operador_id: dig(operador, 'id'),
    };

    const schema = Yup.object().shape({
      eta_id: Yup.string()
        .min(1, 'Por favor selecione a ETA')
        .required('Por favor selecione a ETA'),
    });

    const validation = await yupValidator(schema, dados);

    setError(validation);
    if (isPresent(validation)) return;

    setLoading(true);
    try {
      await api.put(`/polimento-etas/${id}`, dados);
      setLoading(false);

      toast.success('Salvo com sucesso!');
      navigate(`/polimento-etas/show/${id}`);
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
        const response = await api.get(`/polimento-etas/${id}`);
        setLoading(false);
        const { data } = response;

        setData(new Date(data.data));
        setVazao(data.vazao);
        setPh(data.ph);
        setPac(data.pac);
        setPolimero(data.polimero);
        setHipoclorito(data.hipoclorito);
        setObservacao(data.observacao);
        setPh_caixa_saida_eta(data.ph_caixa_saida_eta);
        setSs_caixa_saida_eta(data.ss_caixa_saida_eta);
        setObservacao_caixa_saida_eta(data.observacao_caixa_saida_eta);
        setPh_caixa_saida_final(data.ph_caixa_saida_final);
        setSs_caixa_saida_final(data.ss_caixa_saida_final);
        setObservacao_caixa_saida_final(data.observacao_caixa_saida_final);
        setEta(data.eta);
        setOperador(data.operador);
      } catch (error) {
        setLoading(false);
        handlingErros(error);
      }
    }

    getData();
  }, [id, empresa]);

  useEffect(() => {
    async function getEtas() {
      setLoading(true);

      try {
        const response = await api.get(`/etas?localId=${dig(local, 'id')}`);
        setLoading(false);
        const { data } = response;
        setEtas(data);
      } catch (error) {
        setLoading(false);
        handlingErros(error);
      }
    }

    if (local) {
      getEtas();
    }
  }, [local]);

  return (
    <>
      <Breadcrumbs maxItems={4} aria-label="breadcrumb">
        <Chip
          label="Polimento ETA"
          onClick={() => navigate('/polimento-etas')}
        />
        <Typography color="textPrimary">Editando polimento ETA</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={PlaylistAddCheckIcon}
        iconColor="blue"
        title="Editanto polimento ETA"
        loading={loading}
      >
        <GridContainer>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputDate label="Data" value={data} onChange={setData} required />
          </GridItem>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputShow label="Operador" value={dig(operador, 'nome')} />
          </GridItem>
        </GridContainer>

        <GridContainer justify="center" alignItems="center">
          <GridItem xs={12} sm={6} md={6} lg={6} xl={6}>
            <InputSelect
              options={etas}
              name="nome"
              optionValue="id"
              value={eta}
              loading={loading}
              label="Eta"
              placeholder="Buscar"
              error={isPresent(error.eta_id)}
              helperText={error.eta_id}
              onChange={(eta) => {
                setEta(eta);
              }}
            />
          </GridItem>
        </GridContainer>

        <GridContainer>
          {eta?.is_vazao && (
            <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
              <InputText
                value={vazao}
                label="Vazão"
                type="number"
                error={isPresent(error.vazao)}
                helperText={error.vazao}
                onChange={(text) => setVazao(text)}
              />
            </GridItem>
          )}

          {eta?.is_ph && (
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

          {eta?.is_pac && (
            <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
              <InputText
                value={pac}
                label="PAC"
                type="number"
                error={isPresent(error.pac)}
                helperText={error.pac}
                onChange={(text) => setPac(text)}
              />
            </GridItem>
          )}

          {eta?.is_polimero && (
            <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
              <InputText
                value={polimero}
                label="% Polímero"
                type="number"
                error={isPresent(error.polimero)}
                helperText={error.polimero}
                onChange={(text) => setPolimero(text)}
              />
            </GridItem>
          )}

          {eta?.is_hipoclorito && (
            <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
              <InputText
                value={hipoclorito}
                label="% Hipoclorito"
                type="number"
                error={isPresent(error.hipoclorito)}
                helperText={error.hipoclorito}
                onChange={(text) => setHipoclorito(text)}
              />
            </GridItem>
          )}

          {eta?.is_observacao && (
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

        <Typography style={{ marginTop: 50 }} color="textPrimary">
          Caixa de saída ETA
        </Typography>
        <GridContainer>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputText
              value={ph_caixa_saida_eta}
              label="pH"
              type="number"
              error={isPresent(error.ph_caixa_saida_eta)}
              helperText={error.ph_caixa_saida_eta}
              required
              onChange={(text) => setPh_caixa_saida_eta(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputText
              value={ss_caixa_saida_eta}
              label="SS"
              type="number"
              error={isPresent(error.ss_caixa_saida_eta)}
              helperText={error.ss_caixa_saida_eta}
              required
              onChange={(text) => setSs_caixa_saida_eta(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputText
              value={observacao_caixa_saida_eta}
              label="Observação"
              error={isPresent(error.observacao_caixa_saida_eta)}
              helperText={error.observacao_caixa_saida_eta}
              required
              onChange={(text) => setObservacao_caixa_saida_eta(text)}
            />
          </GridItem>
        </GridContainer>

        <Typography style={{ marginTop: 50 }} color="textPrimary">
          Caixa de saída Final
        </Typography>

        <GridContainer>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputText
              value={ph_caixa_saida_final}
              label="pH"
              type="number"
              error={isPresent(error.ph_caixa_saida_final)}
              helperText={error.ph_caixa_saida_final}
              required
              onChange={(text) => setPh_caixa_saida_final(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputText
              value={ss_caixa_saida_final}
              label="SS"
              type="number"
              error={isPresent(error.ss_caixa_saida_final)}
              helperText={error.ss_caixa_saida_final}
              required
              onChange={(text) => setSs_caixa_saida_final(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputText
              value={observacao_caixa_saida_final}
              label="Observação"
              error={isPresent(error.observacao_caixa_saida_final)}
              helperText={error.observacao_caixa_saida_final}
              required
              onChange={(text) => setObservacao_caixa_saida_final(text)}
            />
          </GridItem>
        </GridContainer>

        <GridContainerFooter>
          <Button
            onClick={() => navigate('/polimento-etas')}
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
