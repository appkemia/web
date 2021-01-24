import React from 'react';
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
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
      <KeyboardTimePicker
        {...other}
        margin="normal"
        label={label}
        fullWidth
        ampm={false}
        required={required}
        value={value}
        onChange={onChange}
        InputLabelProps={{
          classes: {
            asterisk: classes.asterisk,
          },
        }}
        KeyboardButtonProps={{
          'aria-label': 'change time',
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default InputDate;
