import React from 'react';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

import useStyles from './styles';

const TypographyText = ({
  children,
  variant,
  className,
  color,
  ...ownProps
}) => {
  const classes = useStyles();
  return (
    <Typography
      {...ownProps}
      variant={variant}
      className={clsx(classes[color], className)}
    >
      {children}
    </Typography>
  );
};

export default TypographyText;
