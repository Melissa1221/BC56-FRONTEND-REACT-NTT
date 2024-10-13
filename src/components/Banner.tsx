import React from 'react';

// Definimos la interfaz para las props
interface BannerProps {
  image: string;      // La imagen es un string obligatorio (URL o path de la imagen)
  title: string;      // El título es un string obligatorio
  description: string; // La descripción es un string obligatorio
}

const Banner: React.FC<BannerProps> = ({ image, title, description }) => {
  return (
    <li className="scrollbar-item">
      <div className="home-card has-bg-image" style={{ backgroundImage: `url(${image})` }}>
        <div className="card-content">
          <h1 className="h1 home-title">{title}</h1>
          <p className="home-text">{description}</p>
          <a href="#" aria-label="Compra ahora" className="btn btn-primary">Compra ahora</a>
        </div>
      </div>
    </li>
  );
};

export default Banner;
