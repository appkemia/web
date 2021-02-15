import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dig from 'object-dig';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import PeopleIcon from '@material-ui/icons/People';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import EditIcon from '@material-ui/icons/Edit';

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
import Can from 'contexts/Can';

const UsuarioList = () => {
  const { empresa } = useAuth();
  const classesTable = tableStyles();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [hasData, setHasData] = useState(true);

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [dependentDelete, setDependentDelete] = useState(null);
  const [showModalDelete, setShowModalDelete] = useState(false);

  async function getData() {
    setLoading(true);

    try {
      let query = {
        empresaId: dig(empresa, 'id'),
      };

      const params = toQueryString(query);
      const response = await api.get(`/users${params}`);
      setLoading(false);
      const { data } = response;

      setUsers(data);
      setHasData(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      handlingErros(error);
      setUsers([]);
    }
  }

  async function onDelete() {
    setLoadingDelete(true);

    try {
      await api.delete(`/partner/users/${dependentDelete.id}`, {});

      const newUsers = users.filter((p) => p.id !== dependentDelete.id);
      setDependentDelete(null);
      setUsers(newUsers);
      setLoadingDelete(false);
      setShowModalDelete(false);
      toast.success('Sucesso');
    } catch (error) {
      setLoadingDelete(false);
      handlingErros(error, 'collaborator');
    }
  }

  useEffect(() => {
    if (empresa) {
      getData();
    }
  }, [empresa]);

  return (
    <CardContainer
      Icon={PeopleIcon}
      iconColor="blue"
      title={'Usuarios'}
      loading={loading}
    >
      <GridAction>
        <Can I="new" a="Usuarios">
          <Button onClick={() => navigate('/usuarios/new')} color="blue">
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
            <TableCell className={classesTable.cell}>Nome</TableCell>
            <TableCell className={classesTable.cell}>Tipo</TableCell>
            <TableCell className={classesTable.cell}>Nome de usuário</TableCell>
          </>
        }
      >
        {users.map((row) => {
          return (
            <TableRow key={row.id} hover className={classesTable.row}>
              <TableCell>
                <Can I="show" a="Usuarios">
                  <IconButton
                    tooltip={'Exibir'}
                    onClick={() => navigate(`/usuarios/show/${row.id}`)}
                    Icon={RemoveRedEyeIcon}
                    iconColor="green"
                  />
                </Can>
                <Can I="edit" a="Usuarios">
                  <IconButton
                    tooltip={'Editar'}
                    onClick={() => navigate(`/usuarios/edit/${row.id}`)}
                    Icon={EditIcon}
                    iconColor="orange"
                  />
                </Can>
                <Can I="delete" a="Usuarios">
                  <IconButton
                    tooltip={'Excluir'}
                    onClick={() => {
                      setDependentDelete(row);
                      setShowModalDelete(true);
                    }}
                    Icon={DeleteIcon}
                    iconColor="red"
                  />
                </Can>
              </TableCell>
              <TableCell>{row.nome}</TableCell>
              <TableCell>{row.tipo}</TableCell>
              <TableCell>{row.username}</TableCell>
            </TableRow>
          );
        })}
      </Table>

      <ModalDelete
        open={showModalDelete}
        loading={loadingDelete}
        message={'Deseja excluir'}
        buttonText={'Excluir'}
        onDelete={onDelete}
        onClose={() => {
          setShowModalDelete(false);
          setDependentDelete(null);
        }}
      />
    </CardContainer>
  );
};

export default UsuarioList;
