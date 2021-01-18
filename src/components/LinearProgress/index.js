import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';

const Progress = ({ loading }) => {
  return (
    <Fade in={loading}>
      <LinearProgress style={{ height: 4, width: '100%', margin: '10px 0 10px 0' }} color="secondary" />
    </Fade>
  );
};

export default Progress;
