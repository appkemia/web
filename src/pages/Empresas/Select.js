import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import BusinessIcon from '@material-ui/icons/Business';

import CardContainer from 'components/Card/CardContainer';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Button from 'components/Button/Button';
import InputSelect from 'components/Input/InputSelect';

import isBlank from 'utils/isBlank';
import api from 'services/api';
import handlingErros from 'utils/handlingErros';
import { useAuth } from 'contexts/auth';

const EmpresaSelect = () => {
  const navigate = useNavigate();
  const { empresa, setAuthEmpresa } = useAuth();

  const [loading, setLoading] = useState(false);
  const [empresas, setEmpresas] = useState([]);

  async function onSubmit(event) {
    event.preventDefault();
    navigate('/locais/select');
  }

  useEffect(() => {
    async function getEmpresas() {
      setLoading(true);

      try {
        const response = await api.get('/empresas');
        setLoading(false);
        const { data } = response;
        setEmpresas(data);
      } catch (error) {
        setLoading(false);
        handlingErros(error);
      }
    }

    getEmpresas();
  }, []);

  return (
    <>
      <CardContainer
        Icon={BusinessIcon}
        iconColor="blue"
        title="Selecione a Empresa"
        loading={loading}
      >
        <GridContainer justify="center" alignItems="center">
          <GridItem xs={12} sm={6} md={6} lg={6} xl={6}>
            <InputSelect
              options={empresas}
              name="nome"
              optionValue="id"
              value={empresa}
              loading={loading}
              label="Empresa"
              placeholder="Buscar"
              onChange={(empresa) => {
                setAuthEmpresa(empresa);
              }}
            />
          </GridItem>
        </GridContainer>

        <GridContainer justify="center" alignItems="center">
          <Button
            onClick={onSubmit}
            disabled={isBlank(empresa)}
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

export default EmpresaSelect;
