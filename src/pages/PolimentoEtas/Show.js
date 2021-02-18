import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dig from 'object-dig';

import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import Link from '@material-ui/core/Link';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

import CardContainer from 'components/Card/CardContainer';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputShow from 'components/Input/InputShow';
import Button from 'components/Button/Button';
import GridAction from 'components/Grid/GridAction';
import IconButton from 'components/Button/IconButton';

import api from 'services/api';
import handlingErros from 'utils/handlingErros';
import Can from 'contexts/Can';

import { URL } from 'config/uri';

const useStyles = makeStyles(() => ({
  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    margin: 20,
    marginRight: 8,
    width: 120,
    height: 80,
    padding: 4,
    boxSizing: 'border-box',
  },
  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
  },
  img: {
    display: 'block',
    width: 'auto',
    height: '100%',
  },
}));

const Show = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    async function getData() {
      setLoading(true);

      try {
        const response = await api.get(`/polimento-etas/${id}`);
        setLoading(false);
        const { data } = response;
        setData(data);
      } catch (error) {
        setLoading(false);
        setData([]);
        handlingErros(error);
      }
    }

    getData();
  }, [id]);

  return (
    <>
      <Breadcrumbs maxItems={4} aria-label="breadcrumb">
        <Chip
          label="Polimento ETA"
          onClick={() => navigate('/polimento-etas')}
        />
        <Typography color="textPrimary">Visualizando polimento ETA</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={PlaylistAddCheckIcon}
        iconColor="blue"
        title="Visualizando polimento ETA"
        loading={loading}
      >
        <GridAction>
          <Can I="edit" a="PolimentoEtas">
            <Button
              onClick={() => navigate(`/polimento-etas/edit/${id}`)}
              color="orange"
            >
              Editar
            </Button>
          </Can>
        </GridAction>

        <GridContainer>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="Data" value={dig(data, 'dateFormat')} />
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="Operador" value={dig(data, 'operador', 'nome')} />
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="ETA" value={dig(data, 'eta', 'nome')} />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="Vazão" value={dig(data, 'vazao')} />
          </GridItem>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="pH" value={dig(data, 'ph')} />
          </GridItem>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="PAC" value={dig(data, 'pac')} />
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="% Polímero" value={dig(data, 'polimero')} />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="% Hipoclorito" value={dig(data, 'hipoclorito')} />
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="Observação" value={dig(data, 'observacao')} />
          </GridItem>
        </GridContainer>

        <Typography style={{ marginTop: 50 }} color="textPrimary">
          Caixa de saída ETA
        </Typography>

        <GridContainer>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputShow label="pH" value={dig(data, 'ph_caixa_saida_eta')} />
          </GridItem>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputShow label="SS" value={dig(data, 'ss_caixa_saida_eta')} />
          </GridItem>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputShow
              label="Observação"
              value={dig(data, 'observacao_caixa_saida_eta')}
            />
          </GridItem>
        </GridContainer>

        <Typography style={{ marginTop: 50 }} color="textPrimary">
          Caixa de saída Final
        </Typography>

        <GridContainer>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputShow label="pH" value={dig(data, 'ph_caixa_saida_final')} />
          </GridItem>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputShow label="SS" value={dig(data, 'ss_caixa_saida_final')} />
          </GridItem>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputShow
              label="Observação"
              value={dig(data, 'observacao_caixa_saida_final')}
            />
          </GridItem>
        </GridContainer>

        {data.files &&
          data.files.map((file) => (
            <GridContainer key={file.name} direction="row" alignItems="center">
              <GridItem xs={12} sm={2} md={2} lg={2} xl={2}>
                <div className={classes.thumb}>
                  <div className={classes.thumbInner}>
                    <img
                      src={`${URL}/files/${file.id}`}
                      className={classes.img}
                    />
                  </div>
                </div>
              </GridItem>
              <GridItem xs={12} sm={6} md={6} lg={6} xl={6}>
                {file.path}
                <Link
                  target="_blank"
                  rel="noopener"
                  href={`${URL}/files/${file.id}`}
                >
                  <IconButton
                    tooltip="Remover"
                    Icon={RemoveRedEyeIcon}
                    iconColor="green"
                  />
                </Link>
              </GridItem>
            </GridContainer>
          ))}
      </CardContainer>
    </>
  );
};

export default Show;
