import  { useEffect } from 'react';

import styles from './Home.module.css';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Main from '../../components/main/Main';
import ShopSection from '../../components/shopSection/ShopSection';
import { useShop, useShopActions } from '../../shared/context/ShopContext';
import usePagination from '../../shared/hooks/usePagination';
import withAuth from '../../hoc/withAuth';

const Home = () => {
  const { state } = useShop();
  const { fetchProductsAndCategories, filterBySearchTerm, filterByCategory, handleAddToCart, handleAddToWishlist } = useShopActions();

  useEffect(() => {
    fetchProductsAndCategories();
  }, []);

  const {
    currentItems: paginatedProducts,
    currentPage,
    totalPages,
    goToPage,
  } = usePagination(state.filteredProducts, 8);

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
            products={paginatedProducts}
            categories={state.categories} 
            filterByCategory={filterByCategory} 
            loading={state.loading} 
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
          />

          <div className={styles.paginationControls}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index + 1)}
                className={`${styles.pageButton} ${currentPage === index + 1 ? styles.active : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </article>
      </main>
      <Footer/>
    </>
  );
}

export default withAuth(Home);
