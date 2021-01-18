import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import InputText from 'components/Input/InputText';
import Button from 'components/Button/Button';
import LinearProgress from 'components/LinearProgress';
import HelperText from 'components/HelperText';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';

import Container from '@material-ui/core/Container';
import yupValidator from 'utils/yupValidator';
import isPresent from 'utils/isPresent';
import { useAuth } from 'contexts/auth';
import api from 'services/api';
import handlingErros from 'utils/handlingErros';

import useStyles from './styles';
import logo from 'assets/images/logo-kemia.png';

const Login = () => {
  const classes = useStyles();
  const { setAuthToken, setAuthUser, setAuthEmpresa } = useAuth();

  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  async function handleLogin(event) {
    event.preventDefault();

    const schema = Yup.object().shape({
      username: Yup.string().trim().required('O nome de usuário é obrigatório'),
      senha: Yup.string().trim().required('A senha é obrigatório'),
    });

    const data = {
      username: username,
      senha: senha,
    };

    const validation = await yupValidator(schema, data);

    setError(validation);
    if (isPresent(validation)) return;

    setLoading(true);
    try {
      const response = await api.post('/authenticate', data);
      setLoading(false);

      const { token, refreshToken, user } = response.data;

      setAuthToken(token, refreshToken);

      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthEmpresa(user.empresa);
      setAuthUser(user);

      toast.success('Login realizado com sucesso!');
    } catch (error) {
      setLoading(false);
      const validation = handlingErros(error);
      setError(validation);
    }
  }

  return (
    <>
      <div className={classes.root}>
        {/* <img src={logo} style={{ position: 'absolute' }} alt="logo" /> */}

        <Container component="main" maxWidth="xs" className={classes.container}>
          <div className={classes.paper}>
            <div className={classes.imageLogoRoot}>
              <img src={logo} alt="logo" className={classes.imageLogo} />
            </div>

            <Typography component="h1" variant="h5" className={classes.title}>
              Faça seu login
            </Typography>

            <LinearProgress loading={loading} />

            <GridContainer>
              <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
                <InputText
                  autoFocus
                  value={username}
                  label={'Login'}
                  error={isPresent(error.username)}
                  helperText={error.username}
                  required
                  onChange={(text) => setUsername(text)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
                <InputText
                  value={senha}
                  label={'Senha'}
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

            <HelperText error={isPresent(error.error)} text={error.error} />

            <Button
              classes={{ root: classes.submit }}
              color="secondary"
              fullWidth
              disabled={loading}
              loading={loading}
              onClick={handleLogin}
            >
              Entrar
            </Button>

            <LinearProgress loading={loading} />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Login;
