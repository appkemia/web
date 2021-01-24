import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dig from 'object-dig';
import * as Yup from 'yup';

import PoolIcon from '@material-ui/icons/Pool';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import CardContainer from 'components/Card/CardContainer';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputText from 'components/Input/InputText';
import InputCheckBox from 'components/Input/InputCheckBox';
import Button from 'components/Button/Button';
import GridContainerFooter from 'components/Grid/GridContainerFooter';

import isPresent from 'utils/isPresent';
import api from 'services/api';
import yupValidator from 'utils/yupValidator';
import handlingErros from 'utils/handlingErros';
import { useAuth } from 'contexts/auth';

const New = () => {
  const navigate = useNavigate();
  const { empresa, local } = useAuth();

  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [is_ph, setIs_ph] = useState(false);
  const [is_od, setIs_od] = useState(false);
  const [is_ss, setIs_ss] = useState(false);
  const [is_aeracao, setIs_aeracao] = useState(false);
  const [is_observacao, setIs_observacao] = useState(false);

  const [error, setError] = useState({});

  async function onSubmit(event) {
    event.preventDefault();

    const data = {
      nome,
      descricao,
      is_ph,
      is_od,
      is_ss,
      is_aeracao,
      is_observacao,
      empresa_id: dig(empresa, 'id'),
      local_id: dig(local, 'id'),
    };

    const schema = Yup.object().shape({
      nome: Yup.string().required('Por favor digite o nome'),
      descricao: Yup.string().required('Por favor digite a descrição'),
    });

    const validation = await yupValidator(schema, data);

    setError(validation);
    if (isPresent(validation)) return;

    setLoading(true);
    try {
      const response = await api.post('/lagoas', data);
      setLoading(false);

      toast.success('Salvo com sucesso!');
      navigate(`/lagoas/show/${response.data.id}`);
    } catch (error) {
      setLoading(false);
      const validation = handlingErros(error);
      setError(validation);
    }
  }

  return (
    <>
      <Breadcrumbs maxItems={4} aria-label="breadcrumb">
        <Chip label="Lagoas" onClick={() => navigate('/lagoas')} />
        <Typography color="textPrimary">Novo lagoa</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={PoolIcon}
        iconColor="blue"
        title="Novo lagoa"
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
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputCheckBox value={is_ph} label="pH" onChange={setIs_ph} />
            <InputCheckBox value={is_od} label="OD" onChange={setIs_od} />
            <InputCheckBox value={is_ss} label="SS" onChange={setIs_ss} />
            <InputCheckBox
              value={is_aeracao}
              label="Aeração"
              onChange={setIs_aeracao}
            />
            <InputCheckBox
              value={is_observacao}
              label="Observações"
              onChange={setIs_observacao}
            />
          </GridItem>
        </GridContainer>

        <GridContainerFooter>
          <Button
            onClick={() => navigate('/lagoas')}
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
