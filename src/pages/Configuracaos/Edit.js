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
import InputShow from 'components/Input/InputShow';

import isPresent from 'utils/isPresent';
import api from 'services/api';
import yupValidator from 'utils/yupValidator';
import handlingErros from 'utils/handlingErros';
import { useAuth } from 'contexts/auth';

const UsuarioEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { empresa } = useAuth();

  const [loading, setLoading] = useState(false);
  const [tipo, setTipo] = useState('');
  const [bruto_min, setBruto_min] = useState('');
  const [bruto_max, setBruto_max] = useState('');
  const [reator1_min, setReator1_min] = useState('');
  const [reator1_max, setReator1_max] = useState('');
  const [reator2_min, setReator2_min] = useState('');
  const [reator2_max, setReator2_max] = useState('');
  const [reator3_min, setReator3_min] = useState('');
  const [reator3_max, setReator3_max] = useState('');
  const [tratado_min, setTratado_min] = useState('');
  const [tratado_max, setTratado_max] = useState('');

  const [error, setError] = useState({});

  async function onSubmit(event) {
    event.preventDefault();

    const dados = {
      tipo,
      bruto_min,
      bruto_max,
      reator1_min,
      reator1_max,
      reator2_min,
      reator2_max,
      reator3_min,
      reator3_max,
      tratado_min,
      tratado_max,
      empresa_id: dig(empresa, 'id'),
    };

    const schema = Yup.object().shape({
      tipo: Yup.string()
        .min(1, 'Tipo é obrigatório')
        .required('Tipo é obrigatório'),
      bruto_min: Yup.string().required('Bruto mínimo ligado é obrigatório'),
      bruto_max: Yup.string().required('Bruto máximo desligado é obrigatório'),
      reator1_min: Yup.string().required(
        'Reator 1 mínimo ligado é obrigatório'
      ),
      reator1_max: Yup.string().required(
        'Reator 1 máximo desligado é obrigatório'
      ),
      reator2_min: Yup.string().required(
        'Reator 2 mínimo ligado é obrigatório'
      ),
      reator2_max: Yup.string().required(
        'Reator 2 máximo desligado é obrigatório'
      ),
      reator3_min: Yup.string().required(
        'Reator 3 mínimo ligado é obrigatório'
      ),
      reator3_max: Yup.string().required(
        'Reator 3 máximo desligado é obrigatório'
      ),
      tratado_min: Yup.string().required('Tratado mínimo ligado é obrigatório'),
      tratado_max: Yup.string().required(
        'Tratado máximo desligado é obrigatório'
      ),
    });

    const validation = await yupValidator(schema, dados);

    setError(validation);
    if (isPresent(validation)) return;

    setLoading(true);
    try {
      await api.put(`/configuracaos/${id}`, dados);
      setLoading(false);

      toast.success('Salvo com sucesso!');
      navigate(`/configuracaos/show/${id}`);
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
        const response = await api.get(`/configuracaos/${id}`);
        setLoading(false);
        const { data } = response;

        setTipo(data.tipo);
        setBruto_min(data.bruto_min);
        setBruto_max(data.bruto_max);
        setReator1_min(data.reator1_min);
        setReator1_max(data.reator1_max);
        setReator2_min(data.reator2_min);
        setReator2_max(data.reator2_max);
        setReator3_min(data.reator3_min);
        setReator3_max(data.reator3_max);
        setTratado_min(data.tratado_min);
        setTratado_max(data.tratado_max);
      } catch (error) {
        setLoading(false);
        handlingErros(error);
      }
    }

    getData();
  }, [id, empresa]);

  return (
    <>
      <Breadcrumbs maxItems={4} aria-label="breadcrumb">
        <Chip
          label="Configurações"
          onClick={() => navigate('/configuracaos')}
        />
        <Typography color="textPrimary">Editando Configuração</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={PlaylistAddCheckIcon}
        iconColor="blue"
        title="Editanto Configuração"
        loading={loading}
      >
        <GridContainer>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="Tipo" value={tipo} />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputText
              value={bruto_min}
              label="Bruto minímo"
              type="number"
              error={isPresent(error.bruto_min)}
              helperText={error.bruto_min}
              required
              onChange={(text) => setBruto_min(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputText
              value={bruto_max}
              label="Bruto máximo"
              type="number"
              error={isPresent(error.bruto_max)}
              helperText={error.bruto_max}
              required
              onChange={(text) => setBruto_max(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputText
              value={reator1_min}
              label="Reator 1 minímo"
              type="number"
              error={isPresent(error.reator1_min)}
              helperText={error.reator1_min}
              required
              onChange={(text) => setReator1_min(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputText
              value={reator1_max}
              label="Reator 1 máximo"
              type="number"
              error={isPresent(error.reator1_max)}
              helperText={error.reator1_max}
              required
              onChange={(text) => setReator1_max(text)}
            />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputText
              value={reator2_min}
              label="Reator 2 minímo"
              type="number"
              error={isPresent(error.reator2_min)}
              helperText={error.reator2_min}
              required
              onChange={(text) => setReator2_min(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputText
              value={reator2_max}
              label="Reator 2 máximo"
              type="number"
              error={isPresent(error.reator2_max)}
              helperText={error.reator2_max}
              required
              onChange={(text) => setReator2_max(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputText
              value={reator3_min}
              label="Reator 3 minímo"
              type="number"
              error={isPresent(error.reator3_min)}
              helperText={error.reator3_min}
              required
              onChange={(text) => setReator3_min(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputText
              value={reator3_max}
              label="Reator 3 máximo"
              type="number"
              error={isPresent(error.reator3_max)}
              helperText={error.reator3_max}
              required
              onChange={(text) => setReator3_max(text)}
            />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputText
              value={tratado_min}
              label="Tratado minímo"
              type="number"
              error={isPresent(error.tratado_min)}
              helperText={error.tratado_min}
              required
              onChange={(text) => setTratado_min(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputText
              value={tratado_max}
              label="Tratado máximo"
              type="number"
              error={isPresent(error.tratado_max)}
              helperText={error.tratado_max}
              required
              onChange={(text) => setTratado_max(text)}
            />
          </GridItem>
        </GridContainer>

        <GridContainerFooter>
          <Button
            onClick={() => navigate('/configuracaos')}
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
