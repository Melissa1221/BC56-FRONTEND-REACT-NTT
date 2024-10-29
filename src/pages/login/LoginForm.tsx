import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import styles from './css/LoginForm.module.css';
import { colorsAlertLogin } from '../../shared/utils';
import { useUser } from '../../shared/context/UserContext';

interface LoginFormInputs {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const { setUser } = useUser(); 
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, expiresInMins: 30 }),
      });
      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('accessToken', result.token);

        setUser(result.firstName, result.lastName, result.image);

        Swal.fire({
          icon: 'success',
          title: '¡Inicio de sesión exitoso!',
          text: 'Bienvenido, has iniciado sesión correctamente.',
          confirmButtonColor: colorsAlertLogin.success,
          confirmButtonText: 'Aceptar'
        }).then(() => navigate('/home'));
      } else {
        throw new Error(result.message || 'Credenciales incorrectas.');
      }
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text:  'Ocurrió un error. Inténtalo de nuevo.',
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

      <button type="submit" className={styles.loginButton}>Iniciar Sesión</button>
    </form>
  );
};

export default LoginForm;
