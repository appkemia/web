import React from 'react';
import { useNavigate } from 'react-router-dom';

import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';
import Link from '@material-ui/core/Link';

import Typography from 'components/Typography';
import Can from 'contexts/Can';

const Header = ({ user, empresa, local }) => {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ justifyContent: 'center', display: 'flex' }}>
        <span>
          <Typography variant="h5">
            Bem vindo: <span>{user?.nome}</span>
          </Typography>
        </span>
      </div>

      <div style={{ justifyContent: 'space-evenly', display: 'flex' }}>
        <span>
          <Typography variant="h6" display="inline">
            Empresa: <span>{empresa?.nome}</span>
            {empresa && (
              <Can I="select" a="Empresas">
                <Link
                  variant="body2"
                  onClick={() => navigate('/empresas/select')}
                >
                  {' '}
                  alterar
                </Link>
              </Can>
            )}
          </Typography>
        </span>

        <span style={{ marginLeft: 50 }}>
          <Typography variant="h6" display="inline">
            Local: <span>{local?.nome}</span>
            {local && (
              <Can I="select" a="Locais">
                <Link
                  variant="body2"
                  onClick={() => navigate('/locais/select')}
                >
                  {' '}
                  alterar
                </Link>
              </Can>
            )}
          </Typography>
        </span>
      </div>
    </>
  );
};

export default Header;
