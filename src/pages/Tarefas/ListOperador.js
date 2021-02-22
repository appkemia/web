import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import EventIcon from '@material-ui/icons/Event';
import LaunchIcon from '@material-ui/icons/Launch';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import CardContainer from 'components/Card/CardContainer';
import Table from 'components/Table/Table';
import tableStyles from 'components/Table/Table/styles';
import IconButton from 'components/Button/IconButton';
import InputDate from 'components/Input/InputDate';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

import toQueryString from 'utils/toQueryString';
import handlingErros from 'utils/handlingErros';
import formatDate from 'utils/formatDate';

import api from 'services/api';
import { useAuth } from 'contexts/auth';
import Can from 'contexts/Can';

const List = () => {
  const { local, user } = useAuth();
  const classesTable = tableStyles();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(Date.now());

  const atividades = [
    {
      id: 'CONTROLE-COLETA',
      route: 'controle-coletas',
      nome: 'Controle de Coleta',
    },
    {
      id: 'CONTROLE-OD',
      route: 'controle-ods',
      nome: 'Controle de OD',
    },
    {
      id: 'CONTROLE-SS',
      route: 'controle-sses',
      nome: 'Controle de SS',
    },
    {
      id: 'CONTROLE-PH',
      route: 'controle-phs',
      nome: 'Controle de pH',
    },
    {
      id: 'CONTROLE-VAZAO',
      route: 'controle-vazaos',
      nome: 'Controle de Vazão',
    },
    {
      id: 'CONTROLE-TANQUE',
      route: 'controle-tanques',
      nome: 'Controle de Tanque',
    },
    {
      id: 'CONTROLE-BOMBA',
      route: 'controle-bombas',
      nome: 'Controle de Rotação da Bomba',
    },
    {
      id: 'CONTROLE-CONCENTRACAO-CLORO',
      route: 'controle-concentracao-cloros',
      nome: 'Controle de Concentração de Cloro',
    },
    {
      id: 'CONTROLE-PASTILHA-CLORO',
      route: 'controle-pastilha-cloros',
      nome: 'Controle de Pastilha de Cloro',
    },
    {
      id: 'POLIMENTO-ETA',
      route: 'polimento-etas',
      nome: 'Polimento com ETA',
    },
    {
      id: 'TRATAMENTO-EFLUENTE-LAGOA',
      route: 'tratamento-efluente-lagoas',
      nome: 'Tratamento de Efluente com Lagoa',
    },
  ];

  async function navigateTarefa(row) {
    console.log(row);
    const route = atividades.find((x) => x.id === row.atividade).route;
    navigate(`/${route}`);
  }

  useEffect(() => {
    async function getData() {
      setLoading(true);

      try {
        let query = {
          localId: local.id,
          userId: user.id,
          startDate: formatDate(startDate, 'yyyy-MM-dd'),
          endDate: formatDate(endDate, 'yyyy-MM-dd'),
        };

        const params = toQueryString(query);
        const response = await api.get(`/tarefas/operador${params}`);
        setLoading(false);
        const { data } = response;
        setData(data);
      } catch (error) {
        console.log(error);
        setLoading(false);
        handlingErros(error);
        setData([]);
      }
    }

    if (local) {
      getData();
    }
  }, [local, user, startDate, endDate]);

  return (
    <CardContainer
      Icon={EventIcon}
      iconColor="blue"
      title="Tarefas"
      loading={loading}
    >
      <GridContainer>
        <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
          <InputDate
            label="Data de início"
            value={startDate}
            onChange={setStartDate}
            required
          />
        </GridItem>
        <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
          <InputDate
            label="Data de fim"
            value={endDate}
            onChange={setEndDate}
            required
          />
        </GridItem>
      </GridContainer>

      <Table
        emptyData={data.length === 0}
        loading={loading}
        columns={
          <>
            <TableCell className={classesTable.cell}>Ações</TableCell>
            <TableCell className={classesTable.cell}>Código</TableCell>
            <TableCell className={classesTable.cell}>Data</TableCell>
            <TableCell className={classesTable.cell}>Atividade</TableCell>
          </>
        }
      >
        {data.map((row) => {
          return (
            <TableRow key={row.id} hover className={classesTable.row}>
              <TableCell>
                <IconButton
                  tooltip="Ir para a tarefa"
                  onClick={() => navigateTarefa(row)}
                  Icon={LaunchIcon}
                  iconColor="blue"
                />
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{formatDate(row.data, 'dd/MM/yyyy')}</TableCell>
              <TableCell>
                {atividades.find((x) => x.id === row.atividade).nome}
              </TableCell>
            </TableRow>
          );
        })}
      </Table>
    </CardContainer>
  );
};

export default List;
