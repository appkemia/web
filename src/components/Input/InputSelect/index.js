import React from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import useStyles from './styles';

const InputSelect = ({ options, placeholder, value, name, onChange, label, required, multiple, error, helperText, disabled }) => {
  const classes = useStyles();

  return (
    <Autocomplete
      options={options}
      multiple={multiple}
      getOptionLabel={(option) => option[name]}
      openOnFocus
      disabled={disabled}
      value={value}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      classes={{
        option: classes.option,
      }}
      noOptionsText={'Não há opções'}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder == null ? 'Selecione' : placeholder}
          label={label}
          required={required}

          error={error}
          helperText={helperText}
          InputLabelProps={{
            classes: {
              asterisk: classes.asterisk,
            },
            // shrink: true,
          }}
          variant="outlined"
        />
      )}
    />
  );
};

export default InputSelect;
