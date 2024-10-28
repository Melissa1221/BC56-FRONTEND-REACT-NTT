import { getAllProducts, getCategories, getProductsByCategory } from '../productsService';
import { Product, Category } from '../../interfaces';

const mockProducts: Product[] = [
  { id: 1, title: 'Product 1', description: 'Description 1', price: 100, discountPercentage: 10, rating: 4.5, stock: 20, brand: 'Brand 1', category: 'Category 1', thumbnail: 'thumbnail1.jpg', images: ['image1.jpg'], tags: ['popular'] },
  { id: 2, title: 'Product 2', description: 'Description 2', price: 200, discountPercentage: 15, rating: 4.0, stock: 10, brand: 'Brand 2', category: 'Category 2', thumbnail: 'thumbnail2.jpg', images: ['image2.jpg'], tags: ['new'] }
];
const mockCategories: Category[] = [
  { name: 'Category 1', slug: 'category1' },
  { name: 'Category 2', slug: 'category2' }
];

describe('Product Service API Functions', () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches all products with getAllProducts', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ products: mockProducts })
    });

    const products = await getAllProducts();
    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products');
    expect(products).toEqual(mockProducts);
  });

  it('fetches categories with getCategories', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockCategories)
    });

    const categories = await getCategories();
    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products/categories');
    expect(categories).toEqual(mockCategories);
  });

  it('fetches products by category with getProductsByCategory', async () => {
    const category = 'category1';
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ products: mockProducts })
    });

    const products = await getProductsByCategory(category);
    expect(fetch).toHaveBeenCalledWith(`https://dummyjson.com/products/category/${category}`);
    expect(products).toEqual(mockProducts);
  });

  it('handles fetch errors gracefully', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(getAllProducts()).rejects.toThrow('Network error');
  });
});
