import { render, screen, fireEvent } from '@testing-library/react';
import ShopSection from '../ShopSection';
import { Product } from '../../../domain/product.interface';
import { Category } from '../../../domain/category.interface';


const mockCategories: Category[] = [
  { name: 'Category 1', slug: 'category1' },
  { name: 'Category 2', slug: 'category2' }
];

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    description: 'A great product',
    price: 100,
    discountPercentage: 10,
    rating: 4,
    stock: 20,
    brand: 'Brand 1',
    category: 'Category 1',
    thumbnail: '/path/to/image1.jpg',
    images: ['/path/to/image1.jpg'],
    tags: ['popular', 'new']
  }
];

const mockFilterByCategory = jest.fn();
const mockOnAddToCart = jest.fn();
const mockOnAddToWishlist = jest.fn();

describe('ShopSection Component', () => {
  it('displays loading text when loading is true', () => {
    render(
      <ShopSection
        products={[]}
        categories={mockCategories}
        filterByCategory={mockFilterByCategory}
        loading={true}
        onAddToCart={mockOnAddToCart}
        onAddToWishlist={mockOnAddToWishlist}
      />
    );

    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('renders category select and products grid when loading is false', () => {
    render(
      <ShopSection
        products={mockProducts}
        categories={mockCategories}
        filterByCategory={mockFilterByCategory}
        loading={false}
        onAddToCart={mockOnAddToCart}
        onAddToWishlist={mockOnAddToWishlist}
      />
    );

    expect(screen.getByText('Los más vendidos')).toBeInTheDocument();
    expect(screen.getByText('Seleccione una categoría')).toBeInTheDocument();
    expect(screen.getByText(mockProducts[0].title)).toBeInTheDocument();
  });

  it('calls filterByCategory when a category is selected', () => {
    render(
      <ShopSection
        products={mockProducts}
        categories={mockCategories}
        filterByCategory={mockFilterByCategory}
        loading={false}
        onAddToCart={mockOnAddToCart}
        onAddToWishlist={mockOnAddToWishlist}
      />
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'category1' } });
    expect(mockFilterByCategory).toHaveBeenCalledWith('category1');
  });

  it('calls onAddToCart with correct product when add to cart is clicked', () => {
    render(
      <ShopSection
        products={mockProducts}
        categories={mockCategories}
        filterByCategory={mockFilterByCategory}
        loading={false}
        onAddToCart={mockOnAddToCart}
        onAddToWishlist={mockOnAddToWishlist}
      />
    );

    const addToCartButton = screen.getByLabelText('añadir al carrito');
    fireEvent.click(addToCartButton);
    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProducts[0]);
  });

  it('calls onAddToWishlist when add to wishlist is clicked', () => {
    render(
      <ShopSection
        products={mockProducts}
        categories={mockCategories}
        filterByCategory={mockFilterByCategory}
        loading={false}
        onAddToCart={mockOnAddToCart}
        onAddToWishlist={mockOnAddToWishlist}
      />
    );

    const addToWishlistButton = screen.getByLabelText('añadir a la lista de deseos');
    fireEvent.click(addToWishlistButton);
    expect(mockOnAddToWishlist).toHaveBeenCalled();
  });

  it('displays a message when there are no products available', () => {
    render(
      <ShopSection
        products={[]}
        categories={mockCategories}
        filterByCategory={mockFilterByCategory}
        loading={false}
        onAddToCart={mockOnAddToCart}
        onAddToWishlist={mockOnAddToWishlist}
      />
    );

    expect(screen.getByText('No hay productos disponibles.')).toBeInTheDocument();
  });
});
