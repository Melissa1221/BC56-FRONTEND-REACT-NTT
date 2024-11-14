import { FC } from 'react';
import styles from './Select.module.css';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  onChange: (value: string) => void;
  defaultOption?: string;
}

const Select: FC<SelectProps> = ({ options, onChange, defaultOption = "Seleccione una opción" }) => {
  return (
    <div className={styles.selectWrapper}>
      <select 
        className={styles.select}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{defaultOption}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
