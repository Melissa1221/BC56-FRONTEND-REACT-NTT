import { ComponentType, FC, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRoute } from '../shared/routes';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): FC<P> => {
  const AuthWrapper: FC<P> = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkAuth = () => {
        const token = sessionStorage.getItem('accessToken');
        
        if (!token) {
          // Guardamos la ruta actual para redireccionar después del login
          navigate(getRoute('login'), { 
            replace: true,
            state: { from: location.pathname }
          });
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      };

      checkAuth();

      // Opcional: Agregar un listener para cambios en sessionStorage
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'accessToken') {
          checkAuth();
        }
      };

      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }, [navigate, location]);

    // Mostrar un loader mientras se verifica la autenticación
    if (isLoading) {
      return <div>Loading...</div>; // Puedes personalizar esto
    }

    // Solo renderizar el componente si está autenticado
    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};

export default withAuth;