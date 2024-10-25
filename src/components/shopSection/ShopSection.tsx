import { FC } from 'react';
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

const ShopSection: FC<ShopSectionProps> = ({ products, categories, filterByCategory, loading, onAddToCart, onAddToWishlist }) => {
  if (loading) return <p>Cargando...</p>;

  const categoryOptions = categories.map(category => ({
    value: category.slug,
    label: category.name
  }));

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
        <div className={styles.shopGrid}>
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={() => onAddToCart(product)} 
              onAddToWishlist={onAddToWishlist}  
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
