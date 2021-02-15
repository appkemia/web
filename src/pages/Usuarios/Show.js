import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dig from 'object-dig';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import PersonIcon from '@material-ui/icons/Person';
import InputLabel from '@material-ui/core/InputLabel';

import CardContainer from 'components/Card/CardContainer';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputShow from 'components/Input/InputShow';
import Button from 'components/Button/Button';
import GridAction from 'components/Grid/GridAction';

import api from 'services/api';
import handlingErros from 'utils/handlingErros';
import Can from 'contexts/Can';

const UsuarioShow = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUser() {
      setLoading(true);

      try {
        const response = await api.get(`/users/${id}`);
        setLoading(false);
        const { data } = response;
        setUser(data);
      } catch (error) {
        setLoading(false);
        setUser([]);
        handlingErros(error);
      }
    }

    getUser();
  }, [id]);

  return (
    <>
      <Breadcrumbs maxItems={4} aria-label="breadcrumb">
        <Chip label={'Usuários'} onClick={() => navigate('/usuarios')} />
        <Typography color="textPrimary">Visualizando usuário</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={PersonIcon}
        iconColor="blue"
        title={'Visualizando usuário'}
        loading={loading}
      >
        <GridAction>
          <Can I="edit" a="Usuarios">
            <Button
              onClick={() => navigate(`/usuarios/edit/${id}`)}
              color="orange"
            >
              Editar
            </Button>
          </Can>
        </GridAction>

        <GridContainer>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputShow label="Nome" value={dig(user, 'nome')} />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputShow label="Nome de usuário" value={dig(user, 'username')} />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputShow label="Tipo" value={dig(user, 'tipo')} />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputShow label="Empresa" value={dig(user, 'empresa', 'nome')} />
          </GridItem>

          <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
            <InputLabel style={{ marginBottom: 10 }}>Locais</InputLabel>
            {user.locais &&
              user.locais.map((item) => (
                <Chip
                  style={{ marginRight: 5 }}
                  key={item.id}
                  label={item.nome}
                  color="primary"
                />
              ))}
          </GridItem>
        </GridContainer>
      </CardContainer>
    </>
  );
};

export default UsuarioShow;
