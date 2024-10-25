import Banner from '../banner/Banner';
import styles from './Main.module.css';

interface BannerData {
  image: string;
  title: string;
  description: string;
}

const banners: BannerData[] = [
  {
    image: '/assets/images/3-banner.png',
    title: "Consigue los mejores productos",
    description: "Alimentos, Maquillaje, Cuidado de la piel, Cuidado del cabello y más."
  },
  {
    image: '/assets/images/2-banner.png',
    title: "Consigue los mejores productos",
    description: "Alimentos, Maquillaje, Cuidado de la piel, Cuidado del cabello y más."
  },
  {
    image: '/assets/images/1-banner.png',
    title: "Consigue los mejores productos",
    description: "Alimentos, Maquillaje, Cuidado de la piel, Cuidado del cabello y más."
  }
];

const Main = () => (
  <section className={styles.home} id="home" aria-label="banner principal">
    <div className={styles.container}>
      <ul className={styles.hasScrollbar}>
        {banners.map((banner, index) => (
          <Banner
            key={index}
            image={banner.image}
            title={banner.title}
            description={banner.description}
          />
        ))}
      </ul>
    </div>
  </section>
);

export default Main;
