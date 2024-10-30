import { ComponentType, FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRoute } from '../shared/routes';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): FC<P> => {
  const AuthWrapper: FC<P> = (props) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = sessionStorage.getItem('accessToken');
      
      if (!token) {
        navigate(getRoute('login'), { replace: true });
      } else {
        setIsAuthenticated(true);
      }
    }, [navigate]);

    if (!isAuthenticated) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};

export default withAuth;