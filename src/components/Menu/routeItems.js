import People from '@material-ui/icons/People';
import BusinessIcon from '@material-ui/icons/Business';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
import OpacityIcon from '@material-ui/icons/Opacity';
import PoolIcon from '@material-ui/icons/Pool';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';
import SettingsIcon from '@material-ui/icons/Settings';
import EventIcon from '@material-ui/icons/Event';
import NotificationsIcon from '@material-ui/icons/Notifications';

import {
  users,
  empresas,
  locais,
  tanques,
  equipamentos,
  etas,
  lagoas,
  controle_ods,
  controle_phs,
  controle_sses,
  polimento_etas,
  tratamento_efluente_lagoas,
  controle_coletas,
  controle_vazaos,
  controle_tanques,
  controle_bombas,
  equipamento_manutencaos,
  controle_concentracao_cloros,
  controle_pastilha_cloros,
  configuracaos,
  tarefas,
  tarefas_operador,
  notificaoes,
} from 'config/routes';

const routes = [
  {
    ...tarefas_operador,
    Icon: EventIcon,
  },
  {
    ...users,
    Icon: People,
  },
  {
    ...empresas,
    Icon: BusinessIcon,
  },
  {
    ...configuracaos,
    Icon: SettingsIcon,
  },
  {
    ...tarefas,
    Icon: EventIcon,
  },
  {
    ...notificaoes,
    Icon: NotificationsIcon,
  },
  {
    ...locais,
    Icon: AssistantPhotoIcon,
  },
  {
    ...tanques,
    Icon: LocalDrinkIcon,
  },
  {
    ...equipamentos,
    Icon: PermDataSettingIcon,
  },
  {
    ...etas,
    Icon: OpacityIcon,
  },
  {
    ...lagoas,
    Icon: PoolIcon,
  },
  {
    ...controle_ods,
    Icon: PlaylistAddCheckIcon,
  },
  {
    ...controle_phs,
    Icon: PlaylistAddCheckIcon,
  },
  {
    ...controle_sses,
    Icon: PlaylistAddCheckIcon,
  },
  {
    ...polimento_etas,
    Icon: PlaylistAddCheckIcon,
  },
  {
    ...tratamento_efluente_lagoas,
    Icon: PlaylistAddCheckIcon,
  },
  {
    ...controle_coletas,
    Icon: PlaylistAddCheckIcon,
  },
  {
    ...controle_vazaos,
    Icon: PlaylistAddCheckIcon,
  },
  {
    ...controle_tanques,
    Icon: PlaylistAddCheckIcon,
  },
  {
    ...controle_bombas,
    Icon: PlaylistAddCheckIcon,
  },
  {
    ...equipamento_manutencaos,
    Icon: PlaylistAddCheckIcon,
  },
  {
    ...controle_concentracao_cloros,
    Icon: PlaylistAddCheckIcon,
  },
  {
    ...controle_pastilha_cloros,
    Icon: PlaylistAddCheckIcon,
  },
];

export default routes;
