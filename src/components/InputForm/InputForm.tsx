import React, { FC } from 'react';
import styles from './InputForm.module.css';

interface InputFormProps {
  id: string;
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
  options?: { id: string; name: string }[];
  touched?: boolean;
}

const InputForm: FC<InputFormProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  onBlur,
  error,
  options,
}) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{label}</label>
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          className={styles.formInput}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        >
          <option value="">Seleccione una opción</option>
          {options?.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          className={styles.formInput}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default InputForm;
