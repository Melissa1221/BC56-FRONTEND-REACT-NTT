import React, { FC, useMemo, useCallback } from 'react';
import ProductCard from '../productCard/ProductCard';
import Select from '../select/Select';
import { Product, Category } from '../../interfaces';
import styles from './ShopSection.module.css';

interface ShopSectionProps {
  products: Product[];
  categories: Category[];
  filterByCategory: (category: string) => void;
  loading: boolean;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: () => void;
}

const ShopSection: FC<ShopSectionProps> = ({ 
  products, 
  categories, 
  filterByCategory, 
  loading, 
  onAddToCart, 
  onAddToWishlist 
}) => {

  const categoryOptions = useMemo(() => 
    categories.map(category => ({
      value: category.slug,
      label: category.name
    })), 
    [categories]
  );

  const handleAddToCart = useCallback((product: Product) => {
    onAddToCart(product);
  }, [onAddToCart]);

  if (loading) {
    return <p>Cargando...</p>; // Replace with spinner or loading indicator if desired
  }

  return (
    <section className={`${styles.section} ${styles.shop}`} id="shop" aria-label="shop">
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.sectionTitle}>Los más vendidos</h2>
          <div className={styles.shopOptions}>
            <Select 
              options={categoryOptions}
              onChange={filterByCategory}
              defaultOption="Seleccione una categoría"
            />
          </div>
        </div>

        {products.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          <div className={styles.shopGrid}>
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={() => handleAddToCart(product)} 
                onAddToWishlist={onAddToWishlist}  
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopSection;
