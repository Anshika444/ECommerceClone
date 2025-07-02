import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import './Cart.css';

const Cart = () => {
  const { cart, updateQuantity } = useShop(); // assume `updateQuantity` is available
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggleSelection = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const totalPrice = cart
    .filter(item => selectedItems.includes(item.id))
    .reduce((acc, item) => acc + (parseInt(item.price.replace('₹', '')) * (item.quantity || 1)), 0);

  return (
    <div className="cart-container">
      <h2 className="cart-header">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleSelection(item.id)}
              />
              <img src={item.image} alt={item.name} />
              <div className="cart-info">
                <h4>{item.name}</h4>
                <p>{item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}>-</button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}>+</button>
                </div>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: ₹{totalPrice}</h3>
            <button disabled={selectedItems.length === 0}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
