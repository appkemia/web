import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dig from 'object-dig';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';

import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EmailIcon from '@material-ui/icons/Email';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import CardContainer from 'components/Card/CardContainer';
import Button from 'components/Button/Button';
import ModalDelete from 'components/Modal/ModalDelete';
import ModalSendEmail from 'components/Modal/ModalSendEmail';
import GridAction from 'components/Grid/GridAction';
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
  const { local } = useAuth();
  const classesTable = tableStyles();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(startOfMonth(Date.now()));
  const [endDate, setEndDate] = useState(endOfMonth(Date.now()));

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const [showModalEmail, setShowModalEmail] = useState(false);

  async function onDelete() {
    setLoadingDelete(true);

    try {
      await api.delete(`/controle-phs/${deleteData.id}`, {});

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
          startDate: formatDate(startDate, 'yyyy-MM-dd'),
          endDate: formatDate(endDate, 'yyyy-MM-dd'),
        };

        const params = toQueryString(query);
        const response = await api.get(`/controle-phs${params}`);
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
      Icon={PlaylistAddCheckIcon}
      iconColor="blue"
      title="Controle de pH"
      loading={loading}
    >
      <GridAction>
        <Can I="new" a="ControlePhs">
          <Button onClick={() => navigate('/controle-phs/new')} color="blue">
            Novo
          </Button>
        </Can>
      </GridAction>

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
            <TableCell className={classesTable.cell}>Hora</TableCell>
            <TableCell className={classesTable.cell}>Bruto</TableCell>
            <TableCell className={classesTable.cell}>Reator 1</TableCell>
            <TableCell className={classesTable.cell}>Reator 2</TableCell>
            <TableCell className={classesTable.cell}>Reator 3</TableCell>
            <TableCell className={classesTable.cell}>Tratado</TableCell>
            <TableCell className={classesTable.cell}>Ação corretiva</TableCell>
          </>
        }
      >
        {data.map((row) => {
          return (
            <TableRow key={row.id} hover className={classesTable.row}>
              <TableCell>
                <Can I="show" a="ControlePhs">
                  <IconButton
                    tooltip="Exibir"
                    onClick={() => navigate(`/controle-phs/show/${row.id}`)}
                    Icon={RemoveRedEyeIcon}
                    iconColor="green"
                  />
                </Can>
                <Can I="edit" a="ControlePhs">
                  <IconButton
                    tooltip="Editar"
                    onClick={() => navigate(`/controle-phs/edit/${row.id}`)}
                    Icon={EditIcon}
                    iconColor="orange"
                  />
                </Can>
                <Can I="delete" a="ControlePhs">
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
              <TableCell>{row.dateFormat}</TableCell>
              <TableCell>{row.hora}</TableCell>
              <TableCell>{row.bruto}</TableCell>
              <TableCell>{row.reator_1}</TableCell>
              <TableCell>{row.reator_2}</TableCell>
              <TableCell>{row.reator_3}</TableCell>
              <TableCell>{row.tratado}</TableCell>
              <TableCell>{row.acao_corretiva}</TableCell>
            </TableRow>
          );
        })}
      </Table>

      <Can I="send_email" a="SendEmails">
        {data.length > 0 && (
          <Button onClick={() => setShowModalEmail(true)} color="secondary">
            Enviar E-mail
            <EmailIcon />
          </Button>
        )}
      </Can>

      <ModalSendEmail
        open={showModalEmail}
        route="controle-phs"
        local={local}
        startDate={startDate}
        endDate={endDate}
        onClose={() => {
          setShowModalEmail(false);
        }}
      />

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
