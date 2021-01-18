import React, { useState } from 'react';

import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import Close from '@material-ui/icons/Close';

import IconButton from 'components/Button/IconButton';

const AlertItem = ({ label }) => {
  const [open, setOpen] = useState(true);

  return (
    <Collapse in={open}>
      <Alert
        variant="outlined"
        style={{ marginBottom: 10 }}
        severity="error"
        action={
          <IconButton
            tooltip='Ocultar'
            size='small'
            onClick={() => {
              setOpen(false);
            }}
            Icon={Close}
            iconColor="secondary"
          />
        }
      >
        {label}
      </Alert>
    </Collapse>
  );
};

export default AlertItem;
