import React from 'react';

import TextField from '@material-ui/core/TextField';

import useStyles from './styles';

const InputText = ({
  value,
  label,
  error,
  helperText,
  required,
  placeholder,
  onChange,
  endAdornment,
  ...other
}) => {
  const classes = useStyles();

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      variant="outlined"
      {...other}
      placeholder={placeholder}
      label={label}
      value={value === null ? '' : value}
      onChange={handleChange}
      required={required}
      fullWidth
      error={error}
      helperText={helperText}
      InputLabelProps={{
        classes: {
          asterisk: classes.asterisk,
        },
        // shrink: true,
      }}
      // onChange={isPresent(onChange) ? handleChange : undefined}
    />
  );
};

export default InputText;
