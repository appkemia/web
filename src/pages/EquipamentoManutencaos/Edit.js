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

  const [equipamentos, setEquipamentos] = useState([]);
  const [equipamento, setEquipamento] = useState(null);

  const [saida, setSaida] = useState(Date.now());
  const [retorno, setRetorno] = useState(null);
  const [problema, setProblema] = useState('');

  const [error, setError] = useState({});

  async function onSubmit(event) {
    event.preventDefault();

    const dados = {
      saida: formatDate(saida, 'yyyy-MM-dd'),
      retorno: formatDate(retorno, 'yyyy-MM-dd'),
      problema,
      equipamento_id: dig(equipamento, 'id'),
      empresa_id: dig(empresa, 'id'),
      local_id: dig(local, 'id'),
    };

    const schema = Yup.object().shape({
      equipamento_id: Yup.string()
        .min(1, 'Equipamento é obrigatório')
        .required('Equipamento é obrigatório'),
      problema: Yup.string().required('Probelma é obrigatório'),
    });

    const validation = await yupValidator(schema, dados);

    setError(validation);
    if (isPresent(validation)) return;

    setLoading(true);
    try {
      await api.put(`/equipamento-manutencaos/${id}`, dados);
      setLoading(false);

      toast.success('Salvo com sucesso!');
      navigate(`/equipamento-manutencaos/show/${id}`);
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
        const response = await api.get(`/equipamento-manutencaos/${id}`);
        setLoading(false);
        const { data } = response;

        setSaida(new Date(data.saida));
        if (data.retorno) {
          setRetorno(new Date(data.retorno));
        }
        setProblema(data.problema);
        setEquipamento(data.equipamento);
      } catch (error) {
        setLoading(false);
        handlingErros(error);
      }
    }

    getData();
  }, [id, empresa]);

  useEffect(() => {
    async function getEquipamentos() {
      setLoading(true);

      try {
        const response = await api.get(
          `/equipamentos?localId=${dig(local, 'id')}`
        );
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
          label="Equipamento Manutenção"
          onClick={() => navigate('/equipamento-manutencaos')}
        />
        <Typography color="textPrimary">
          Editando Equipamento Manutenção
        </Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={PlaylistAddCheckIcon}
        iconColor="blue"
        title="Editanto Equipamento Manutenção"
        loading={loading}
      >
        <GridContainer>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputDate
              label="Saída"
              value={saida}
              onChange={setSaida}
              required
            />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputDate label="Retorno" value={retorno} onChange={setRetorno} />
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
              required
              error={isPresent(error.equipamento_id)}
              helperText={error.equipamento_id}
              onChange={(equipamento) => {
                setEquipamento(equipamento);
              }}
            />
          </GridItem>

          <GridItem xs={12} sm={6} md={6} lg={6} xl={6}>
            <InputText
              value={problema}
              label="Problema"
              error={isPresent(error.problema)}
              helperText={error.problema}
              required
              onChange={(text) => setProblema(text)}
            />
          </GridItem>
        </GridContainer>

        <GridContainerFooter>
          <Button
            onClick={() => navigate('/equipamento-manutencaos')}
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
