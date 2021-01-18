import React from 'react';

import useStyles from './styles';

const Button = ({ Icon, color }) => {
  const classes = useStyles();

  return <Icon className={classes[color]} />;
};

export default Button;
