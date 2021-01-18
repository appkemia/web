import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { AuthProvider } from 'contexts/auth';
import 'react-toastify/dist/ReactToastify.css';
import { dark, light } from 'assets/styles/theme';

import Pages from 'pages';

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  const theme = createMuiTheme(darkTheme ? dark : light);

  toast.configure();

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
          <CssBaseline />
          <Pages darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
          <ToastContainer />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
