import React, { memo } from 'react';
import PropTypes from 'prop-types';

// material-ui components
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

import useStyles from './styles';

const colors = {
  primary: 'Primary',
  secondary: 'Secondary',
  success: 'Success',
  second: 'Second',
  warning: 'Warning',
  error: 'Error',
  blue: 'Blue',
  purple: 'Second',
  green: 'Success',
  orange: 'Warning',
  red: 'Error',
  black: 'Black',
  grey: 'Grey',
};

function CustomButton(props) {
  const classesDefault = useStyles();

  const { children, color, classes, disabled, loading, ...ownProps } = props;

  return (
    <Button
      color="default"
      disabled={disabled}
      {...ownProps}
      className={classesDefault.button}
      classes={{
        text: classesDefault[`text${colors[color]}`],
        outlined: classesDefault[`outlined${colors[color]}`],
        contained: classesDefault[`contained${colors[color]}`],
        ...classes,
      }}
    >
      <Fade in={loading}>
        <CircularProgress size={24} className={classesDefault.buttonProgress} />
      </Fade>
      {children}
    </Button>
  );
}

CustomButton.defaultProps = {
  ...Button.defaultProps,
  color: 'primary',
  variant: 'contained',
};

CustomButton.propTypes = {
  ...Button.propTypes,
  color: PropTypes.oneOf([
    'primary',
    'second',
    'success',
    'warning',
    'error',
    'blue',
    'purple',
    'green',
    'orange',
    'red',
    'secondary',
    'black',
    'grey',
  ]),
};

export default memo(CustomButton);

// import React, { memo } from 'react';
// import PropTypes from 'prop-types';

// // material-ui components
// import Button from '@material-ui/core/Button';
// import CircularProgress from '@material-ui/core/CircularProgress';

// import useStyles from './styles';

// const colors = {
//   primary: 'Primary',
//   secondary: 'Secondary',
//   success: 'Success',
//   second: 'Second',
//   warning: 'Warning',
//   error: 'Error',
//   blue: 'Primary',
//   purple: 'Second',
//   green: 'Success',
//   orange: 'Warning',
//   red: 'Error',
//   black: 'Black',
//   grey: 'Grey',
// };

// function CustomButton(props) {
//   const classesDefault = useStyles();

//   const { color, classes, disabled, loading, ...ownProps } = props;

//   return (
//     <div className={classesDefault.root}>
//       <div className={classesDefault.wrapper}>
//         <Button
//           color="default"
//           disabled={disabled}
//           {...ownProps}
//           classes={{
//             text: classesDefault[`text${colors[color]}`],
//             outlined: classesDefault[`outlined${colors[color]}`],
//             contained: classesDefault[`contained${colors[color]}`],
//             ...classes,
//           }}
//         />
//         {loading && (
//           <CircularProgress
//             size={24}
//             className={classesDefault.buttonProgress}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// CustomButton.defaultProps = {
//   ...Button.defaultProps,
//   color: 'primary',
//   variant: 'contained',
// };

// CustomButton.propTypes = {
//   ...Button.propTypes,
//   color: PropTypes.oneOf([
//     'primary',
//     'second',
//     'success',
//     'warning',
//     'error',
//     'blue',
//     'purple',
//     'green',
//     'orange',
//     'red',
//     'secondary',
//     'black',
//     'grey',
//   ]),
// };

// export default memo(CustomButton);
