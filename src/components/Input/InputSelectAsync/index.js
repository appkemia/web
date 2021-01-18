import React from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from './styles';

const InputSelect = ({ options, placeholder, loading, value, optionValue, onInputChange, name, onChange, label, required }) => {
  const classes = useStyles();

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option[name]}
      getOptionSelected={(option) => option[optionValue]}
      openOnFocus
      value={value}
      loading={loading}
      loadingText={'Carregando'}
      onInputChange={onInputChange}
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
          variant="outlined"
          placeholder={placeholder == null ? 'Selecione' : placeholder}
          label={label}
          required={required}
          InputLabelProps={{
            classes: {
              asterisk: classes.asterisk,
            },
            // shrink: true,
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="secondary" /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default InputSelect;
