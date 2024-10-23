import { useShop, useShopActions } from '../context/ShopContext';

const CartSummary = () => {
  const { state } = useShop();
  const { handleRemoveFromCart, handleUpdateCartItemQuantity } = useShopActions();

  return (
    <div className="cart-summary">
      <div className="cart-summary__header">
        <h2 className="cart-summary__title">Resumen del Carrito</h2>
      </div>
      <div className="cart-summary__content">
        <table className="cart-summary__table">
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
              <tr key={item.id} className="cart-summary__item">
                <td className="cart-summary__product-image">
                  <img src={item.images[0]} alt={item.title} className="cart-summary__image" />
                </td>
                <td className="cart-summary__product-name">
                  <p>{item.title}</p>
                </td>
                <td className="cart-summary__product-quantity">
                  <input 
                    type="number" 
                    className="cart-summary__quantity-input" 
                    value={item.quantity} 
                    min={1} 
                    onChange={(e) => handleUpdateCartItemQuantity(item.id, parseInt(e.target.value))}
                  />
                </td>
                <td className="cart-summary__product-price">
                  <p>S/. {(item.price * item.quantity).toFixed(2)}</p>
                </td>
                <td className="cart-summary__product-actions">
                  <button 
                    className="cart-summary__delete-button"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="cart-summary__total">
          <p className="cart-summary__total-text">
            Total a pagar: <span className="cart-summary__total-amount">S/. {state.totalPrice.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartSummary
