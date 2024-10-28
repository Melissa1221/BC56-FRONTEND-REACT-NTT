import React from 'react';
import { render, screen } from '@testing-library/react';
import Main from '../Main';

describe('Main Component', () => {
  test('renders the main section with appropriate aria-label', () => {
    render(<Main />);
    const section = screen.getByLabelText('banner principal');
    expect(section).toBeInTheDocument();
  });

  test('renders all banners with correct content', () => {
    render(<Main />);
    const bannersData = [
      {
        title: "Consigue los mejores productos",
        description: "Alimentos, Maquillaje, Cuidado de la piel, Cuidado del cabello y más."
      },
      {
        title: "Consigue los mejores productos",
        description: "Alimentos, Maquillaje, Cuidado de la piel, Cuidado del cabello y más."
      },
      {
        title: "Consigue los mejores productos",
        description: "Alimentos, Maquillaje, Cuidado de la piel, Cuidado del cabello y más."
      }
    ];

    bannersData.forEach(({ title, description }) => {
      const titleElements = screen.getAllByText(title);
      const descriptionElements = screen.getAllByText(description);
      expect(titleElements.length).toBe(3);
      expect(descriptionElements.length).toBe(3);
      titleElements.forEach(element => expect(element).toBeInTheDocument());
      descriptionElements.forEach(element => expect(element).toBeInTheDocument());
    });
  });
});
