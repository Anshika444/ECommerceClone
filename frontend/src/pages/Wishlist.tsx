import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import './Wishlist.css';
import { Product } from '../context/ShopContext';
import SizeSelectorModal from '../components/SizeSelectorModal';

const Wishlist = () => {
    const { wishlist, moveToCart } = useShop();
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const handleAddClick = (product: Product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };
    const handleSizeSelect = (size: string) => {
        if (selectedProduct) {
            moveToCart({ ...selectedProduct, size });
            setShowModal(false);
            setSelectedProduct(null);
        }
    };

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
                        <p><strong>Size:</strong> {item.size}</p>
                        <button onClick={() => moveToCart(item)}>Add to Cart</button>
                        {showModal && (
                            <SizeSelectorModal
                                onSelectSize={handleSizeSelect}
                                onClose={() => {
                                    setShowModal(false);
                                    setSelectedProduct(null);
                                }}
                            />
                        )}
                        <Link to={`/product/${item.id}`}>View Details</Link>
                    </div>
                ))
            )}
        </div>
    );
};

export default Wishlist;
