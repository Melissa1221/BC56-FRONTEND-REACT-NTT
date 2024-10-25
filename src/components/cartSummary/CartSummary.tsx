import { useShop, useShopActions } from '../../shared/context/ShopContext';
import styles from './CartSummary.module.css';

const calculateItemTotal = (price: number, quantity: number): string => {
  return (price * quantity).toFixed(2);
};

const formatTotalPrice = (totalPrice: number): string => {
  return `S/. ${totalPrice.toFixed(2)}`;
};

const CartSummary = () => {
  const { state } = useShop();
  const { handleRemoveFromCart, handleUpdateCartItemQuantity } = useShopActions();

  return (
    <div className={styles.cartSummary}>
      <div className={styles.header}>
        <h2 className={styles.title}>Resumen del Carrito</h2>
      </div>
      <div className={styles.content}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {state.cartItems.map((item) => (
              <tr key={item.id} className={styles.item}>
                <td className={styles.productImage}>
                  <img src={item.images[0]} alt={item.title} className={styles.image} />
                </td>
                <td className={styles.productName}>
                  <p>{item.title}</p>
                </td>
                <td className={styles.productQuantity}>
                  <input 
                    type="number" 
                    className={styles.quantityInput} 
                    value={item.quantity} 
                    min={1} 
                    onChange={(e) => handleUpdateCartItemQuantity(item.id, parseInt(e.target.value))}
                  />
                </td>
                <td className={styles.productPrice}>
                  <p>S/. {calculateItemTotal(item.price, item.quantity)}</p>
                </td>
                <td className={styles.productActions}>
                  <button 
                    className={styles.deleteButton}
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.total}>
          <p className={styles.totalText}>
            Total a pagar: <span className={styles.totalAmount}>{formatTotalPrice(state.totalPrice)}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartSummary;
