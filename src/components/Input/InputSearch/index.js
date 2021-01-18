import React from 'react';

import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import InputAdornment from '@material-ui/core/InputAdornment';

import InputText from 'components/Input/InputText';
import IconButton from 'components/Button/IconButton';

const InputSearch = ({ value, onChange, label, placeholder, style }) => {

  return (
    <InputText
      style={style}
      value={value}
      label={label}
      placeholder={placeholder}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {value && (
              <IconButton
                tooltip={'Apagar'}
                Icon={CloseIcon}
                onClick={() => onChange('')}
                iconColor="red"
              />
            )}
            <IconButton
              tooltip={'Buscar'}
              Icon={SearchIcon}
              iconColor="secondary"
            />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputSearch;
