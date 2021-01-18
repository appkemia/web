import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';

import useStyles from './styles';

const InputGroup = ({ children, label, required, placeholder, onChange }) => {
  const classes = useStyles();

  return (
    <FormControl component="fieldset">
      <FormLabel
        classes={{
          asterisk: classes.asterisk,
        }}
        required={required}
      >
        {label}
      </FormLabel>
      <FormGroup>{children}</FormGroup>
    </FormControl>
  );
};

export default InputGroup;
