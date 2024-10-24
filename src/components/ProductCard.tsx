import { Product } from '../interfaces';
import { IonIcon } from '@ionic/react';
import { bagHandleOutline, star, starOutline } from 'ionicons/icons';
import { FC } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (price: number) => void;
  onAddToWishlist: () => void;
}

const calculateOriginalPrice = (price: number, discountPercentage: number): string => {
  return (price * (1 + discountPercentage / 100)).toFixed(2);
};

const formatPrice = (price: number): string => {
  return `s/.${price.toFixed(2)}`;
};

const generateStars = (rating: number) => {
  const maxStars = 5;
  return Array.from({ length: maxStars }, (_, i) => (
    <IonIcon 
      key={i} 
      icon={i < rating ? star : starOutline} 
      aria-hidden="true" 
      style={{ color: '#FFD700', fontSize: '16px' }} 
    />
  ));
};

const ProductCard: FC<ProductCardProps> = ({ product, onAddToCart, onAddToWishlist }) => {
  return (
    <div className="shop-card">
      <div className="card-banner img-holder">
        <img src={product.thumbnail} alt={product.title} width="540" height="720" className="img-cover" />
        <span className="badge" aria-label={`${product.discountPercentage}% de descuento`}>
          -{product.discountPercentage}%
        </span>
        <div className="card-actions">
          <button onClick={() => onAddToCart(product.price)}
           className="action-btn" aria-label="añadir al carrito">
            <IonIcon icon={bagHandleOutline}></IonIcon>
          </button>
          <button onClick={onAddToWishlist} className="action-btn" aria-label="añadir a la lista de deseos">
            <IonIcon icon={starOutline}></IonIcon>
          </button>
        </div>
      </div>
      <div className="card-content">
        <div className="price">
          <del>{formatPrice(Number(calculateOriginalPrice(product.price, product.discountPercentage)))}</del>
          <span>{formatPrice(product.price)}</span>
        </div>
        <h3 className="card-title">{product.title}</h3>
        
        <div className="card-rating">
          <div className="rating-wrapper" aria-label={`${product.rating} estrellas`}>
            {generateStars(Math.round(product.rating))}
          </div>
          <p className="rating-text">{product.stock} disponibles</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
