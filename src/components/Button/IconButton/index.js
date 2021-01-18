import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import useStyles from './styles';

const Button = ({ onClick, Icon, iconColor, tooltip, height, width, size, ...ownProps }) => {
  const classes = useStyles();

  return (
    <Tooltip title={tooltip}>
      <IconButton size={size} {...ownProps} onClick={onClick}>
        <Icon style={{ height, width }} className={classes[iconColor]} />
      </IconButton>
    </Tooltip>
  );
};

export default Button;
