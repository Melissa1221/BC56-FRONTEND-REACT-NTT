
import Banner from './Banner';

const Main = () => (
  <section className="section home" id="home" aria-label="banner principal">
        <div className="container">
          <ul className="has-scrollbar">
            <Banner image='/assets/images/3-banner.png' title="Consigue los mejores productos" description="Alimentos, Maquillaje, Cuidado de la piel, Cuidado del cabello y más." />
            <Banner image='/assets/images/2-banner.png' title="Consigue los mejores productos" description="Alimentos, Maquillaje, Cuidado de la piel, Cuidado del cabello y más." />
            <Banner image='/assets/images/1-banner.png' title="Consigue los mejores productos" description="Alimentos, Maquillaje, Cuidado de la piel, Cuidado del cabello y más." />
          </ul>
        </div>
      </section>
);

export default Main;
