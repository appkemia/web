import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dig from 'object-dig';
import * as Yup from 'yup';

import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import CardContainer from 'components/Card/CardContainer';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputText from 'components/Input/InputText';
import Button from 'components/Button/Button';
import GridContainerFooter from 'components/Grid/GridContainerFooter';
import InputSelect from 'components/Input/InputSelect';

import isPresent from 'utils/isPresent';
import api from 'services/api';
import yupValidator from 'utils/yupValidator';
import handlingErros from 'utils/handlingErros';
import { useAuth } from 'contexts/auth';

const New = () => {
  const navigate = useNavigate();
  const { empresa } = useAuth();

  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const [users, setUsers] = useState([]);
  const [selectUsers, setSelectUsers] = useState([]);

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [endereco, setEndereco] = useState('');


  const [error, setError] = useState({});

  async function onSubmit(event) {
    event.preventDefault();

    let usersIds = [];
    if (selectUsers) {
      usersIds = selectUsers.map((item) => {
        return item.id;
      });
    }

    const dados = {
      nome,
      descricao,
      endereco,
      users: usersIds,
      empresa_id: dig(empresa, 'id'),
    };

    const schema = Yup.object().shape({
      nome: Yup.string()
        .min(1, 'Nome é obrigatório')
        .required('Nome é obrigatório'),
      descricao: Yup.string().required('Descrição ligado é obrigatório'),
      endereco: Yup.string().required('Endereço desligado é obrigatório'),
    });

    const validation = await yupValidator(schema, dados);

    setError(validation);
    if (isPresent(validation)) return;

    setLoading(true);
    try {
      const response = await api.post('/locais', dados);
      setLoading(false);

      toast.success('Salvo com sucesso!');
      navigate(`/locais/show/${response.data.id}`);
    } catch (error) {
      setLoading(false);
      const validation = handlingErros(error);
      setError(validation);
    }
  }

  useEffect(() => {
    async function getUsers() {
      setLoadingUsers(true);

      try {
        const response = await api.get(
          `/users?empresaId=${dig(empresa, 'id')}`
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
        <Chip label="Locais" onClick={() => navigate('/locais')} />
        <Typography color="textPrimary">Novo Local</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={AssistantPhotoIcon}
        iconColor="blue"
        title="Novo Local"
        loading={loading}
      >
        <GridContainer>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputText
              value={nome}
              label="Nome"
              error={isPresent(error.nome)}
              helperText={error.nome}
              required
              onChange={(text) => setNome(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={8} md={8} lg={8} xl={8}>
            <InputText
              value={descricao}
              label="Descrição"
              error={isPresent(error.descricao)}
              helperText={error.descricao}
              required
              onChange={(text) => setDescricao(text)}
            />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
            <InputText
              value={endereco}
              label="Endereço"
              error={isPresent(error.endereco)}
              helperText={error.endereco}
              required
              onChange={(text) => setEndereco(text)}
            />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
          <InputSelect
              options={users}
              multiple={true}
              name="nome"
              optionValue="id"
              value={selectUsers}
              loading={loadingUsers}
              label="Usuários"
              placeholder="Buscar"
              onChange={(user) => {
                setSelectUsers(user);
              }}
            />
          </GridItem>
        </GridContainer>

        <GridContainerFooter>
          <Button
            onClick={() => navigate('/locais')}
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
