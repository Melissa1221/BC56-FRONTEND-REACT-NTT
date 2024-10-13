import { useState, useEffect } from 'react';
import Header from './components/Header';
import ShopSection from './components/ShopSection';
import { getAllProducts, getCategories, getProductsByCategory } from './services/productsService';
import { Product, Category } from './interfaces';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [, setSearchTerm] = useState<string>('');

 
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      setLoading(true);
      const fetchedProducts = await getAllProducts();
      const fetchedCategories = await getCategories();
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
      setCategories(fetchedCategories);
      setLoading(false);
    };

    fetchProductsAndCategories();
  }, []);

  
  const filterByCategory = async (category: string) => {
    setLoading(true);
    if (category === '') {
      setFilteredProducts(products); // Mostrar todos los productos si no se selecciona ninguna categoría
    } else {
      const productsByCategory = await getProductsByCategory(category);
      setFilteredProducts(productsByCategory);
    }
    setLoading(false);
  };

  
  const filterBySearchTerm = (term: string) => {
    setSearchTerm(term); 

    if (term === '') {
      setFilteredProducts(products);  
    } else {
      const lowerCaseTerm = term.toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(lowerCaseTerm) ||
          product.description.toLowerCase().includes(lowerCaseTerm)
      );
      setFilteredProducts(filtered);  
    }
  };

  return (
    <>
      <Header onSearch={filterBySearchTerm} />
      <main>
        <article>
          <Main/>
          <ShopSection 
            products={filteredProducts} 
            categories={categories} 
            filterByCategory={filterByCategory} 
            loading={loading} 
          />
        </article>
      </main>
      <Footer/>
    </>
  );
}

export default App;
