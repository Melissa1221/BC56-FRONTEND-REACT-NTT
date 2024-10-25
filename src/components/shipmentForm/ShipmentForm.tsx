import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useDistricts from '../../shared/hooks/useDistricts';
import { useShopActions } from '../../shared/context/ShopContext';
import { FormErrors, TouchedFields, FormData } from './shipmentForm.domain';

import styles from './ShipmentForm.module.css';
import InputForm from '../InputForm/InputForm';

const ShipmentForm = () => {
  const districts = useDistricts();
  const navigate = useNavigate();
  const { resetCart } = useShopActions();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    lastname: '',
    district: '',
    address: '',
    reference: '',
    phone: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    name: false,
    lastname: false,
    district: false,
    address: false,
    reference: false,
    phone: false,
  });
  const [showAlert, setShowAlert] = useState(false);

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case 'name':
      case 'lastname':
        if (!value.trim()) return 'Campo obligatorio';
        return /^[a-zA-Z\s]*$/.test(value) ? '' : 'Debe ingresar un valor válido';
      case 'district':
        return value ? '' : 'Campo obligatorio';
      case 'address':
      case 'reference':
        return value.trim() ? '' : 'Campo obligatorio';
      case 'phone':
        return /^\d+$/.test(value) ? '' : 'Debe ingresar solo números';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name as keyof FormData, value) }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name as keyof FormData, formData[name as keyof FormData]) }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key as keyof FormData, value);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      lastname: true,
      district: true,
      address: true,
      reference: true,
      phone: true,
    });

    if (Object.keys(newErrors).length === 0) {
      console.log('Datos del pedido:', formData);
      setShowAlert(true);
    }
  };

  const handleAlertConfirm = () => {
    setShowAlert(false);
    resetCart();
    navigate('/');
  };

  return (
    <div className={styles.shipmentForm}>
      <h2 className={styles.title}>Formulario de envío</h2>
      
      <form onSubmit={handleSubmit}>
        <InputForm
          id="name"
          label="Nombres"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          touched={touched.name}
        />
        <InputForm
          id="lastname"
          label="Apellidos"
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.lastname}
          touched={touched.lastname}
        />
        <InputForm
          id="district"
          label="Distrito"
          type="select"
          name="district"
          value={formData.district}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.district}
          touched={touched.district}
          options={districts}
        />
        <InputForm
          id="address"
          label="Dirección"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.address}
          touched={touched.address}
        />
        <InputForm
          id="reference"
          label="Referencia"
          type="text"
          name="reference"
          value={formData.reference}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.reference}
          touched={touched.reference}
        />
        <InputForm
          id="phone"
          label="Teléfono"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          touched={touched.phone}
        />
        {showAlert && (
          <div className={`${styles.alert} ${styles.alertSuccess}`}>
            Su pedido se registró con éxito
            <button onClick={handleAlertConfirm} className={styles.btnPrimary}>Aceptar</button>
          </div>
        )}
        <div>
          <button type="submit" className={`${styles.btnPrimary} ${styles.submitButton}`}>
            Comprar
          </button>
        </div>
      </form>
    </div>
  )
}

export default ShipmentForm
