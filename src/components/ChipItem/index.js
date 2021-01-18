import React from 'react';
import Chip from '@material-ui/core/Chip';

import useStyles from './styles';

const ChipItem = ({ label, color, colorHex }) => {
  const classes = useStyles();
  return (
    <Chip
      className={classes[color]}
      style={{
        backgroundColor: colorHex,
        color: '#ffffff',
        margin: 2,
      }}
      label={label}
    />
  );
};

export default ChipItem;
