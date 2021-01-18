import React from 'react';
import clsx from 'clsx';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Modal from '@material-ui/core/Modal';

import Button from 'components/Button/Button';

import useStyles from './styles';

const ModalDelete = ({ open, onClose, loading, text, Icon, iconColor, onAction, buttonColor, buttonText }) => {

  const classes = useStyles();
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
            root: clsx(classes.rootHeader, classes[iconColor]),
            avatar: classes.avatar,
          }}
          avatar={
            loading ? (
              <CircularProgress
                className={clsx(classes.loading, classes.loading)}
              />
            ) : (
              <Icon className={clsx(classes.icon, classes.iconHeader)} />
            )
          }
        />
        <CardContent>
          <Typography variant="h5" className={classes.title}>
            Atenção
          </Typography>

          {loading && (
            <LinearProgress style={{ height: 4 }} color="secondary" />
          )}

          <div style={{ textAlign: 'center' }}>
            <Typography>{text}</Typography>
          </div>

          <div className={classes.spaceBetween}>
            <Button onClick={onClose} disabled={loading} color="grey">
              Cancelar
            </Button>
            <Button
              onClick={onAction}
              disabled={loading}
              // loading={loading}
              color={buttonColor}
            >
              {buttonText}
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
