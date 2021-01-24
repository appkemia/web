import React from 'react';
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import useStyles from './styles';

const InputDate = ({
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

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        {...other}
        margin="normal"
        label={label}
        fullWidth
        required={required}
        format="dd/MM/yyyy"
        value={value}
        onChange={onChange}
        InputLabelProps={{
          classes: {
            asterisk: classes.asterisk,
          },
        }}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default InputDate;
