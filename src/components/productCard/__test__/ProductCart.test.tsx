import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../ProductCard';
import { ProductCardProps } from '../productCard.domain';

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    title: 'Producto de Prueba',
    price: 100,
    discountPercentage: 10,
    thumbnail: 'https://via.placeholder.com/540x720',
    rating: 4.5,
    stock: 20,
    description: 'Test product description',
    brand: 'Test Brand',
    category: 'Test Category',
    images: [],
    tags: []
  };

  const onAddToCart = jest.fn();
  const onAddToWishlist = jest.fn();
  const defaultProps: ProductCardProps = {
    product: mockProduct,
    onAddToCart,
    onAddToWishlist,
  };

  it('renders the product title, price, and image', () => {
    render(<ProductCard {...defaultProps} />);

    expect(screen.getByTestId('product-title')).toHaveTextContent('Producto de Prueba');
    expect(screen.getByTestId('product-image')).toBeInTheDocument();
    expect(screen.getByTestId('original-price')).toHaveTextContent('100');
    expect(screen.getByTestId('discounted-price')).toHaveTextContent('90'); 
  });

  it('calls the correct function when "add to cart" button is clicked', () => {
    render(<ProductCard {...defaultProps} />);

    const addToCartButton = screen.getByTestId('add-to-cart');
    fireEvent.click(addToCartButton);

    expect(onAddToCart).toHaveBeenCalledWith(mockProduct.price);
  });

  it('calls the correct function when "add to wishlist" button is clicked', () => {
    render(<ProductCard {...defaultProps} />);

    const addToWishlistButton = screen.getByTestId('add-to-wishlist');
    fireEvent.click(addToWishlistButton);

    expect(onAddToWishlist).toHaveBeenCalled();
  });

  it('renders the correct number of stars based on rating', () => {
    render(<ProductCard {...defaultProps} />);
  
    const stars = screen.getAllByTestId('star-icon');
    expect(stars).toHaveLength(5);
  
    expect(stars.filter(star => star.getAttribute('aria-label') === 'filled star')).toHaveLength(4);
    expect(stars.filter(star => star.getAttribute('aria-label') === 'empty star')).toHaveLength(1);
  });
  

  it('displays the correct stock', () => {
    render(<ProductCard {...defaultProps} />);
    expect(screen.getByTestId('product-stock')).toHaveTextContent('20 disponibles');
  });

  it('displays the discount badge correctly', () => {
    render(<ProductCard {...defaultProps} />);
    const discountBadge = screen.getByLabelText('10% de descuento');
    expect(discountBadge).toBeInTheDocument();
    expect(discountBadge).toHaveTextContent('-10%');
  });

  it('displays both original and discounted prices', () => {
    render(<ProductCard {...defaultProps} />);

    const originalPrice = screen.getByTestId('original-price');
    expect(originalPrice).toBeInTheDocument();
    expect(originalPrice.tagName).toBe('DEL');

    const discountedPrice = screen.getByTestId('discounted-price');
    expect(discountedPrice).toBeInTheDocument();
    expect(discountedPrice).toHaveTextContent('90');
  });
});
