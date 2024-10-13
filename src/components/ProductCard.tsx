// src/components/ProductCard.tsx

import { Product } from '../interfaces';
import { IonIcon } from '@ionic/react';
import { bagHandleOutline, star, starOutline } from 'ionicons/icons';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  

  const generateStars = (rating: number) => {
    const maxStars = 5;
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <IonIcon 
          key={i} 
          icon={i <= rating ? star : starOutline} 
          aria-hidden="true" 
          style={{ color: '#FFD700', fontSize: '16px' }} 
        />
      );
    }

    return stars;
  };

  return (
    <div className="shop-card">
      <div className="card-banner img-holder">
        <img src={product.thumbnail} alt={product.title} width="540" height="720" className="img-cover" />
        <span className="badge" aria-label={`${product.discountPercentage}% de descuento`}>
          -{product.discountPercentage}%
        </span>
        <div className="card-actions">
          <button  className="action-btn" aria-label="añadir al carrito">
            <IonIcon icon={bagHandleOutline}></IonIcon>
          </button>
          <button className="action-btn" aria-label="añadir a la lista de deseos">
            <IonIcon icon={starOutline}></IonIcon>
          </button>
        </div>
      </div>
      <div className="card-content">
        <div className="price">
          <del>s/.{(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}</del>
          <span>s/.{product.price.toFixed(2)}</span>
        </div>
        <h3 className="card-title">{product.title}</h3>

        
        <div className="card-rating">
          <div className="rating-wrapper" aria-label={`${product.rating} estrellas`}>
            {generateStars(Math.round(product.rating))} {/* Redondea el rating */}
          </div>
          <p className="rating-text">{product.stock} disponibles</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
