import React from 'react';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import HelperText from 'components/HelperText';

import useStyles from './styles';

const InputSwitch = ({
  value,
  label,
  disabled,
  onChange,
  error,
  helperText,
}) => {
  const classes = useStyles();

  const handleChange = (event) => {
    const { checked } = event.target;
    onChange(checked);
  };

  return (
    <>
      <FormControlLabel
        control={<Switch checked={value} onChange={handleChange} />}
        disabled={disabled}
        className={classes.text}
        label={label}
      />
      <HelperText error={error} text={helperText} />
    </>
  );
};

export default InputSwitch;
