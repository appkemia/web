import React, { useEffect, useState } from 'react';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from 'contexts/auth';

import Container from 'components/Container';
import Menu from 'components/Menu/index';

import NotFound from 'pages/NotFound';

import Login from 'pages/Login';

import EmpresaSelect from 'pages/Empresas/Select';
import EmpresaList from 'pages/Empresas/List';
import EmpresaNew from 'pages/Empresas/New';
import EmpresaEdit from 'pages/Empresas/Edit';
import EmpresaShow from 'pages/Empresas/Show';

import LocalSelect from 'pages/Locais/Select';

import UsuarioList from 'pages/Usuarios/List';
import UsuarioShow from 'pages/Usuarios/Show';
import UsuarioNew from 'pages/Usuarios/New';
import UsuarioEdit from 'pages/Usuarios/Edit';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    marginLeft: 280,
    marginTop: 50,
  },
  isMobile: {
    marginLeft: 0,
    marginTop: 50,
  },
}));

const Main = ({ user, empresa, local }) => {
  if (!empresa) {
    return (
      <Routes>
        <Route path="/empresas/select" element={<EmpresaSelect />} />
        <Route path="/*" element={<EmpresaSelect />} />
      </Routes>
    );
  }

  if (!local) {
    return (
      <Routes>
        <Route path="/empresas/select" element={<EmpresaSelect />} />
        <Route path="/locais/select" element={<LocalSelect />} />
        <Route path="/*" element={<LocalSelect />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/empresas/select" element={<EmpresaSelect />} />

      <Route path="/locais/select" element={<LocalSelect />} />
      <Route path="/empresas" element={<EmpresaList />} />
      <Route path="/empresas/new" element={<EmpresaNew />} />
      <Route path="/empresas/edit/:id" element={<EmpresaEdit />} />
      <Route path="/empresas/show/:id" element={<EmpresaShow />} />

      <Route path="/" element={<UsuarioList />} />
      <Route path="/usuarios" element={<UsuarioList />} />
      <Route path="/usuarios/new" element={<UsuarioNew />} />
      <Route path="/usuarios/show/:id" element={<UsuarioShow />} />
      <Route path="/usuarios/edit/:id" element={<UsuarioEdit />} />


      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

const Pages = ({ darkTheme, setDarkTheme }) => {
  const { user, empresa, local } = useAuth();
  const history = createBrowserHistory();
  const classes = useStyles();
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 750) {
      setIsMobile(true);
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 750) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });
  }, []);

  if (!user) {
    return (
      <Router history={history}>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    );
  }
  return (
    <Router history={history}>
      <Menu
        darkTheme={darkTheme}
        setDarkTheme={setDarkTheme}
        isMobile={isMobile}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
      <div
        className={clsx(
          (!isMobile || drawerOpen) && classes.sidebar,
          (isMobile || !drawerOpen) && classes.isMobile
        )}
      >
        <Container>
          <Main user={user} local={local} empresa={empresa} />
        </Container>
      </div>
    </Router>
  );
};
export default Pages;
