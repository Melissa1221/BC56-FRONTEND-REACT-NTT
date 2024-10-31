import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import styles from './css/LoginForm.module.css';
import { colorsAlertLogin } from '../../shared/utils';
import { useUser } from '../../shared/context/UserContext';
import { getRoute } from '../../shared/routes';
import { loginService } from '../../services/authService';

interface LoginFormInputs {
  username: string;
  password: string;
}

const LoginForm: FC = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormInputs>();
  
  const { setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeUserFromSession = () => {
      const token = sessionStorage.getItem('accessToken');
      if (!token) return;

      const firstName = sessionStorage.getItem('firstName');
      const lastName = sessionStorage.getItem('lastName');
      const image = sessionStorage.getItem('userImage');

      if (firstName && lastName) {
        setUser(firstName, lastName, image || '');
      }
    };

    initializeUserFromSession();
  }, [setUser]);

  const showSuccessAlert = async () => {
    const alertResult = await Swal.fire({
      icon: 'success',
      title: '¡Inicio de sesión exitoso!',
      text: 'Bienvenido, has iniciado sesión correctamente.',
      confirmButtonColor: colorsAlertLogin.success,
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false,
      allowEscapeKey: false
    });

    if (alertResult.isConfirmed) {
      navigate(getRoute('home'), { replace: true });
    }
  };

  const showErrorAlert = (errorMessage: string = 'Ocurrió un error. Inténtalo de nuevo.') => {
    Swal.fire({
      icon: 'error',
      title: 'Error de autenticación',
      text: errorMessage,
      confirmButtonColor: colorsAlertLogin.error,
      confirmButtonText: 'Cerrar'
    });
  };

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const userData = await loginService(data.username, data.password);
      
      setUser(
        userData.firstName || '',
        userData.lastName || '',
        userData.image || ''
      );

      await showSuccessAlert();
    } catch (error) {
      showErrorAlert(error instanceof Error ? error.message : undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
      <div className={styles.formGroup}>
        <label htmlFor="username">Usuario</label>
        <input
          id="username"
          type="text"
          {...register('username', { 
            required: 'Este campo es obligatorio',
            minLength: {
              value: 3,
              message: 'El usuario debe tener al menos 3 caracteres'
            }
          })}
          className={styles.input}
        />
        {errors.username && (
          <p className={styles.error}>{errors.username.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          {...register('password', { 
            required: 'Este campo es obligatorio',
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres'
            }
          })}
          className={styles.input}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>

      <button type="submit" className={styles.loginButton}>
        Iniciar Sesión
      </button>
    </form>
  );
};

export default LoginForm;
