import React, { useEffect, useState, useContext } from 'react';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from 'contexts/auth';
import { AbilityContext } from 'contexts/Can';
import { buildAbilityFor } from 'config/ability';

import Container from 'components/Container';
import Menu from 'components/Menu/index';

import NotFound from 'pages/NotFound';
import NotPermissionPage from 'pages/NotPermissionPage';

import Login from 'pages/Login';

import EmpresaSelect from 'pages/Empresas/Select';
import EmpresaList from 'pages/Empresas/List';
import EmpresaNew from 'pages/Empresas/New';
import EmpresaEdit from 'pages/Empresas/Edit';
import EmpresaShow from 'pages/Empresas/Show';

import ConfiguracaoList from 'pages/Configuracaos/List';
import ConfiguracaoShow from 'pages/Configuracaos/Show';
import ConfiguracaoEdit from 'pages/Configuracaos/Edit';

import TarefaList from 'pages/Tarefas/List';
import TarefaNew from 'pages/Tarefas/New';
import TarefaShow from 'pages/Tarefas/Show';
import TarefaEdit from 'pages/Tarefas/Edit';
import ListOperadorList from 'pages/Tarefas/ListOperador';

import NotificacaoList from 'pages/Notificacaoes/List';

import LocalSelect from 'pages/Locais/Select';
import LocalList from 'pages/Locais/List';
import LocalNew from 'pages/Locais/New';
import LocalShow from 'pages/Locais/Show';
import LocalEdit from 'pages/Locais/Edit';

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

import PolimentoEtaList from 'pages/PolimentoEtas/List';
import PolimentoEtaShow from 'pages/PolimentoEtas/Show';
import PolimentoEtaNew from 'pages/PolimentoEtas/New';
import PolimentoEtaEdit from 'pages/PolimentoEtas/Edit';

import TratamentoEfluenteLagoaList from 'pages/TratamentoEfluenteLagoas/List';
import TratamentoEfluenteLagoaShow from 'pages/TratamentoEfluenteLagoas/Show';
import TratamentoEfluenteLagoaNew from 'pages/TratamentoEfluenteLagoas/New';
import TratamentoEfluenteLagoaEdit from 'pages/TratamentoEfluenteLagoas/Edit';

import ControleColetaList from 'pages/ControleColetas/List';
import ControleColetaShow from 'pages/ControleColetas/Show';
import ControleColetaNew from 'pages/ControleColetas/New';
import ControleColetaEdit from 'pages/ControleColetas/Edit';

import ControleVazaoList from 'pages/ControleVazaos/List';
import ControleVazaoShow from 'pages/ControleVazaos/Show';
import ControleVazaoNew from 'pages/ControleVazaos/New';
import ControleVazaoEdit from 'pages/ControleVazaos/Edit';

import ControleTanqueList from 'pages/ControleTanques/List';
import ControleTanqueShow from 'pages/ControleTanques/Show';
import ControleTanqueNew from 'pages/ControleTanques/New';
import ControleTanqueEdit from 'pages/ControleTanques/Edit';

import ControleBombaList from 'pages/ControleBombas/List';
import ControleBombaShow from 'pages/ControleBombas/Show';
import ControleBombaNew from 'pages/ControleBombas/New';
import ControleBombaEdit from 'pages/ControleBombas/Edit';

import EquipamentoManutencaoList from 'pages/EquipamentoManutencaos/List';
import EquipamentoManutencaoShow from 'pages/EquipamentoManutencaos/Show';
import EquipamentoManutencaoNew from 'pages/EquipamentoManutencaos/New';
import EquipamentoManutencaoEdit from 'pages/EquipamentoManutencaos/Edit';

import ControleConcentracaoCloroList from 'pages/ControleConcentracaoCloros/List';
import ControleConcentracaoCloroShow from 'pages/ControleConcentracaoCloros/Show';
import ControleConcentracaoCloroNew from 'pages/ControleConcentracaoCloros/New';
import ControleConcentracaoCloroEdit from 'pages/ControleConcentracaoCloros/Edit';

import ControlePastilhaCloroList from 'pages/ControlePastilhaCloros/List';
import ControlePastilhaCloroShow from 'pages/ControlePastilhaCloros/Show';
import ControlePastilhaCloroNew from 'pages/ControlePastilhaCloros/New';
import ControlePastilhaCloroEdit from 'pages/ControlePastilhaCloros/Edit';

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

function PrivateRoute({ children, action, subject }) {
  const ability = useContext(AbilityContext);

  return (
    <Route
      element={ability.can(action, subject) ? children : <NotPermissionPage />}
    />
  );
}

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
        <Route path="/locais/new" element={<LocalNew />} />
        <Route path="/*" element={<LocalSelect />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={user.tipo !== 'operator' ? <UsuarioList /> : <ListOperadorList />}
      />

      <PrivateRoute path="/empresas" action="list" subject="Empresas">
        <EmpresaList />
      </PrivateRoute>
      <PrivateRoute path="/empresas/select" action="select" subject="Empresas">
        <EmpresaSelect />
      </PrivateRoute>
      <PrivateRoute path="/empresas/new" action="new" subject="Empresas">
        <EmpresaNew />
      </PrivateRoute>
      <PrivateRoute path="/empresas/show/:id" action="show" subject="Empresas">
        <EmpresaShow />
      </PrivateRoute>
      <PrivateRoute path="/empresas/edit/:id" action="edit" subject="Empresas">
        <EmpresaEdit />
      </PrivateRoute>

      <PrivateRoute path="/configuracaos" action="list" subject="Configuracaos">
        <ConfiguracaoList />
      </PrivateRoute>
      <PrivateRoute
        path="/configuracaos/show/:id"
        action="show"
        subject="Configuracaos"
      >
        <ConfiguracaoShow />
      </PrivateRoute>
      <PrivateRoute
        path="/configuracaos/edit/:id"
        action="edit"
        subject="Configuracaos"
      >
        <ConfiguracaoEdit />
      </PrivateRoute>

      <PrivateRoute path="/tarefas-operador" action="list" subject="TarefasOperador">
        <ListOperadorList />
      </PrivateRoute>
      <PrivateRoute path="/tarefas" action="list" subject="Tarefas">
        <TarefaList />
      </PrivateRoute>
      <PrivateRoute path="/tarefas/new" action="new" subject="Tarefas">
        <TarefaNew />
      </PrivateRoute>
      <PrivateRoute path="/tarefas/show/:id" action="show" subject="Tarefas">
        <TarefaShow />
      </PrivateRoute>
      <PrivateRoute path="/tarefas/edit/:id" action="edit" subject="Tarefas">
        <TarefaEdit />
      </PrivateRoute>

      <PrivateRoute path="/notificaoes" action="list" subject="Notificaoes">
        <NotificacaoList />
      </PrivateRoute>

      <PrivateRoute path="/usuarios" action="list" subject="Usuarios">
        <UsuarioList />
      </PrivateRoute>
      <PrivateRoute path="/usuarios/new" action="new" subject="Usuarios">
        <UsuarioNew />
      </PrivateRoute>
      <PrivateRoute path="/usuarios/show/:id" action="show" subject="Usuarios">
        <UsuarioShow />
      </PrivateRoute>
      <PrivateRoute path="/usuarios/edit/:id" action="edit" subject="Usuarios">
        <UsuarioEdit />
      </PrivateRoute>

      <PrivateRoute path="/locais" action="list" subject="Locais">
        <LocalList />
      </PrivateRoute>
      <PrivateRoute path="/locais/select" action="select" subject="Locais">
        <LocalSelect />
      </PrivateRoute>
      <PrivateRoute path="/locais/new" action="new" subject="Locais">
        <LocalNew />
      </PrivateRoute>
      <PrivateRoute path="/locais/show/:id" action="show" subject="Locais">
        <LocalShow />
      </PrivateRoute>
      <PrivateRoute path="/locais/edit/:id" action="edit" subject="Locais">
        <LocalEdit />
      </PrivateRoute>

      <PrivateRoute path="/tanques" action="list" subject="Tanques">
        <TanqueList />
      </PrivateRoute>
      <PrivateRoute path="/tanques/new" action="new" subject="Tanques">
        <TanqueNew />
      </PrivateRoute>
      <PrivateRoute path="/tanques/show/:id" action="show" subject="Tanques">
        <TanqueShow />
      </PrivateRoute>
      <PrivateRoute path="/tanques/edit/:id" action="edit" subject="Tanques">
        <TanqueEdit />
      </PrivateRoute>

      <PrivateRoute path="/equipamentos" action="list" subject="Equipamentos">
        <EquipamentoList />
      </PrivateRoute>
      <PrivateRoute
        path="/equipamentos/new"
        action="new"
        subject="Equipamentos"
      >
        <EquipamentoNew />
      </PrivateRoute>
      <PrivateRoute
        path="/equipamentos/show/:id"
        action="show"
        subject="Equipamentos"
      >
        <EquipamentoShow />
      </PrivateRoute>
      <PrivateRoute
        path="/equipamentos/edit/:id"
        action="edit"
        subject="Equipamentos"
      >
        <EquipamentoEdit />
      </PrivateRoute>

      <PrivateRoute path="/etas" action="list" subject="Etas">
        <EtaList />
      </PrivateRoute>
      <PrivateRoute path="/etas/new" action="new" subject="Etas">
        <EtaNew />
      </PrivateRoute>
      <PrivateRoute path="/etas/show/:id" action="show" subject="Etas">
        <EtaShow />
      </PrivateRoute>
      <PrivateRoute path="/etas/edit/:id" action="edit" subject="Etas">
        <EtaEdit />
      </PrivateRoute>

      <PrivateRoute path="/lagoas" action="list" subject="Lagoas">
        <LagoaList />
      </PrivateRoute>
      <PrivateRoute path="/lagoas/new" action="new" subject="Lagoas">
        <LagoaNew />
      </PrivateRoute>
      <PrivateRoute path="/lagoas/show/:id" action="show" subject="Lagoas">
        <LagoaShow />
      </PrivateRoute>
      <PrivateRoute path="/lagoas/edit/:id" action="edit" subject="Lagoas">
        <LagoaEdit />
      </PrivateRoute>

      <PrivateRoute path="/controle-ods" action="list" subject="ControleOds">
        <ControleOdList />
      </PrivateRoute>
      <PrivateRoute path="/controle-ods/new" action="new" subject="ControleOds">
        <ControleOdNew />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-ods/show/:id"
        action="show"
        subject="ControleOds"
      >
        <ControleOdShow />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-ods/edit/:id"
        action="edit"
        subject="ControleOds"
      >
        <ControleOdEdit />
      </PrivateRoute>

      <PrivateRoute path="/controle-phs" action="list" subject="ControlePhs">
        <ControlePhList />
      </PrivateRoute>
      <PrivateRoute path="/controle-phs/new" action="new" subject="ControlePhs">
        <ControlePhNew />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-phs/show/:id"
        action="show"
        subject="ControlePhs"
      >
        <ControlePhShow />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-phs/edit/:id"
        action="edit"
        subject="ControlePhs"
      >
        <ControlePhEdit />
      </PrivateRoute>

      <PrivateRoute path="/controle-sses" action="list" subject="ControleSses">
        <ControleSseList />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-sses/new"
        action="new"
        subject="ControleSses"
      >
        <ControleSseNew />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-sses/show/:id"
        action="show"
        subject="ControleSses"
      >
        <ControleSseShow />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-sses/edit/:id"
        action="edit"
        subject="ControleSses"
      >
        <ControleSseEdit />
      </PrivateRoute>

      <PrivateRoute
        path="/tratamento-efluente-lagoas"
        action="list"
        subject="TratamentoEfluenteLagoas"
      >
        <TratamentoEfluenteLagoaList />
      </PrivateRoute>
      <PrivateRoute
        path="/tratamento-efluente-lagoas/new"
        action="new"
        subject="TratamentoEfluenteLagoas"
      >
        <TratamentoEfluenteLagoaNew />
      </PrivateRoute>
      <PrivateRoute
        path="/tratamento-efluente-lagoas/show/:id"
        action="show"
        subject="TratamentoEfluenteLagoas"
      >
        <TratamentoEfluenteLagoaShow />
      </PrivateRoute>
      <PrivateRoute
        path="/tratamento-efluente-lagoas/edit/:id"
        action="edit"
        subject="TratamentoEfluenteLagoas"
      >
        <TratamentoEfluenteLagoaEdit />
      </PrivateRoute>

      <PrivateRoute
        path="/polimento-etas"
        action="list"
        subject="PolimentoEtas"
      >
        <PolimentoEtaList />
      </PrivateRoute>
      <PrivateRoute
        path="/polimento-etas/new"
        action="new"
        subject="PolimentoEtas"
      >
        <PolimentoEtaNew />
      </PrivateRoute>
      <PrivateRoute
        path="/polimento-etas/show/:id"
        action="show"
        subject="PolimentoEtas"
      >
        <PolimentoEtaShow />
      </PrivateRoute>
      <PrivateRoute
        path="/polimento-etas/edit/:id"
        action="edit"
        subject="PolimentoEtas"
      >
        <PolimentoEtaEdit />
      </PrivateRoute>

      <PrivateRoute
        path="/controle-coletas"
        action="list"
        subject="ControleColetas"
      >
        <ControleColetaList />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-coletas/new"
        action="new"
        subject="ControleColetas"
      >
        <ControleColetaNew />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-coletas/show/:id"
        action="show"
        subject="ControleColetas"
      >
        <ControleColetaShow />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-coletas/edit/:id"
        action="edit"
        subject="ControleColetas"
      >
        <ControleColetaEdit />
      </PrivateRoute>

      <PrivateRoute
        path="/controle-vazaos"
        action="list"
        subject="ControleVazaos"
      >
        <ControleVazaoList />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-vazaos/new"
        action="new"
        subject="ControleVazaos"
      >
        <ControleVazaoNew />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-vazaos/show/:id"
        action="show"
        subject="ControleVazaos"
      >
        <ControleVazaoShow />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-vazaos/edit/:id"
        action="edit"
        subject="ControleVazaos"
      >
        <ControleVazaoEdit />
      </PrivateRoute>

      <PrivateRoute
        path="/controle-tanques"
        action="list"
        subject="ControleTanques"
      >
        <ControleTanqueList />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-tanques/new"
        action="new"
        subject="ControleTanques"
      >
        <ControleTanqueNew />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-tanques/show/:id"
        action="show"
        subject="ControleTanques"
      >
        <ControleTanqueShow />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-tanques/edit/:id"
        action="edit"
        subject="ControleTanques"
      >
        <ControleTanqueEdit />
      </PrivateRoute>

      <PrivateRoute
        path="/controle-bombas"
        action="list"
        subject="ControleBombas"
      >
        <ControleBombaList />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-bombas/new"
        action="new"
        subject="ControleBombas"
      >
        <ControleBombaNew />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-bombas/show/:id"
        action="show"
        subject="ControleBombas"
      >
        <ControleBombaShow />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-bombas/edit/:id"
        action="edit"
        subject="ControleBombas"
      >
        <ControleBombaEdit />
      </PrivateRoute>

      <PrivateRoute
        path="/equipamento-manutencaos"
        action="list"
        subject="EquipamentoManutencaos"
      >
        <EquipamentoManutencaoList />
      </PrivateRoute>
      <PrivateRoute
        path="/equipamento-manutencaos/new"
        action="new"
        subject="EquipamentoManutencaos"
      >
        <EquipamentoManutencaoNew />
      </PrivateRoute>
      <PrivateRoute
        path="/equipamento-manutencaos/show/:id"
        action="show"
        subject="EquipamentoManutencaos"
      >
        <EquipamentoManutencaoShow />
      </PrivateRoute>
      <PrivateRoute
        path="/equipamento-manutencaos/edit/:id"
        action="edit"
        subject="EquipamentoManutencaos"
      >
        <EquipamentoManutencaoEdit />
      </PrivateRoute>

      <PrivateRoute
        path="/controle-concentracao-cloros"
        action="list"
        subject="ControleConcentracaoCloros"
      >
        <ControleConcentracaoCloroList />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-concentracao-cloros/new"
        action="new"
        subject="ControleConcentracaoCloros"
      >
        <ControleConcentracaoCloroNew />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-concentracao-cloros/show/:id"
        action="show"
        subject="ControleConcentracaoCloros"
      >
        <ControleConcentracaoCloroShow />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-concentracao-cloros/edit/:id"
        action="edit"
        subject="ControleConcentracaoCloros"
      >
        <ControleConcentracaoCloroEdit />
      </PrivateRoute>

      <PrivateRoute
        path="/controle-pastilha-cloros"
        action="list"
        subject="ControlePastilhaCloros"
      >
        <ControlePastilhaCloroList />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-pastilha-cloros/new"
        action="new"
        subject="ControlePastilhaCloros"
      >
        <ControlePastilhaCloroNew />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-pastilha-cloros/show/:id"
        action="show"
        subject="ControlePastilhaCloros"
      >
        <ControlePastilhaCloroShow />
      </PrivateRoute>
      <PrivateRoute
        path="/controle-pastilha-cloros/edit/:id"
        action="edit"
        subject="ControlePastilhaCloros"
      >
        <ControlePastilhaCloroEdit />
      </PrivateRoute>

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
  const ability = buildAbilityFor(user);

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
      <AbilityContext.Provider value={ability}>
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
      </AbilityContext.Provider>
    </Router>
  );
};
export default Pages;
