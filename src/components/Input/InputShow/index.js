import React from 'react';

import TextField from '@material-ui/core/TextField';

import useStyles from './styles';

const InputText = ({ value, label, style }) => {
  const classes = useStyles();

  return (
    <TextField
      fullWidth
      value={value == null ? '' : value}
      label={label}
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        className: classes.showInput,
        style: style,
        readOnly: true,
        disableUnderline: true,
      }}
    />
  );
};

export default InputText;
