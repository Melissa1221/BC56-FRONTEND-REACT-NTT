import  { useEffect } from 'react';
import Header from '../components/Header';
import ShopSection from '../components/ShopSection';
import Main from '../components/Main';
import Footer from '../components/Footer';
import { useShop, useShopActions } from '../context/ShopContext';

const Home = () => {
  const { state } = useShop();
  const { fetchProductsAndCategories, filterBySearchTerm, filterByCategory, handleAddToCart, handleAddToWishlist } = useShopActions();

  useEffect(() => {
    fetchProductsAndCategories();
  }, []);

  return (
    <>
      <Header 
        onSearch={filterBySearchTerm} 
        cartCount={state.cartCount} 
        wishlistCount={state.wishlistCount} 
        totalPrice={state.totalPrice}
      />
      <main>
        <article>
          <Main/>
          <ShopSection 
            products={state.filteredProducts} 
            categories={state.categories} 
            filterByCategory={filterByCategory} 
            loading={state.loading} 
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
          />
        </article>
      </main>
      <Footer/>
    </>
  );
}

export default Home;
