import People from '@material-ui/icons/People';
import BusinessIcon from '@material-ui/icons/Business';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
import OpacityIcon from '@material-ui/icons/Opacity';
import PoolIcon from '@material-ui/icons/Pool';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

import {
  users,
  empresas,
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
} from 'config/routes';

const routes = [
  {
    ...users,
    Icon: People,
  },
  {
    ...empresas,
    Icon: BusinessIcon,
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
];

export default routes;
