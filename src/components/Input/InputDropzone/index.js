import React from 'react';

import CloudUpload from '@material-ui/icons/CloudUpload';

import Typography from 'components/Typography';
import IconButton from 'components/Button/IconButton';

const InputDropzone = ({ onChange, accept, label, buttonText }) => {

  return (
    <>
      <label
        htmlFor="upload-file"
        style={{
          display: 'grid',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <input
          style={{ display: 'none' }}
          id="upload-file"
          accept={accept}
          type="file"
          onChange={onChange}
        />
        <IconButton
          Icon={CloudUpload}
          height="200"
          width="200"
          iconColor="blue"
          component="span"
          tooltip={'Importar'}
        />
        <Typography color='text' variant="body1">{label}</Typography>
      </label>
    </>
  );
};

export default InputDropzone;
