import React from 'react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist, moveToCart } = useShop();

  return (
    <div className="wishlist-page">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No items yet</p>
      ) : (
        wishlist.map(item => (
          <div key={item.id} className="wishlist-item">
            <img src={item.image} alt={item.name} />
            <h4>{item.name}</h4>
            <p>{item.price}</p>
            <button onClick={() => moveToCart(item)}>Move to Cart</button>
            <Link to={`/product/${item.id}`}>View Details</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
