import { IonIcon } from '@ionic/react';
import { bagHandleOutline, star, starOutline } from 'ionicons/icons';
import { FC } from 'react';
import { ProductCardProps } from './productCard.domain';
import styles from './ProductCard.module.css';

const ProductCard: FC<ProductCardProps> = ({ product, onAddToCart, onAddToWishlist }) => {
  const discountedPrice = (product.price - (product.price * product.discountPercentage / 100)).toFixed(2);
  const filledStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 !== 0;

  return (
    <div className={styles.shopCard}>
      <div className={styles.cardBanner}>
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          width="540" 
          height="720" 
          className={styles.imgCover} 
          data-testid="product-image"
        />
        <span className={styles.badge} aria-label={`${product.discountPercentage}% de descuento`}>
          -{product.discountPercentage}%
        </span>
        <div className={styles.cardActions}>
          <button 
            onClick={() => onAddToCart(product.price)}
            className={styles.actionBtn} 
            aria-label="añadir al carrito" 
            data-testid="add-to-cart"
          >
            <IonIcon icon={bagHandleOutline}></IonIcon>
          </button>
          <button 
            onClick={onAddToWishlist} 
            className={styles.actionBtn} 
            aria-label="añadir a la lista de deseos" 
            data-testid="add-to-wishlist"
          >
            <IonIcon icon={starOutline}></IonIcon>
          </button>
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.price}>
          <del data-testid="original-price">${product.price.toFixed(2)}</del>
          <span data-testid="discounted-price">${discountedPrice}</span>
        </div>
        <h3 className={styles.cardTitle} data-testid="product-title">{product.title}</h3>
        
        <div className={styles.cardRating}>
          <div className={styles.ratingWrapper} aria-label={`${product.rating} estrellas`}>
            {[...Array(5)].map((_, i) => (
              <IonIcon 
                key={i} 
                icon={
                  i < filledStars ? star :
                  i === filledStars && hasHalfStar ? starOutline : starOutline
                } 
                data-testid="star-icon" 
                aria-label={i < filledStars ? "filled star" : "empty star"}
              />
            ))}
          </div>
          <p className={styles.ratingText} data-testid="product-stock">{product.stock} disponibles</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
