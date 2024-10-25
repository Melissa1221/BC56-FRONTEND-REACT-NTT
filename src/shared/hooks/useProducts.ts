import { useState, useEffect } from 'react';
import { getAllProducts, getCategories, getProductsByCategory } from '../../services/productsService';
import { Product } from '../../domain/product.interface';
import { Category } from '../../domain/category.interface';


export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        const fetchedCategories = await getCategories();
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts); 
        setCategories(fetchedCategories);
        setLoading(false);
      } catch {
        setError('Error al obtener los productos');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterByCategory = async (category: string) => {
    setLoading(true);
    try {
      const productsByCategory = await getProductsByCategory(category);
      setFilteredProducts(productsByCategory);
      setLoading(false);
    } catch {
      setError('Error al filtrar por categoría');
      setLoading(false);
    }
  };

  const filterBySearchTerm = (term: string) => {
    const lowerCaseTerm = term.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(lowerCaseTerm) ||
        product.description.toLowerCase().includes(lowerCaseTerm)
    );
    setFilteredProducts(filtered);
  };

  return { products, filteredProducts, categories, loading, error, filterByCategory, filterBySearchTerm };
};
