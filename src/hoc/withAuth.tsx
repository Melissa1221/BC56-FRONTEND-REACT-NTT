import React, { ComponentType, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRoute } from '../shared/routes';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): React.FC<P> => {
  const AuthWrapper: React.FC<P> = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = sessionStorage.getItem('accessToken');

      if (!token) {
        navigate(getRoute('login'));
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};

export default withAuth;
