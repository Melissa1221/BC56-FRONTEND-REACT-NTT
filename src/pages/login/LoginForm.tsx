import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import styles from './css/LoginForm.module.css';
import { colorsAlertLogin } from '../../shared/utils';
import { useUser } from '../../shared/context/UserContext';
import { getRoute } from '../../shared/routes';

interface LoginFormInputs {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const { setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      const firstName = sessionStorage.getItem('firstName');
      const lastName = sessionStorage.getItem('lastName');
      const image = sessionStorage.getItem('userImage');

      if (firstName && lastName) {
        setUser(firstName, lastName, image || '');

      }
    }
  }, [navigate, setUser]);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, expiresInMins: 30 }),
      });
      
      const userData = await response.json();

      if (response.ok) {

        sessionStorage.setItem('accessToken', userData.token);
        sessionStorage.setItem('firstName', userData.firstName);
        sessionStorage.setItem('lastName', userData.lastName);
        sessionStorage.setItem('userImage', userData.image);

        setUser(userData.firstName, userData.lastName, userData.image);

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
      } else {
        throw new Error(userData.message || 'Credenciales incorrectas.');
      }
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: 'Ocurrió un error. Inténtalo de nuevo.',
        confirmButtonColor: colorsAlertLogin.error,
        confirmButtonText: 'Cerrar'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
      <div className={styles.formGroup}>
        <label>Usuario</label>
        <input
          type="text"
          {...register('username', { required: 'Este campo es obligatorio' })}
          className={styles.input}
        />
        {errors.username && <p className={styles.error}>{errors.username.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label>Contraseña</label>
        <input
          type="password"
          {...register('password', { required: 'Este campo es obligatorio' })}
          className={styles.input}
        />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
      </div>

      <button type="submit" className={styles.loginButton}>
        Iniciar Sesión
      </button>
    </form>
  );
};

export default LoginForm;