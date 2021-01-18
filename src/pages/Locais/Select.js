import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dig from 'object-dig';

import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';

import CardContainer from 'components/Card/CardContainer';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Button from 'components/Button/Button';
import InputSelect from 'components/Input/InputSelect';

import isBlank from 'utils/isBlank';
import api from 'services/api';
import handlingErros from 'utils/handlingErros';
import { useAuth } from 'contexts/auth';

const LocalSelect = () => {
  const navigate = useNavigate();
  const { empresa, local, setAuthLocal } = useAuth();

  const [loading, setLoading] = useState(false);
  const [locais, setLocais] = useState([]);

  async function onSubmit(event) {
    event.preventDefault();
    navigate('/usuarios');
  }

  useEffect(() => {
    async function getLocais() {
      setLoading(true);

      try {
        const response = await api.get(
          `/locais?empresaId=${dig(empresa, 'id')}`
        );
        setLoading(false);
        const { data } = response;
        setLocais(data);
      } catch (error) {
        setLoading(false);
        handlingErros(error);
      }
    }

    if (empresa) {
      getLocais();
    }
  }, [empresa]);

  return (
    <>
      <CardContainer
        Icon={AssistantPhotoIcon}
        iconColor="blue"
        title="Selecione o Local"
        loading={loading}
      >
        <GridContainer justify="center" alignItems="center">
          <GridItem xs={12} sm={6} md={6} lg={6} xl={6}>
            <InputSelect
              options={locais}
              name="nome"
              optionValue="id"
              value={local}
              loading={loading}
              label="Local"
              placeholder="Buscar"
              onChange={(local) => {
                setAuthLocal(local);
              }}
            />
          </GridItem>
        </GridContainer>

        <GridContainer justify="center" alignItems="center">
          <Button
            onClick={onSubmit}
            disabled={isBlank(local)}
            loading={loading}
            color="success"
          >
            Selecionar
          </Button>
        </GridContainer>
      </CardContainer>
    </>
  );
};

export default LocalSelect;
