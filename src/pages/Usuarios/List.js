import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dig from 'object-dig';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import FilterListIcon from '@material-ui/icons/FilterList';
import DeleteIcon from '@material-ui/icons/Delete';
import PeopleIcon from '@material-ui/icons/People';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import EditIcon from '@material-ui/icons/Edit';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import CardContainer from 'components/Card/CardContainer';
import Button from 'components/Button/Button';
import ModalDelete from 'components/Modal/ModalDelete';
import GridAction from 'components/Grid/GridAction';
import GridFilter from 'components/Grid/GridFilter';
import TablePagination from 'components/Table/TablePagination';
import Table from 'components/Table/Table';
import tableStyles from 'components/Table/Table/styles';
import IconButton from 'components/Button/IconButton';
import InputSearch from 'components/Input/InputSearch';

import toQueryString from 'utils/toQueryString';
import handlingErros from 'utils/handlingErros';

import api from 'services/api';
import { useAuth } from 'contexts/auth';

const UsuarioList = () => {
  const { empresa } = useAuth();
  const classesTable = tableStyles();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
        page: page + 1,
        per_page: rowsPerPage,
        qs: String(search).replace(/[&\\#,+()$~%.'":*?<>{}]/g, ''),
      };

      const params = toQueryString(query);
      const response = await api.get(`/users${params}`);
      setLoading(false);
      const { data } = response;

      setUsers(data);
      setHasData(false);
      // setPage(toInt(meta.page) - 1);
      // setTotalCount(toInt(meta.total));
      setTotalCount(0);
    } catch (error) {
      console.log(error);
      setLoading(false);
      handlingErros(error);
      setUsers([]);
      // setPage(0);
      // setTotalCount(0);
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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (empresa) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    empresa,
    search,
    rowsPerPage,
    page,
  ]);

  return (
    <CardContainer
      Icon={PeopleIcon}
      iconColor="blue"
      title={'Usuarios'}
      loading={loading}
    >
      <GridAction>
        <Button onClick={() => navigate('/usuarios/new')} color="blue">
          Novo
        </Button>
        <Button
          onClick={() => setExpanded(!expanded)}
          color="secondary"
          endIcon={<FilterListIcon />}
        >
          Filtros
        </Button>
      </GridAction>

      <GridFilter expanded={expanded}>
        <GridContainer
          style={{
            outline: '2px solid #d1d1d1',
            padding: 5,
            margin: 15,
            marginBottom: 30,
          }}
        ></GridContainer>
      </GridFilter>

      <GridContainer>
        <GridItem xs={12} sm={6} md={4} lg={4} xl={4}>
          <InputSearch
            style={{ marginBottom: 10 }}
            value={search}
            label={'Filtrar'}
            placeholder={'Buscar'}
            onChange={setSearch}
          />
        </GridItem>
      </GridContainer>

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
                <IconButton
                  tooltip={'Exibir'}
                  onClick={() => navigate(`/usuarios/show/${row.id}`)}
                  Icon={RemoveRedEyeIcon}
                  iconColor="green"
                />
                <IconButton
                  tooltip={'Editar'}
                  onClick={() => navigate(`/usuarios/edit/${row.id}`)}
                  Icon={EditIcon}
                  iconColor="orange"
                />
                <IconButton
                  tooltip={'Excluir'}
                  onClick={() => {
                    setDependentDelete(row);
                    setShowModalDelete(true);
                  }}
                  Icon={DeleteIcon}
                  iconColor="red"
                />
              </TableCell>
              <TableCell>{row.nome}</TableCell>
              <TableCell>{row.tipo}</TableCell>
              <TableCell>{row.username}</TableCell>
            </TableRow>
          );
        })}
      </Table>

      <TablePagination
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

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
