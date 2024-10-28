import { renderHook, act, waitFor } from "@testing-library/react";
import { getAllProducts, getCategories, getProductsByCategory } from "../../../services/productsService";
import { useProducts } from "../useProducts";
import { Product } from "../../../domain/product.interface";
import { Category } from "../../../domain/category.interface";


const mockProducts: Product[] = [
  { id: 1, title: 'Product 1', description: 'Description 1', price: 100, discountPercentage: 10, rating: 4.5, stock: 10, brand: 'Brand 1', category: 'Category 1', thumbnail: '', images: [], tags: [] },
  { id: 2, title: 'Product 2', description: 'Description 2', price: 150, discountPercentage: 5, rating: 4.0, stock: 5, brand: 'Brand 2', category: 'Category 2', thumbnail: '', images: [], tags: [] }
];

const mockCategories: Category[] = [
  { slug: 'category-1', name: 'Category 1' },
  { slug: 'category-2', name: 'Category 2' }
];

jest.mock('../../../services/productsService', () => ({
  getAllProducts: jest.fn(),
  getCategories: jest.fn(),
  getProductsByCategory: jest.fn(),
}));

describe('useProducts Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('initially returns loading state and fetches products and categories', async () => {
    (getAllProducts as jest.Mock).mockResolvedValue(mockProducts);
    (getCategories as jest.Mock).mockResolvedValue(mockCategories);

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.categories).toEqual(mockCategories);
    expect(result.current.filteredProducts).toEqual(mockProducts);
    expect(result.current.error).toBeNull();
  });

  test('handles errors during data fetch', async () => {
    (getAllProducts as jest.Mock).mockRejectedValue(new Error('Error fetching products'));
    (getCategories as jest.Mock).mockRejectedValue(new Error('Error fetching categories'));

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.error).toBe('Error al obtener los productos');
      expect(result.current.loading).toBe(false);
    });
  });

  test('filters products by category', async () => {
    (getAllProducts as jest.Mock).mockResolvedValue(mockProducts);
    (getCategories as jest.Mock).mockResolvedValue(mockCategories);

    (getProductsByCategory as jest.Mock).mockImplementation((category) => {
      if (category === 'Category 1') {
        return Promise.resolve([mockProducts[0]]);
      }
      return Promise.resolve([]);
    });

    const { result } = renderHook(() => useProducts());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.filterByCategory('Category 1');
    });

    await waitFor(() => {
      expect(result.current.filteredProducts).toEqual([mockProducts[0]]);
    });
  });
});
