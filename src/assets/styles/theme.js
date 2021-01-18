const common = {
  black: '#424242',
  white: '#ffffff',
};

const blue = {
  light: '#00CCFF',
  main: '#2F84FF',
  dark: '#003CFF',
  contrastText: '#f8f8f8',
};

const purple = {
  light: '#644FF6',
  main: '#AC92EA',
  dark: '#9E4FF6',
  contrastText: '#f8f8f8',
};

const white = {
  // light: '#00CCFF',
  main: '#ffffff',
  // dark: '#003CFF',
  // contrastText: '#f8f8f8',
};

// const bluePurple = {
// light: '#DEEBFF',
//   main: '#394AAB',
//   light: '#396AB7',
//   dark: '#1F35BD', // #253054
//   //'#1F35BD' // '#303F9F' // #396AB7
//   // #3D4977
// };

const black = {
  light: '#1B2430',
  main: '#000000',
  dark: '#121820',
  contrastText: '#ffffff',
};

const green = {
  light: '#00E36B',
  main: '#40D5A0',
  dark: '#00E3BC',
  contrastText: '#f8f8f8',
};

const orange = {
  light: '#FDA947',
  main: '#FB9D06',
  dark: '#FDC347',
  contrastText: '#f8f8f8',
};

const red = {
  light: '#F82A79',
  main: '#EF717A',
  dark: '#F8392A',
  contrastText: '#f8f8f8',
};

const grey = {
  main: '#757575',
  contrastText: '#f8f8f8',
};

const primary = {
  light: '#00CCFF',
  main: '#2F84FF',
  dark: '#003CFF',
  contrastText: '#f8f8f8',
};

const textDark = {
  light: '#f8f8f8',
  main: '#ffffff',
  dark: '#f8f8f8',
  contrastText: '#f8f8f8',
};

const textLight = {
  light: '#303030',
  main: '#424242',
  dark: '#424242',
  contrastText: '#f8f8f8',
};

const menuLight = {
  light: '#00CCFF',
  main: '#2F84FF',
  dark: '#003CFF',
  contrastText: '#f8f8f8',
};

const menuDark = {
  light: '#303030',
  main: '#424242',
  dark: '#424242',
  contrastText: '#f8f8f8',
};

const backgroundLight = {
  main: '#ffffff',
};
const backgroundDark = {
  main: '#424242',
};

const overrides = {
  MuiTooltip: {
    tooltip: {
      padding: 10,
      fontSize: '0.8rem',
    },
  },
  MuiLinearProgress: {
    colorPrimary: {
      backgroundColor: '#ffffff',
    },
    root: {
      height: 3,
    },
  },
  MuiCssBaseline: {
    '@global': {
      '*::-webkit-scrollbar': {
        width: '0.6em',
        height: '0.6em',
      },
      '*::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(122, 153, 217, 0.8)',
      },
    },
  },
};

export const light = {
  palette: {
    type: 'light',
    common: common,
    primary: primary,
    secondary: purple,
    success: green,
    warning: orange,
    error: red,
    white: white,
    blue,
    purple,
    green,
    orange,
    red,
    black,
    grey,
    text: textLight,
    menu: menuLight,
    background: backgroundLight,
  },
  overrides: overrides,
};

export const dark = {
  palette: {
    type: 'dark',
    common: common,
    primary: primary,
    secondary: purple,
    success: green,
    warning: orange,
    error: red,
    white: white,
    blue,
    purple,
    green,
    orange,
    red,
    black,
    grey,
    text: textDark,
    menu: menuDark,
    background: backgroundDark,
  },
  overrides: overrides,
};
