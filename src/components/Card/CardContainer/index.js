import React from 'react';
import clsx from 'clsx';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

import Typography from 'components/Typography';
import useStyles from './styles';

const Container = ({ Icon, iconColor, loading, title, actions, children }) => {
  const classes = useStyles();
  return (
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
            <CircularProgress />
          ) : (
            <Icon className={classes.icon} />
          )
        }
      />
      <CardContent>
        <div>
          <Typography variant="h5" color='text' className={classes.title}>
            {title}
          </Typography>

          <div
            className={classes.flex}
          >
            {actions}
          </div>
        </div>

        {loading && <LinearProgress style={{ height: 4 }} color="secondary" />}
        {children}
        {loading && <LinearProgress style={{ height: 4 }} color="secondary" />}
      </CardContent>

    </Card>
  );
};

export default Container;
