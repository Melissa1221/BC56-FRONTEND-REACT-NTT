import React, { useState } from 'react';
import LoginForm from './LoginForm';

import styles from './css/Login.module.css';
import ForgotPasswordModal from './ForgotPaswordModal';

const Login: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Iniciar Sesión</h2>
        <LoginForm />
        <p className={styles.forgotPasswordContainer}>
          <a href="#" onClick={handleOpenModal} className={styles.forgotPasswordLink}>
            ¿Olvidaste tu contraseña?
          </a>
        </p>
        {isModalOpen && <ForgotPasswordModal onClose={handleCloseModal} />}
      </div>
    </div>
  );
};

export default Login;
