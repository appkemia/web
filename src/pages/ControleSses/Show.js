import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dig from 'object-dig';

import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import Link from '@material-ui/core/Link';

import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import CardContainer from 'components/Card/CardContainer';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputShow from 'components/Input/InputShow';
import Button from 'components/Button/Button';
import GridAction from 'components/Grid/GridAction';
import IconButton from 'components/Button/IconButton';

import isPresent from 'utils/isPresent';
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
        const response = await api.get(`/controle-sses/${id}`);
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
          label="Controle de SS"
          onClick={() => navigate('/controle-sses')}
        />
        <Typography color="textPrimary">Visualizando controle de SS</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={PlaylistAddCheckIcon}
        iconColor="blue"
        title="Visualizando controle de SS"
        loading={loading}
      >
        <GridAction>
          <Can I="edit" a="ControleSses">
            <Button
              onClick={() => navigate(`/controle-sses/edit/${id}`)}
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
            <InputShow label="Hora" value={dig(data, 'hora')} />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="Bruto" value={dig(data, 'bruto')} />
          </GridItem>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="Reator 1" value={dig(data, 'reator_1')} />
          </GridItem>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="Reator 2" value={dig(data, 'reator_2')} />
          </GridItem>

          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="Reator 3" value={dig(data, 'reator_3')} />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={3} md={3} lg={3} xl={3}>
            <InputShow label="Tratado" value={dig(data, 'tratado')} />
          </GridItem>
          <GridItem xs={12} sm={9} md={9} lg={9} xl={9}>
            <InputShow
              label="Ação Corretiva"
              value={dig(data, 'acao_corretiva')}
            />
          </GridItem>
        </GridContainer>

        <GridContainer direction="row" alignItems="center">
          {isPresent(data.efluente_bruto) && (
            <>
              <GridItem xs={12} sm={2} md={2} lg={2} xl={2}>
                <div className={classes.thumb}>
                  <div className={classes.thumbInner}>
                    <img
                      src={`${URL}/controle-sses/${dig(
                        data,
                        'id'
                      )}/image-bruto`}
                      className={classes.img}
                    />
                  </div>
                </div>
              </GridItem>
              <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
                {dig(data, 'efluente_tratado')}
                <Link
                  target="_blank"
                  rel="noopener"
                  href={`${URL}/controle-sses/${dig(data, 'id')}/image-bruto`}
                >
                  <IconButton
                    tooltip="Remover"
                    Icon={RemoveRedEyeIcon}
                    iconColor="green"
                  />
                </Link>
              </GridItem>
            </>
          )}

          {isPresent(data.efluente_tratado) && (
            <>
              <GridItem xs={12} sm={2} md={2} lg={2} xl={2}>
                <div className={classes.thumb}>
                  <div className={classes.thumbInner}>
                    <img
                      src={`${URL}/controle-sses/${dig(
                        data,
                        'id'
                      )}/image-tratado`}
                      className={classes.img}
                    />
                  </div>
                </div>
              </GridItem>
              <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
                {dig(data, 'efluente_bruto')}
                <Link
                  target="_blank"
                  rel="noopener"
                  href={`${URL}/controle-sses/${dig(data, 'id')}/image-tratado`}
                >
                  <IconButton
                    tooltip="Remover"
                    Icon={RemoveRedEyeIcon}
                    iconColor="green"
                  />
                </Link>
              </GridItem>
            </>
          )}
        </GridContainer>
      </CardContainer>
    </>
  );
};

export default Show;
