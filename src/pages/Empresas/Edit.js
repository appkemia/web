import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import BusinessIcon from '@material-ui/icons/Business';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import CardContainer from 'components/Card/CardContainer';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputText from 'components/Input/InputText';
import Button from 'components/Button/Button';
import GridContainerFooter from 'components/Grid/GridContainerFooter';

import isPresent from 'utils/isPresent';
import api from 'services/api';
import yupValidator from 'utils/yupValidator';
import handlingErros from 'utils/handlingErros';

const EmpresaEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const [error, setError] = useState({});

  async function onSubmit(event) {
    event.preventDefault();

    let empresa = {
      nome,
      descricao,
    };

    const schema = Yup.object().shape({
      nome: Yup.string().required('Por favor digite o nome'),
      descricao: Yup.string()

        .required('Por favor digite a descricação'),
      senha: Yup.string(),
    });

    const validation = await yupValidator(schema, empresa);

    setError(validation);
    if (isPresent(validation)) return;

    setLoading(true);
    try {
      await api.put(`/empresas/${id}`, empresa);
      setLoading(false);

      toast.success('Salvo com sucesso!');
      navigate(`/empresas/show/${id}`);
    } catch (error) {
      setLoading(false);
      const validation = handlingErros(error);
      setError(validation);
    }
  }

  useEffect(() => {
    async function getEmpresa() {
      setLoading(true);

      try {
        const response = await api.get(`/empresas/${id}`);
        setLoading(false);
        const { data } = response;

        setNome(data.nome);
        setDescricao(data.descricao);
      } catch (error) {
        setLoading(false);
        handlingErros(error);
      }
    }

    getEmpresa();
  }, [id]);

  return (
    <>
      <Breadcrumbs maxItems={4} aria-label="breadcrumb">
        <Chip label="Empresas" onClick={() => navigate('/empresas')} />
        <Typography color="textPrimary">Editando empresa</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={BusinessIcon}
        iconColor="blue"
        title='Editanto empresa'
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

          <GridItem xs={12} sm={6} md={6} lg={6} xl={6}>
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

        <GridContainerFooter>
          <Button
            onClick={() => navigate('/empresas')}
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

export default EmpresaEdit;
