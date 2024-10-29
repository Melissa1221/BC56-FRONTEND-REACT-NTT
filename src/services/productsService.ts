import { Product, Category } from '../interfaces'

const API_URL = 'https://dummyjson.com/products';


export const getAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.products;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_URL}/categories`);
  const data = await response.json();
  return data;
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/category/${category}`);
  const data = await response.json();
  return data.products;
};