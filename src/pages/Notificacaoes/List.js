import React, { useEffect, useState } from 'react';
import dig from 'object-dig';
import startOfMonth  from 'date-fns/startOfMonth'
import endOfMonth  from 'date-fns/endOfMonth'

import NotificationsIcon from '@material-ui/icons/Notifications';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import CardContainer from 'components/Card/CardContainer';
import Table from 'components/Table/Table';
import tableStyles from 'components/Table/Table/styles';
import InputDate from 'components/Input/InputDate';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

import toQueryString from 'utils/toQueryString';
import handlingErros from 'utils/handlingErros';
import formatDate from 'utils/formatDate';

import api from 'services/api';
import { useAuth } from 'contexts/auth';

const List = () => {
  const { local } = useAuth();
  const classesTable = tableStyles();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(startOfMonth(Date.now()));
  const [endDate, setEndDate] = useState(endOfMonth(Date.now()));

  useEffect(() => {
    async function getData() {
      setLoading(true);

      try {
        let query = {
          localId: dig(local, 'id'),
          startDate: formatDate(startDate, 'yyyy-MM-dd'),
          endDate: formatDate(endDate, 'yyyy-MM-dd')
        };

        const params = toQueryString(query);
        const response = await api.get(`/notificacaos${params}`);
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
  }, [local, startDate, endDate]);

  return (
    <CardContainer
      Icon={NotificationsIcon}
      iconColor="blue"
      title="Notificações"
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
            <TableCell className={classesTable.cell}>Código</TableCell>
            <TableCell className={classesTable.cell}>Data</TableCell>
            <TableCell className={classesTable.cell}>Usuário</TableCell>
            <TableCell className={classesTable.cell}>Mensagem</TableCell>
          </>
        }
      >
        {data.map((row) => {
          return (
            <TableRow key={row.id} hover className={classesTable.row}>

              <TableCell>{row.id}</TableCell>
              <TableCell>{formatDate(row.data, 'dd/MM/yyyy')}</TableCell>
              <TableCell>{dig(row, 'user', 'nome')}</TableCell>
              <TableCell>{row.mensagem}</TableCell>
            </TableRow>
          );
        })}
      </Table>
    </CardContainer>
  );
};

export default List;
