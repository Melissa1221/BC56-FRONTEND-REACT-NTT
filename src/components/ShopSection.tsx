// src/components/ShopSection.tsx
import React from 'react';
import ProductCard from './ProductCard';
import { Product, Category } from '../interfaces';

interface ShopSectionProps {
  products: Product[];
  categories: Category[];
  filterByCategory: (category: string) => void;
  loading: boolean;
}

const ShopSection: React.FC<ShopSectionProps> = ({ products, categories, filterByCategory, loading }) => {
  if (loading) return <p>Cargando...</p>;

  return (
    <section className="section shop" id="shop" aria-label="shop">
      <div className="container">
        <div className="title-wrapper">
          <h2 className="h2 section-title">Los más vendidos</h2>
          <div className="shop-options">
            <select onChange={(e) => filterByCategory(e.target.value)}>
              <option value="">Seleccione una categoría</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="shop-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard   key={product.id} product={product} />
            ))
          ) : (
            <p>No se encontraron productos.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
