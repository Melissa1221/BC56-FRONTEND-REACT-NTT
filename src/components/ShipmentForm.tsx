import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useDistricts from '../hooks/useDistricts';
import { useShopActions } from '../context/ShopContext';

interface FormData {
  name: string;
  lastname: string;
  district: string;
  address: string;
  reference: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  lastname?: string;
  district?: string;
  address?: string;
  reference?: string;
  phone?: string;
}

interface TouchedFields {
  name: boolean;
  lastname: boolean;
  district: boolean;
  address: boolean;
  reference: boolean;
  phone: boolean;
}

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
    <div className="shipment-form">
      <h2 className="shipment-form__title">Formulario de envío</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombres</label>
          <input
            id="name"
            type="text"
            name="name"
            className="form-input highlighted-border"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Apellidos</label>
          <input
            id="lastname"
            type="text"
            name="lastname"
            className="form-input highlighted-border"
            value={formData.lastname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.lastname && errors.lastname && <span className="error">{errors.lastname}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="district">Distrito</label>
          <select 
            id="district"
            name="district" 
            className="form-input highlighted-border"
            value={formData.district}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Seleccione un distrito</option>
            {districts.map(district => (
              <option key={district.id} value={district.id}>{district.name}</option>
            ))}
          </select>
          {touched.district && errors.district && <span className="error">{errors.district}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Dirección</label>
          <input
            id="address"
            type="text"
            name="address"
            className="form-input highlighted-border"
            value={formData.address}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.address && errors.address && <span className="error">{errors.address}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="reference">Referencia</label>
          <input
            id="reference"
            type="text"
            name="reference"
            className="form-input highlighted-border"
            value={formData.reference}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.reference && errors.reference && <span className="error">{errors.reference}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
          <input
            id="phone"
            type="text"
            name="phone"
            className="form-input highlighted-border"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.phone && errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        {showAlert && (
          <div className="alert alert-success">
            Su pedido se registró con éxito
            <button onClick={handleAlertConfirm} className="btn-primary">Aceptar</button>
          </div>
        )}
        <div>
          <button type="submit" className="btn-primary submit-button">
            Comprar
          </button>
        </div>
      </form>
    </div>
  )
}

export default ShipmentForm
