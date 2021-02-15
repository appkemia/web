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
import Button from 'components/Button/Button';
import GridContainerFooter from 'components/Grid/GridContainerFooter';
import InputDate from 'components/Input/InputDate';
import InputSelect from 'components/Input/InputSelect';
import InputShow from 'components/Input/InputShow';

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
  const [loadingUsers, setLoadingUsers] = useState(false);

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  const [data, setData] = useState(Date.now());
  const [atividade, setAtividade] = useState(null);

  const atividades = [
    {
      id: 'CONTROLE-COLETA',
      nome: 'Controle de Coleta',
    },
    {
      id: 'CONTROLE-OD',
      nome: 'Controle de OD',
    },
    {
      id: 'CONTROLE-SS',
      nome: 'Controle de SS',
    },
    {
      id: 'CONTROLE-PH',
      nome: 'Controle de pH',
    },
    {
      id: 'CONTROLE-VAZAO',
      nome: 'Controle de Vazão',
    },
    {
      id: 'CONTROLE-TANQUE',
      nome: 'Controle de Tanque',
    },
    {
      id: 'CONTROLE-BOMBA',
      nome: 'Controle de Rotação da Bomba',
    },
    {
      id: 'CONTROLE-CONCENTRACAO-CLORO',
      nome: 'Controle de Concentração de Cloro',
    },
    {
      id: 'CONTROLE-PASTILHA-CLORO',
      nome: 'Controle de Pastilha de Cloro',
    },
    {
      id: 'POLIMENTO-ETA',
      nome: 'Polimento com ETA',
    },
    {
      id: 'TRATAMENTO-EFLUENTE-LAGOA',
      nome: 'Tratamento de Efluente com Lagoa',
    },
  ];

  const [error, setError] = useState({});

  async function onSubmit(event) {
    event.preventDefault();

    const dados = {
      data: formatDate(data, 'yyyy-MM-dd'),
      atividade: dig(atividade, 'id'),
      user_id: dig(user, 'id'),
      empresa_id: dig(empresa, 'id'),
      local_id: dig(local, 'id'),
    };

    const schema = Yup.object().shape({
      data: Yup.string().min(1).required('Data é obrigatório'),
      user_id: Yup.string().min(1).required('Operador é obrigatório'),
      atividade: Yup.string().min(1).required('Atividade é obrigatório'),
    });

    const validation = await yupValidator(schema, dados);

    setError(validation);
    if (isPresent(validation)) return;

    setLoading(true);
    try {
      await api.put(`/tarefas/${id}`, dados);
      setLoading(false);

      toast.success('Salvo com sucesso!');
      navigate(`/tarefas/show/${id}`);
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
        const response = await api.get(`/tarefas/${id}`);
        setLoading(false);
        const { data } = response;

        setData(new Date(data.data));
        setUser(data.user);

        const atividad = atividades.filter((row) => row.id === data.atividade);
        setAtividade(dig(atividad[0]));
      } catch (error) {
        setLoading(false);
        handlingErros(error);
      }
    }

    getData();
  }, [id, empresa, atividades]);

  useEffect(() => {
    async function getUsers() {
      setLoadingUsers(true);

      try {
        const response = await api.get(
          `/operadores?empresaId=${dig(empresa, 'id')}`
        );
        setLoadingUsers(false);
        const { data } = response;
        setUsers(data);
      } catch (error) {
        setLoadingUsers(false);
        handlingErros(error);
      }
    }

    if (empresa) {
      getUsers();
    }
  }, [empresa]);

  return (
    <>
      <Breadcrumbs maxItems={4} aria-label="breadcrumb">
        <Chip label="Tarefa" onClick={() => navigate('/tarefas')} />
        <Typography color="textPrimary">Editando Tarefa</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={PlaylistAddCheckIcon}
        iconColor="blue"
        title="Editanto Tarefa"
        loading={loading}
      >
        <GridContainer>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputDate label="Data" value={data} onChange={setData} required />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputShow label="Local" value={dig(local, 'nome')} />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputSelect
              options={users}
              name="nome"
              optionValue="id"
              value={user}
              loading={loadingUsers}
              label="Operador"
              placeholder="Buscar"
              onChange={(user) => {
                setUser(user);
              }}
            />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputSelect
              options={atividades}
              name="nome"
              optionValue="id"
              value={atividade}
              label="Atividade"
              placeholder="Buscar"
              onChange={(atividade) => {
                setAtividade(atividade);
              }}
            />
          </GridItem>
        </GridContainer>

        <GridContainerFooter>
          <Button
            onClick={() => navigate('/tarefas')}
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
