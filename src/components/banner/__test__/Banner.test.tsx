import { render, screen } from '@testing-library/react';
import Banner from '../Banner';
import '@testing-library/jest-dom';

describe('Banner Component', () => {
  const defaultProps = {
    image: 'https://example.com/sample.jpg',
    title: 'Sample Title',
    description: 'This is a sample description.',
  };

  test('should render the background image correctly', () => {
    render(<Banner {...defaultProps} />);
    const bannerElement = screen.getByRole('listitem');
    expect(bannerElement.firstChild).toHaveStyle(`background-image: url(${defaultProps.image})`);
  });

  test('should display the title', () => {
    render(<Banner {...defaultProps} />);
    const titleElement = screen.getByText(defaultProps.title);
    expect(titleElement).toBeInTheDocument();
  });

  test('should display the description', () => {
    render(<Banner {...defaultProps} />);
    const descriptionElement = screen.getByText(defaultProps.description);
    expect(descriptionElement).toBeInTheDocument();
  });

  test('should have a link with aria-label "Compra ahora"', () => {
    render(<Banner {...defaultProps} />);
    const linkElement = screen.getByRole('link', { name: /compra ahora/i });
    expect(linkElement).toBeInTheDocument();
  });
});
