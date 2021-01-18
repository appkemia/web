import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import EditIcon from '@material-ui/icons/Edit';
import BusinessIcon from '@material-ui/icons/Business';

import CardContainer from 'components/Card/CardContainer';
import Button from 'components/Button/Button';
import ModalDelete from 'components/Modal/ModalDelete';
import GridAction from 'components/Grid/GridAction';
import Table from 'components/Table/Table';
import tableStyles from 'components/Table/Table/styles';
import IconButton from 'components/Button/IconButton';
import handlingErros from 'utils/handlingErros';

import api from 'services/api';

const EmpresaList = () => {
  const classesTable = tableStyles();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [hasData, setHasData] = useState(true);

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [empresaDelete, setEmpresaDelete] = useState(null);
  const [showModalDelete, setShowModalDelete] = useState(false);

  async function getData() {
    setLoading(true);

    try {
      const response = await api.get('/empresas');
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

  async function onDelete() {
    setLoadingDelete(true);

    try {
      await api.delete(`/empresas/${empresaDelete.id}`, {});

      const newData = data.filter((p) => p.id !== empresaDelete.id);
      setEmpresaDelete(null);
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
      getData();
  }, []);

  return (
    <CardContainer
      Icon={BusinessIcon}
      iconColor="blue"
      title='Empresas'
      loading={loading}
    >
      <GridAction>
        <Button onClick={() => navigate('/empresas/new')} color="blue">
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
                  tooltip={'Exibir'}
                  onClick={() => navigate(`/empresas/show/${row.id}`)}
                  Icon={RemoveRedEyeIcon}
                  iconColor="green"
                />
                <IconButton
                  tooltip={'Editar'}
                  onClick={() => navigate(`/empresas/edit/${row.id}`)}
                  Icon={EditIcon}
                  iconColor="orange"
                />
                <IconButton
                  tooltip='Excluir'
                  onClick={() => {
                    setEmpresaDelete(row);
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
        message='Deseja excluir?'
        buttonText='Excluir'
        onDelete={onDelete}
        onClose={() => {
          setShowModalDelete(false);
          setEmpresaDelete(null);
        }}
      />
    </CardContainer>
  );
};

export default EmpresaList;
