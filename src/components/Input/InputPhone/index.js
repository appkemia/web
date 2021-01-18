import React from 'react';

import TextField from '@material-ui/core/TextField';

import maskPhone from 'utils/maskPhone';

import useStyles from './styles';

const InputPhone = ({ value, label, required, error, helperText, placeholder, onChange }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    const { value } = event.target;

    const masked = maskPhone(value)

    onChange(masked);
  };

  return (
    <TextField
      variant="outlined"
      placeholder={placeholder}
      label={label}
      value={value === null ? '' : value}
      onChange={handleChange}
      required={required}
      error={error}
      helperText={helperText}
      fullWidth
      InputLabelProps={{
        classes: {
          asterisk: classes.asterisk,
        },
        // shrink: true,
      }}
    />
  );
};

export default InputPhone;
