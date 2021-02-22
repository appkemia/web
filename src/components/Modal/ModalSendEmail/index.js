import React, { useState } from 'react';
import clsx from 'clsx';
import { toast } from 'react-toastify';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Modal from '@material-ui/core/Modal';
import EmailIcon from '@material-ui/icons/Email';

import Button from 'components/Button/Button';
import InputText from 'components/Input/InputText';

import isPresent from 'utils/isPresent';
import handlingErros from 'utils/handlingErros';
import toQueryString from 'utils/toQueryString';
import api from 'services/api';
import formatDate from 'utils/formatDate';

import useStyles from './styles';

const ModalDelete = ({ open, onClose, route, local, startDate, endDate }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('appkemia@gmail.com');

  const tipo = 'pdf';

  const [error, setError] = useState({});

  function validateEmail() {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  async function sendEmail() {
    const valid = validateEmail();

    if (valid === false) {
      setError({
        email: 'Digite um e-mail válido',
      });
      return;
    }

    try {
      setLoading(true);
      let query = {
        localId: local.id,
        startDate: formatDate(startDate, 'yyyy-MM-dd'),
        endDate: formatDate(endDate, 'yyyy-MM-dd'),
        email: email,
        tipo: tipo,
      };
      const params = toQueryString(query);
      await api.get(`/${route}/sendEmail${params}`);
      setError({});
      setLoading(false);
      toast.success('Email enviado com sucesso!');
      onClose();
    } catch (error) {
      setLoading(false);
      const validation = handlingErros(error);
      setError(validation);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      className={classes.modal}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <Card
        classes={{
          root: classes.root,
        }}
      >
        <CardHeader
          classes={{
            root: clsx(classes.rootHeader, classes.purple),
            avatar: classes.avatar,
          }}
          avatar={
            loading ? (
              <CircularProgress
                className={clsx(classes.loading, classes.loading)}
              />
            ) : (
              <EmailIcon className={clsx(classes.icon, classes.iconHeader)} />
            )
          }
        />
        <CardContent>
          <Typography variant="h5" className={classes.title}>
            Enviar Email
          </Typography>

          {loading && (
            <LinearProgress style={{ height: 4 }} color="secondary" />
          )}

          <div style={{ textAlign: 'center' }}>
            <InputText
              value={email}
              label="Email"
              error={isPresent(error.email)}
              helperText={error.email}
              required
              onChange={(text) => setEmail(text)}
            />
          </div>

          <div className={classes.spaceBetween}>
            <Button onClick={onClose} disabled={loading} color="grey">
              Cancelar
            </Button>
            <Button
              onClick={sendEmail}
              disabled={loading}
              color="success"
            >
              Enviar
            </Button>
          </div>
          {loading && (
            <LinearProgress style={{ height: 4 }} color="secondary" />
          )}
        </CardContent>
      </Card>
    </Modal>
  );
};

export default ModalDelete;
