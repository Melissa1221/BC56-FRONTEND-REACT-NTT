import { IonIcon } from '@ionic/react';
import { bagHandleOutline, star, starOutline } from 'ionicons/icons';
import { FC } from 'react';
import { ProductCardProps } from './productCard.domain';
import styles from './ProductCard.module.css';


const ProductCard: FC<ProductCardProps> = ({ product, onAddToCart, onAddToWishlist }) => {
  return (
    <div className={styles.shopCard}>
      <div className={styles.cardBanner}>
        <img src={product.thumbnail} alt={product.title} width="540" height="720" className={styles.imgCover} />
        <span className={styles.badge} aria-label={`${product.discountPercentage}% de descuento`}>
          -{product.discountPercentage}%
        </span>
        <div className={styles.cardActions}>
          <button onClick={() => onAddToCart(product.price)}
           className={styles.actionBtn} aria-label="añadir al carrito">
            <IonIcon icon={bagHandleOutline}></IonIcon>
          </button>
          <button onClick={onAddToWishlist} className={styles.actionBtn} aria-label="añadir a la lista de deseos">
            <IonIcon icon={starOutline}></IonIcon>
          </button>
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.price}>
          <del>{product.price}</del>
          <span>{product.price}</span>
        </div>
        <h3 className={styles.cardTitle}>{product.title}</h3>
        
        <div className={styles.cardRating}>
          <div className={styles.ratingWrapper} aria-label={`${product.rating} estrellas`}>
            {[...Array(5)].map((_, i) => (
              <IonIcon key={i} icon={i < Math.round(product.rating) ? star : starOutline} />
            ))}
          </div>
          <p className={styles.ratingText}>{product.stock} disponibles</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
