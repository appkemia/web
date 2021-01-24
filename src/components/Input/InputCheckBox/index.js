import React from 'react';

import HelperText from 'components/HelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import useStyles from './styles';

const InputCheckBox = ({
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
        control={<Checkbox  checked={value} onChange={handleChange} />}
        disabled={disabled}
        className={classes.text}
        label={label}
      />
      <HelperText error={error} text={helperText} />
    </>
  );
};

export default InputCheckBox;
