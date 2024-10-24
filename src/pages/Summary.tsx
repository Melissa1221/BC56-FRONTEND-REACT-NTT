import { useEffect, useRef } from 'react';
import Header from '../components/Header';
import CartSummary from '../components/CartSummary';
import ShipmentForm from '../components/ShipmentForm';
import Footer from '../components/Footer';
import { useShop, useShopActions } from '../shared/context/ShopContext';

const Summary = () => {
  const { state } = useShop();
  const { filterBySearchTerm } = useShopActions();
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
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
        <div ref={topRef}></div>
        <article>
          <CartSummary/>
          <ShipmentForm/>
        </article>
      </main>
      <Footer />
    </>
  );
}

export default Summary;
