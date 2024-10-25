
export interface  FormData {
    name: string;
    lastname: string;
    district: string;
    address: string;
    reference: string;
    phone: string;
  }
  
  export interface  FormErrors {
    name?: string;
    lastname?: string;
    district?: string;
    address?: string;
    reference?: string;
    phone?: string;
  }
  
  export interface  TouchedFields {
    name: boolean;
    lastname: boolean;
    district: boolean;
    address: boolean;
    reference: boolean;
    phone: boolean;
  }