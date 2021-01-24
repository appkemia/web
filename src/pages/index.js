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

import TanqueList from 'pages/Tanques/List';
import TanqueShow from 'pages/Tanques/Show';
import TanqueNew from 'pages/Tanques/New';
import TanqueEdit from 'pages/Tanques/Edit';

import EquipamentoList from 'pages/Equipamentos/List';
import EquipamentoShow from 'pages/Equipamentos/Show';
import EquipamentoNew from 'pages/Equipamentos/New';
import EquipamentoEdit from 'pages/Equipamentos/Edit';

import EtaList from 'pages/Etas/List';
import EtaShow from 'pages/Etas/Show';
import EtaNew from 'pages/Etas/New';
import EtaEdit from 'pages/Etas/Edit';

import LagoaList from 'pages/Lagoas/List';
import LagoaShow from 'pages/Lagoas/Show';
import LagoaNew from 'pages/Lagoas/New';
import LagoaEdit from 'pages/Lagoas/Edit';

import ControleOdList from 'pages/ControleOds/List';
import ControleOdShow from 'pages/ControleOds/Show';
import ControleOdNew from 'pages/ControleOds/New';
import ControleOdEdit from 'pages/ControleOds/Edit';

import ControlePhList from 'pages/ControlePhs/List';
import ControlePhShow from 'pages/ControlePhs/Show';
import ControlePhNew from 'pages/ControlePhs/New';
import ControlePhEdit from 'pages/ControlePhs/Edit';

import ControleSseList from 'pages/ControleSses/List';
import ControleSseShow from 'pages/ControleSses/Show';
import ControleSseNew from 'pages/ControleSses/New';
import ControleSseEdit from 'pages/ControleSses/Edit';

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
      <Route path="/" element={<UsuarioList />} />


      <Route path="/empresas" element={<EmpresaList />} />
      <Route path="/empresas/select" element={<EmpresaSelect />} />
      <Route path="/empresas/new" element={<EmpresaNew />} />
      <Route path="/empresas/edit/:id" element={<EmpresaEdit />} />
      <Route path="/empresas/show/:id" element={<EmpresaShow />} />

      <Route path="/usuarios" element={<UsuarioList />} />
      <Route path="/usuarios/new" element={<UsuarioNew />} />
      <Route path="/usuarios/show/:id" element={<UsuarioShow />} />
      <Route path="/usuarios/edit/:id" element={<UsuarioEdit />} />

      <Route path="/locais/select" element={<LocalSelect />} />

      <Route path="/tanques" element={<TanqueList />} />
      <Route path="/tanques/new" element={<TanqueNew />} />
      <Route path="/tanques/show/:id" element={<TanqueShow />} />
      <Route path="/tanques/edit/:id" element={<TanqueEdit />} />

      <Route path="/equipamentos" element={<EquipamentoList />} />
      <Route path="/equipamentos/new" element={<EquipamentoNew />} />
      <Route path="/equipamentos/show/:id" element={<EquipamentoShow />} />
      <Route path="/equipamentos/edit/:id" element={<EquipamentoEdit />} />

      <Route path="/etas" element={<EtaList />} />
      <Route path="/etas/new" element={<EtaNew />} />
      <Route path="/etas/show/:id" element={<EtaShow />} />
      <Route path="/etas/edit/:id" element={<EtaEdit />} />

      <Route path="/lagoas" element={<LagoaList />} />
      <Route path="/lagoas/new" element={<LagoaNew />} />
      <Route path="/lagoas/show/:id" element={<LagoaShow />} />
      <Route path="/lagoas/edit/:id" element={<LagoaEdit />} />

      <Route path="/controle-ods" element={<ControleOdList />} />
      <Route path="/controle-ods/new" element={<ControleOdNew />} />
      <Route path="/controle-ods/show/:id" element={<ControleOdShow />} />
      <Route path="/controle-ods/edit/:id" element={<ControleOdEdit />} />

      <Route path="/controle-phs" element={<ControlePhList />} />
      <Route path="/controle-phs/new" element={<ControlePhNew />} />
      <Route path="/controle-phs/show/:id" element={<ControlePhShow />} />
      <Route path="/controle-phs/edit/:id" element={<ControlePhEdit />} />

      <Route path="/controle-sses" element={<ControleSseList />} />
      <Route path="/controle-sses/new" element={<ControleSseNew />} />
      <Route path="/controle-sses/show/:id" element={<ControleSseShow />} />
      <Route path="/controle-sses/edit/:id" element={<ControleSseEdit />} />

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
