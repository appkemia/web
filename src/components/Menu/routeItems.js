import People from '@material-ui/icons/People';
import BusinessIcon from '@material-ui/icons/Business';

import {
  users,
  empresas,
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
];

export default routes;
