import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dig from 'object-dig';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import PersonIcon from '@material-ui/icons/Person';

import CardContainer from 'components/Card/CardContainer';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputShow from 'components/Input/InputShow';
import Button from 'components/Button/Button';
import GridAction from 'components/Grid/GridAction';

import api from 'services/api';
import handlingErros from 'utils/handlingErros';
import Can from 'contexts/Can';

const EmpresaShow = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getEmpresa() {
      setLoading(true);

      try {
        const response = await api.get(`/empresas/${id}`);
        setLoading(false);
        const { data } = response;
        setUser(data);
      } catch (error) {
        setLoading(false);
        setUser([]);
        handlingErros(error);
      }
    }

    getEmpresa();
  }, [id]);

  return (
    <>
      <Breadcrumbs maxItems={4} aria-label="breadcrumb">
        <Chip label="Empresas" onClick={() => navigate('/empresas')} />
        <Typography color="textPrimary">Visualizando empresa</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={PersonIcon}
        iconColor="blue"
        title="Visualizando empresa"
        loading={loading}
      >
        <GridAction>
          <Can I="edit" a="Empresas">
            <Button
              onClick={() => navigate(`/empresas/edit/${id}`)}
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

          <GridItem xs={12} sm={6} md={6} lg={6} xl={6}>
            <InputShow label="Descricção" value={dig(user, 'descricao')} />
          </GridItem>
        </GridContainer>
      </CardContainer>
    </>
  );
};

export default EmpresaShow;
