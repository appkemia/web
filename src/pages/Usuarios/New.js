import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dig from 'object-dig';
import * as Yup from 'yup';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import InputAdornment from '@material-ui/core/InputAdornment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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

const UsuarioNew = () => {
  const navigate = useNavigate();
  const { empresa } = useAuth();

  const [loadingLocais, setLoadingLocais] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locais, setLocais] = useState([]);
  const [selectLocais, setSelectLocais] = useState([]);

  const [nome, setNome] = useState('');
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [tipo, setTipo] = React.useState('operator'); //tipo - 'master' | 'admin' | 'operator'

  const [error, setError] = useState({});

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    setTipo(event.target.value);
  };

  async function onSubmit(event) {
    event.preventDefault();

    let locaisIds = [];
    if (selectLocais) {
      locaisIds = selectLocais.map((item) => {
        return item.id;
      });
    }

    const user = {
      nome,
      username,
      senha,
      tipo,
      empresa_id: dig(empresa, 'id'),
      locais: locaisIds,
    };

    const schema = Yup.object().shape({
      nome: Yup.string().required('Por favor digite o nome'),
      username: Yup.string()
        .min(6, 'Digite no mínimo 6 caracteres')
        .required('Por favor digite o nome de usuário'),
      senha: Yup.string()
        .min(6, 'Digite no mínimo 6 caracteres')
        .required('Por favor digite a senha'),
    });

    const validation = await yupValidator(schema, user);

    setError(validation);
    if (isPresent(validation)) return;

    setLoading(true);
    try {
      const response = await api.post('/users', user);
      setLoading(false);

      toast.success('Sucesso');
      navigate(`/usuarios/show/${response.id}`);
    } catch (error) {
      setLoading(false);
      const validation = handlingErros(error);
      setError(validation);
    }
  }

  useEffect(() => {
    async function getLocais() {
      setLoadingLocais(true);

      try {
        const response = await api.get(
          `/locais?empresaId=${dig(empresa, 'id')}`
        );
        setLoadingLocais(false);
        const { data } = response;
        setLocais(data);
      } catch (error) {
        setLoadingLocais(false);
        handlingErros(error);
      }
    }

    getLocais();
  }, [empresa]);

  return (
    <>
      <Breadcrumbs maxItems={4} aria-label="breadcrumb">
        <Chip label='Usuários' onClick={() => navigate('/usuarios')} />
        <Typography color="textPrimary">Novo usuário</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={PersonAddIcon}
        iconColor="blue"
        title="Novo usuário"
        loading={loading}
      >
        <GridContainer>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputText
              value={nome}
              label={'Nome'}
              error={isPresent(error.nome)}
              helperText={error.nome}
              required
              onChange={(text) => setNome(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputText
              value={username}
              label="Nome de usuário"
              error={isPresent(error.username)}
              helperText={error.username}
              required
              onChange={(text) => setUsername(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputText
              value={senha}
              label="Senha"
              error={isPresent(error.senha)}
              helperText={error.senha}
              required
              InputProps={{
                type: showPassword ? 'text' : 'password',
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      color="secondary"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(text) => setSenha(text)}
            />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
            <InputSelect
              options={locais}
              multiple={true}
              name="nome"
              optionValue="id"
              value={selectLocais}
              loading={loadingLocais}
              label="Locais"
              placeholder="Buscar"
              onChange={(local) => {
                setSelectLocais(local);
              }}
            />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Tipo</FormLabel>
              <RadioGroup
                aria-label="tipo"
                name="tipo"
                value={tipo}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="operator"
                  control={<Radio />}
                  label="Operador"
                />
                <FormControlLabel
                  value="admin"
                  control={<Radio />}
                  label="Administrador"
                />
                <FormControlLabel
                  value="master"
                  control={<Radio />}
                  label="Master"
                />
              </RadioGroup>
            </FormControl>
          </GridItem>
        </GridContainer>

        <GridContainerFooter>
          <Button
            onClick={() => navigate('/usuarios')}
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

export default UsuarioNew;
