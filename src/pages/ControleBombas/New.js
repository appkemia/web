import React, { useState, useEffect } from 'react';
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
import InputSelect from 'components/Input/InputSelect';

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
  const [equipamentos, setEquipamentos] = useState([]);
  const [equipamento, setEquipamento] = useState(null);

  const [data, setData] = useState(Date.now());
  const [hora, setHora] = useState(Date.now());
  const [corrente, setCorrente] = useState('');
  const [leitura, setLeitura] = useState('');
  const [acao_corretiva, setAcao_corretiva] = useState('');

  const [error, setError] = useState({});

  async function onSubmit(event) {
    event.preventDefault();

    const dados = {
      data: formatDate(data, 'yyyy-MM-dd'),
      hora: formatDate(hora, 'HH:mm:ss'),
      corrente,
      leitura,
      acao_corretiva,
      equipamento_id: dig(equipamento, 'id'),
      empresa_id: dig(empresa, 'id'),
      local_id: dig(local, 'id'),
    };

    const schema = Yup.object().shape({
      equipamento_id: Yup.string().min(1, 'Tanque é obrigatório').required('Tanque é obrigatório'),
      corrente: Yup.string().required('Tempo ligado 2cv é obrigatório'),
      leitura: Yup.string().required('Tempo desligado 2cv é obrigatório'),
      acao_corretiva: Yup.string().required('Ação corretiva é obrigatório'),
  });


    const validation = await yupValidator(schema, dados);

    setError(validation);
    if (isPresent(validation)) return;

    setLoading(true);
    try {
      const response = await api.post('/controle-bombas', dados);
      setLoading(false);

      toast.success('Salvo com sucesso!');
      navigate(`/controle-bombas/show/${response.data.id}`);
    } catch (error) {
      setLoading(false);
      const validation = handlingErros(error);
      setError(validation);
    }
  }

  useEffect(() => {
    async function getEquipamentos() {
      setLoading(true);

      try {
        const response = await api.get(`/equipamentos?localId=${dig(local, 'id')}`);
        setLoading(false);
        const { data } = response;
        setEquipamentos(data);
      } catch (error) {
        setLoading(false);
        handlingErros(error);
      }
    }

    if (local) {
      getEquipamentos();
    }
  }, [local]);

  return (
    <>
      <Breadcrumbs maxItems={4} aria-label="breadcrumb">
        <Chip
          label="Controle Bomba"
          onClick={() => navigate('/controle-bombas')}
        />
        <Typography color="textPrimary">Novo Controle Bomba</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={PlaylistAddCheckIcon}
        iconColor="blue"
        title="Novo Controle Bomba"
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
              options={equipamentos}
              name="nome"
              optionValue="id"
              value={equipamento}
              loading={loading}
              label="Equipamento"
              placeholder="Buscar"
              error={isPresent(error.equipamento_id)}
              helperText={error.equipamento_id}
              onChange={(equipamento) => {
                setEquipamento(equipamento);
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
              value={corrente}
              label="Corrente"
              type="number"
              error={isPresent(error.corrente)}
              helperText={error.corrente}
              required
              onChange={(text) => setCorrente(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputText
              value={leitura}
              label="Leitura"
              type="number"
              error={isPresent(error.leitura)}
              helperText={error.leitura}
              required
              onChange={(text) => setLeitura(text)}
            />
          </GridItem>
        </GridContainer>

        <GridContainerFooter>
          <Button
            onClick={() => navigate('/controle-bombas')}
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
