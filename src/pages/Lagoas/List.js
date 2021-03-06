import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dig from 'object-dig';

import PoolIcon from '@material-ui/icons/Pool';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import CardContainer from 'components/Card/CardContainer';
import Button from 'components/Button/Button';
import ModalDelete from 'components/Modal/ModalDelete';
import GridAction from 'components/Grid/GridAction';
import Table from 'components/Table/Table';
import tableStyles from 'components/Table/Table/styles';
import IconButton from 'components/Button/IconButton';
import Icon from 'components/Icon';

import toQueryString from 'utils/toQueryString';
import handlingErros from 'utils/handlingErros';

import api from 'services/api';
import { useAuth } from 'contexts/auth';
import Can from 'contexts/Can';

const List = () => {
  const { local } = useAuth();
  const classesTable = tableStyles();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [hasData, setHasData] = useState(true);

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [showModalDelete, setShowModalDelete] = useState(false);

  async function onDelete() {
    setLoadingDelete(true);

    try {
      await api.delete(`/lagoas/${deleteData.id}`, {});

      const newData = data.filter((p) => p.id !== deleteData.id);
      setDeleteData(null);
      setData(newData);
      setLoadingDelete(false);
      setShowModalDelete(false);
      toast.success('Excluído com sucesso!');
    } catch (error) {
      setLoadingDelete(false);
      handlingErros(error);
    }
  }

  useEffect(() => {
    async function getData() {
      setLoading(true);

      try {
        let query = {
          localId: dig(local, 'id'),
        };

        const params = toQueryString(query);
        const response = await api.get(`/lagoas${params}`);
        setLoading(false);
        const { data } = response;
        setData(data);
        setHasData(false);
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
  }, [local]);

  return (
    <CardContainer
      Icon={PoolIcon}
      iconColor="blue"
      title="Lagoas"
      loading={loading}
    >
      <GridAction>
        <Can I="new" a="Lagoas">
          <Button onClick={() => navigate('/lagoas/new')} color="blue">
            Novo
          </Button>
        </Can>
      </GridAction>

      <Table
        emptyData={hasData}
        loading={loading}
        columns={
          <>
            <TableCell className={classesTable.cell}>Ações</TableCell>
            <TableCell className={classesTable.cell}>Código</TableCell>
            <TableCell className={classesTable.cell}>Nome</TableCell>
            <TableCell className={classesTable.cell}>Descrição</TableCell>
            <TableCell className={classesTable.cell}>pH</TableCell>
            <TableCell className={classesTable.cell}>OD</TableCell>
            <TableCell className={classesTable.cell}>SS</TableCell>
            <TableCell className={classesTable.cell}>Aeração</TableCell>
            <TableCell className={classesTable.cell}>Observações</TableCell>
          </>
        }
      >
        {data.map((row) => {
          return (
            <TableRow key={row.id} hover className={classesTable.row}>
              <TableCell>
                <Can I="show" a="Lagoas">
                  <IconButton
                    tooltip="Exibir"
                    onClick={() => navigate(`/lagoas/show/${row.id}`)}
                    Icon={RemoveRedEyeIcon}
                    iconColor="green"
                  />
                </Can>
                <Can I="edit" a="Lagoas">
                  <IconButton
                    tooltip="Editar"
                    onClick={() => navigate(`/lagoas/edit/${row.id}`)}
                    Icon={EditIcon}
                    iconColor="orange"
                  />
                </Can>
                <Can I="delete" a="Lagoas">
                  <IconButton
                    tooltip="Excluir"
                    onClick={() => {
                      setDeleteData(row);
                      setShowModalDelete(true);
                    }}
                    Icon={DeleteIcon}
                    iconColor="red"
                  />
                </Can>
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.nome}</TableCell>
              <TableCell>{row.descricao}</TableCell>
              <TableCell>
                {row.is_ph ? (
                  <Icon Icon={CheckIcon} color="success" />
                ) : (
                  <Icon Icon={CloseIcon} color="red" />
                )}
              </TableCell>
              <TableCell>
                {row.is_od ? (
                  <Icon Icon={CheckIcon} color="success" />
                ) : (
                  <Icon Icon={CloseIcon} color="red" />
                )}
              </TableCell>
              <TableCell>
                {row.is_ss ? (
                  <Icon Icon={CheckIcon} color="success" />
                ) : (
                  <Icon Icon={CloseIcon} color="red" />
                )}
              </TableCell>
              <TableCell>
                {row.is_aeracao ? (
                  <Icon Icon={CheckIcon} color="success" />
                ) : (
                  <Icon Icon={CloseIcon} color="red" />
                )}
              </TableCell>
              <TableCell>
                {row.is_observacao ? (
                  <Icon Icon={CheckIcon} color="success" />
                ) : (
                  <Icon Icon={CloseIcon} color="red" />
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </Table>

      <ModalDelete
        open={showModalDelete}
        loading={loadingDelete}
        message="Realmente deseja excluir este dado?"
        buttonText="Excluir"
        onDelete={onDelete}
        onClose={() => {
          setShowModalDelete(false);
          setDeleteData(null);
        }}
      />
    </CardContainer>
  );
};

export default List;
