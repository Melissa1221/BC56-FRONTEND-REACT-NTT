import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, Category } from '../../interfaces';
import { getAllProducts, getCategories, getProductsByCategory } from '../../services/productsService';

interface CartItem extends Product {
  quantity: number;
}

interface ShopState {
  products: Product[];
  filteredProducts: Product[];
  categories: Category[];
  loading: boolean;
  searchTerm: string;
  cartCount: number;
  wishlistCount: number;
  totalPrice: number;
  cartItems: CartItem[]; 
}

const initialState: ShopState = {
  products: [],
  filteredProducts: [],
  categories: [],
  loading: true,
  searchTerm: '',
  cartCount: 0,
  wishlistCount: 0,
  totalPrice: 0,
  cartItems: [],
};

type ShopAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_FILTERED_PRODUCTS'; payload: Product[] }
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_CART_ITEM_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'ADD_TO_WISHLIST' }
  | { type: 'FILTER_BY_CATEGORY'; payload: string }
  | { type: 'FILTER_BY_SEARCH_TERM'; payload: string }
  | { type: 'RESET_CART' };

const shopReducer = (state: ShopState, action: ShopAction): ShopState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload, filteredProducts: action.payload };
    case 'SET_FILTERED_PRODUCTS':
      return { ...state, filteredProducts: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'ADD_TO_CART':
      { const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          cartCount: state.cartCount + 1,
          totalPrice: state.totalPrice + action.payload.price,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
          cartCount: state.cartCount + 1,
          totalPrice: state.totalPrice + action.payload.price,
        };
      } }
    case 'REMOVE_FROM_CART':
      { const itemToRemove = state.cartItems.find(item => item.id === action.payload);
      if (!itemToRemove) return state;
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
        cartCount: state.cartCount - itemToRemove.quantity,
        totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity),
      }; }
    case 'UPDATE_CART_ITEM_QUANTITY':
      { 
        const { id, quantity } = action.payload;
        let totalQuantityDiff = 0;
        const updatedCartItems = state.cartItems.map(item => {
          if (item.id === id) {
            const quantityDiff = quantity - item.quantity;
            totalQuantityDiff += quantityDiff;
            return { ...item, quantity };
          }
          return item;
        });
        return {
          ...state,
          cartItems: updatedCartItems,
          cartCount: state.cartCount + totalQuantityDiff,
          totalPrice: updatedCartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        }; 
      }
    case 'ADD_TO_WISHLIST':
      return { ...state, wishlistCount: state.wishlistCount + 1 };
    case 'FILTER_BY_CATEGORY':
      return {
        ...state,
        filteredProducts: action.payload === ''
          ? state.products
          : state.products.filter(product => product.category === action.payload),
      };
    case 'FILTER_BY_SEARCH_TERM':
      return {
        ...state,
        filteredProducts: action.payload === ''
          ? state.products
          : state.products.filter(product =>
              product.title.toLowerCase().includes(action.payload.toLowerCase()) ||
              product.description.toLowerCase().includes(action.payload.toLowerCase())
            ),
      };
    case 'RESET_CART':
      return {
        ...state,
        cartItems: [],
        cartCount: 0,
        totalPrice: 0,
      };
    default:
      return state;
  }
};


export const ShopContext = createContext<{
  state: ShopState;
  dispatch: React.Dispatch<ShopAction>;
} | undefined>(undefined);


export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
};


export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};


export const useShopActions = () => {
  const { dispatch } = useShop();

  const fetchProductsAndCategories = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const fetchedProducts = await getAllProducts();
    const fetchedCategories = await getCategories();
    dispatch({ type: 'SET_PRODUCTS', payload: fetchedProducts });
    dispatch({ type: 'SET_CATEGORIES', payload: fetchedCategories });
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  const filterByCategory = async (category: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    if (category === '') {
      dispatch({ type: 'FILTER_BY_CATEGORY', payload: '' });
    } else {
      const productsByCategory = await getProductsByCategory(category);
      dispatch({ type: 'SET_FILTERED_PRODUCTS', payload: productsByCategory });
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  const filterBySearchTerm = (term: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
    dispatch({ type: 'FILTER_BY_SEARCH_TERM', payload: term });
  };

  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleRemoveFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const handleUpdateCartItemQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_ITEM_QUANTITY', payload: { id: productId, quantity } });
  };

  const handleAddToWishlist = () => {
    dispatch({ type: 'ADD_TO_WISHLIST' });
  };

  const resetCart = () => {
    dispatch({ type: 'RESET_CART' });
  };

  return {
    fetchProductsAndCategories,
    filterByCategory,
    filterBySearchTerm,
    handleAddToCart,
    handleRemoveFromCart,
    handleUpdateCartItemQuantity,
    handleAddToWishlist,
    resetCart,
    ShopContext
  };
};
