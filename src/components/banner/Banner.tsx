import { FC } from 'react';
import { BannerProps } from './banner.domain';
import styles from './Banner.module.css';

const Banner: FC<BannerProps> = ({ image, title, description }) => {
  return (
    <li className={styles.scrollbarItem}>
      <div className={styles.homeCard} style={{ backgroundImage: `url(${image})` }}>
        <div className={styles.cardContent}>
          <h1 className={styles.homeTitle}>{title}</h1>
          <p className={styles.homeText}>{description}</p>
          <a href="#" aria-label="Compra ahora" className={styles.btn}>Compra ahora</a>
        </div>
      </div>
    </li>
  );
};

export default Banner;
