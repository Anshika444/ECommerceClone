import React from 'react';
import { useShop } from '../context/ShopContext';
import { Product } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import './Cart.css'; // Optional: for styling

const Cart = () => {
  const { cart } = useShop();

  const total = cart.reduce((acc, item) => {
    const price = parseInt(item.price.replace('₹', ''));
    const quantity = item.quantity || 1;
    return acc + price * quantity;
  }, 0);
  
  console.log(cart);
  console.log(1);

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart 🛒</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/">← Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item: Product) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-info">
                  <h4>{item.name}</h4>
                  <p>{item.price}</p>
                  <p><strong>Quantity:</strong> {item.quantity || 1}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ₹{total}</h3>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
