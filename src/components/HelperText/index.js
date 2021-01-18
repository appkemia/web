import React from 'react';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
// import FormHelperText from '@material-ui/core/FormHelperText';

import useStyles from './styles';

const HelperText = ({ error, text, color='error' }) => {
  const classes = useStyles();
  return (
    <Fade in={error}>
      <Typography variant="body2" className={classes[color]}>
        {text}
      </Typography>
    </Fade>
  );
};

export default HelperText;
