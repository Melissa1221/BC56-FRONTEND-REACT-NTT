import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getAllProducts, getCategories, getProductsByCategory } from '../../../services/productsService';
import { Product } from '../../../domain/product.interface';
import { Category } from '../../../domain/category.interface';
import { ShopProvider, useShop, useShopActions } from '../../../shared/context/ShopContext';
import { useEffect } from 'react';

jest.mock('../../../services/productsService', () => ({
  getAllProducts: jest.fn(),
  getCategories: jest.fn(),
  getProductsByCategory: jest.fn(),
}));

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    description: 'Description 1',
    price: 100,
    discountPercentage: 10,
    rating: 4.5,
    stock: 20,
    brand: 'Brand 1',
    category: 'Category 1',
    thumbnail: 'thumbnail1.jpg',
    images: ['image1.jpg'],
    tags: ['popular']
  }
];

const mockCategories: Category[] = [
  { name: 'Category 1', slug: 'category1' },
  { name: 'Category 2', slug: 'category2' }
];

const mockFilteredProducts: Product[] = mockProducts.filter(product => product.category === 'Category 1');
const ComponentUsingShopContext = () => {
    const { state } = useShop();
    const {
      fetchProductsAndCategories,
      filterByCategory,
      handleAddToCart,
      resetCart,
    } = useShopActions();
  
    useEffect(() => {
      fetchProductsAndCategories();
    }, []);
  
    return (
      <div>
        <p data-testid="cart-count">{state.cartCount}</p>
        <p data-testid="total-price">{state.totalPrice}</p>
        <button onClick={() => handleAddToCart(mockProducts[0])}>Add to Cart</button>
        <button onClick={() => filterByCategory('Category 1')}>Filter by Category</button>
        <button onClick={resetCart}>Reset Cart</button>
      </div>
    );
  };
  describe('ShopContext and Actions', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      (getAllProducts as jest.Mock).mockResolvedValue(mockProducts);
      (getCategories as jest.Mock).mockResolvedValue(mockCategories);
      (getProductsByCategory as jest.Mock).mockResolvedValue(mockFilteredProducts);
    });
  
    test('fetches products and categories', async () => {
      render(
        <ShopProvider>
          <ComponentUsingShopContext />
        </ShopProvider>
      );
  
      await waitFor(() => expect(getAllProducts).toHaveBeenCalled());
      await waitFor(() => expect(getCategories).toHaveBeenCalled());
    });
  
    test('adds a product to the cart', async () => {
      render(
        <ShopProvider>
          <ComponentUsingShopContext />
        </ShopProvider>
      );
  
      userEvent.click(screen.getByText('Add to Cart'));
  
      await waitFor(() => {
        expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
        expect(screen.getByTestId('total-price')).toHaveTextContent('100');
      });
    });
  
    test('filters products by category', async () => {
      render(
        <ShopProvider>
          <ComponentUsingShopContext />
        </ShopProvider>
      );
  
      userEvent.click(screen.getByText('Filter by Category'));
  
      await waitFor(() => {
        expect(getProductsByCategory).toHaveBeenCalledWith('Category 1');
      });
    });
  
    test('resets the cart', async () => {
      render(
        <ShopProvider>
          <ComponentUsingShopContext />
        </ShopProvider>
      );
  
      userEvent.click(screen.getByText('Add to Cart'));
      await waitFor(() => expect(screen.getByTestId('cart-count')).toHaveTextContent('1'));
  
      userEvent.click(screen.getByText('Reset Cart'));
  
      await waitFor(() => {
        expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
        expect(screen.getByTestId('total-price')).toHaveTextContent('0');
      });
    });
  });
  