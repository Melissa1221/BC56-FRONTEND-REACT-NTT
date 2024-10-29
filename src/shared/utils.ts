export const RegexPatterns = {
  NAME: /^[a-zA-Z\s]*$/,
  PHONE: /^\d+$/,
  EMAIL: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
};

export const isValidName = (value: string): boolean => {
  return RegexPatterns.NAME.test(value);
};

export const isValidPhone = (value: string): boolean => {
  return RegexPatterns.PHONE.test(value);
};

export const isNotEmpty = (value: string): boolean => {
  return value.trim() !== '';
};

export const validateField = (name: string, value: string): string => {
  switch (name) {
    case 'name':
    case 'lastname':
      if (!isNotEmpty(value)) return 'Campo obligatorio';
      return isValidName(value) ? '' : 'Debe ingresar un valor válido';
    case 'district':
    case 'address':
    case 'reference':
      return isNotEmpty(value) ? '' : 'Campo obligatorio';
    case 'phone':
      if (!isNotEmpty(value)) return 'Campo obligatorio';
      return isValidPhone(value) ? '' : 'Debe ingresar solo números';
    default:
      return '';
  }
};

export enum colorsAlertLogin{
  success = '#3085d6',
  error = '#d33'
}