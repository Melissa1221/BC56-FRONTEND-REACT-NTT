import React, { useState } from 'react';
import styles from './css/ForgotPasswordModal.module.css';
import { RegexPatterns } from '../../shared/utils';

interface ForgotPasswordModalProps {
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSendEmail = () => {
    setError('');


    if (!email.match(RegexPatterns.EMAIL)) {
      setError('Por favor, ingresa un correo válido.');
      return;
    }

    alert('Se envió la información al correo ingresado.');
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Recuperar Contraseña</h3>
        <input
          type="email"
          id='email'
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        {error && <p className={styles.error}>{error}</p>}

        <button onClick={handleSendEmail} className={styles.sendButton}>
          Enviar
        </button>
        <button onClick={onClose} className={styles.closeButton}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
