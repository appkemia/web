import React from 'react';
import {
  useNavigate,
  useLocation,
  useMatch,
  useRoutes,
  useParams,
} from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';

import * as routes from 'config/routes';

const CollapsedBreadcrumbs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const breadcrumbNameMap = {};
  const { id } = useParams();

  const match = useMatch('/collaborator/show/:id');

  Object.values(routes).forEach((key) => {
    breadcrumbNameMap[key.path] = key.name;
  });

  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs maxItems={4} aria-label="breadcrumb">
      <Chip label={<HomeIcon />} onClick={() => navigate('/')} />
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return (
          <Chip
            label={breadcrumbNameMap[to]}
            key={to}
            onClick={() => navigate(to)}
          />
        );

        // return last ? (
        //   <Typography color="textPrimary" key={to}>
        //     {breadcrumbNameMap[to]}
        //   </Typography>
        // ) : (
        //   <Chip
        //     label={breadcrumbNameMap[to]}
        //     key={to}
        //     onClick={() => navigate(to)}
        //   />
        // );
      })}
    </Breadcrumbs>
  );
};

export default CollapsedBreadcrumbs;
