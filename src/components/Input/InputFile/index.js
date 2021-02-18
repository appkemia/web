import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import ClearIcon from '@material-ui/icons/Clear';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import IconButton from 'components/Button/IconButton';

import useStyles from './styles';

function InputDropzoneFile(props) {
  const { onChange, disabled, accept, maxFiles } = props;
  const classes = useStyles();

  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => console.log('file reading has failed');

    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: accept,
    maxFiles: maxFiles
  });

  return (
    <section className="container">
      <div
        disabled={disabled}
        hidden={disabled}
        style={{
          borderRadius: 5,
          backgroundColor: '#efefef',
          padding: 10,
          borderWidth: 1,
          borderColor: '#e3e3e3',
        }}
        {...getRootProps()}
      >
        <input disabled={disabled} hidden={disabled} {...getInputProps()} />
        <p style={{ textAlign: 'center' }}>Insira as imagens</p>
      </div>
      {files &&
        files.map((file) => (
          <GridContainer key={file.name} direction="row" alignItems="center">
            <GridItem xs={12} sm={2} md={2} lg={2} xl={2}>
              <div className={classes.thumb}>
                <div className={classes.thumbInner}>
                  <img src={file.preview} className={classes.img} />
                </div>
              </div>
            </GridItem>
            <GridItem xs={12} sm={6} md={6} lg={6} xl={6}>
              {file.path}
              <IconButton
                tooltip="Remover"
                onClick={() => {
                  const newFiles = files.filter((item) => item !== file);
                  setFiles(newFiles);
                  onChange(newFiles);
                }}
                Icon={ClearIcon}
                iconColor="red"
              />
            </GridItem>
          </GridContainer>
        ))}
    </section>
  );
}

export default InputDropzoneFile;
