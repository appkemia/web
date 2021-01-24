import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dig from 'object-dig';

import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import CardContainer from 'components/Card/CardContainer';
import Button from 'components/Button/Button';
import ModalDelete from 'components/Modal/ModalDelete';
import GridAction from 'components/Grid/GridAction';
import Table from 'components/Table/Table';
import tableStyles from 'components/Table/Table/styles';
import IconButton from 'components/Button/IconButton';

import toQueryString from 'utils/toQueryString';
import handlingErros from 'utils/handlingErros';

import api from 'services/api';
import { useAuth } from 'contexts/auth';

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
      await api.delete(`/tanques/${deleteData.id}`, {});

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
        const response = await api.get(`/tanques${params}`);
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
      Icon={LocalDrinkIcon}
      iconColor="blue"
      title="Tanques"
      loading={loading}
    >
      <GridAction>
        <Button onClick={() => navigate('/tanques/new')} color="blue">
          Novo
        </Button>
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
          </>
        }
      >
        {data.map((row) => {
          return (
            <TableRow key={row.id} hover className={classesTable.row}>
              <TableCell>
                <IconButton
                  tooltip="Exibir"
                  onClick={() => navigate(`/tanques/show/${row.id}`)}
                  Icon={RemoveRedEyeIcon}
                  iconColor="green"
                />
                <IconButton
                  tooltip="Editar"
                  onClick={() => navigate(`/tanques/edit/${row.id}`)}
                  Icon={EditIcon}
                  iconColor="orange"
                />
                <IconButton
                  tooltip="Excluir"
                  onClick={() => {
                    setDeleteData(row);
                    setShowModalDelete(true);
                  }}
                  Icon={DeleteIcon}
                  iconColor="red"
                />
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.nome}</TableCell>
              <TableCell>{row.descricao}</TableCell>
            </TableRow>
          );
        })}
      </Table>

      <ModalDelete
        open={showModalDelete}
        loading={loadingDelete}
        message='Realmente deseja excluir este dado?'
        buttonText='Excluir'
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
