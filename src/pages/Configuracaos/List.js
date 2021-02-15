import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dig from 'object-dig';

import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import EditIcon from '@material-ui/icons/Edit';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import CardContainer from 'components/Card/CardContainer';
import Table from 'components/Table/Table';
import tableStyles from 'components/Table/Table/styles';
import IconButton from 'components/Button/IconButton';

import toQueryString from 'utils/toQueryString';
import handlingErros from 'utils/handlingErros';

import api from 'services/api';
import { useAuth } from 'contexts/auth';
import Can from 'contexts/Can';

const List = () => {
  const { empresa } = useAuth();
  const classesTable = tableStyles();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      setLoading(true);

      try {
        let query = {
          empresaId: dig(empresa, 'id'),
        };

        const params = toQueryString(query);
        const response = await api.get(`/configuracaos${params}`);
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

    if (empresa) {
      getData();
    }
  }, [empresa]);

  return (
    <CardContainer
      Icon={AssistantPhotoIcon}
      iconColor="blue"
      title="Configuracões"
      loading={loading}
    >
      <Table
        emptyData={data.length === 0}
        loading={loading}
        columns={
          <>
            <TableCell className={classesTable.cell}>Ações</TableCell>
            <TableCell className={classesTable.cell}>Código</TableCell>
            <TableCell className={classesTable.cell}>Tipo</TableCell>
          </>
        }
      >
        {data.map((row) => {
          return (
            <TableRow key={row.id} hover className={classesTable.row}>
              <TableCell>
                <Can I="show" a="Configuracaos">
                  <IconButton
                    tooltip="Exibir"
                    onClick={() => navigate(`/configuracaos/show/${row.id}`)}
                    Icon={RemoveRedEyeIcon}
                    iconColor="green"
                  />
                </Can>
                <Can I="edit" a="Configuracaos">
                  <IconButton
                    tooltip="Editar"
                    onClick={() => navigate(`/configuracaos/edit/${row.id}`)}
                    Icon={EditIcon}
                    iconColor="orange"
                  />
                </Can>
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.tipo}</TableCell>
            </TableRow>
          );
        })}
      </Table>
    </CardContainer>
  );
};

export default List;
