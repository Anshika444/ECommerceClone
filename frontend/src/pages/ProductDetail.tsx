import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import Home from './Home';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { Product } from '../context/ShopContext'
import SizeSelectorModal from '../components/SizeSelectorModal';
import Cart from './Cart';


const featuredProducts = [
    {
        id: 7,
        name: 'HRX Shows',
        price: '₹1999',
        size: "S",
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/14810446/2021/10/18/5d761e6f-c9a1-4e31-a504-1dfd683f4ac81634550533717-HRX-by-Hrithik-Roshan-Men-Running-Shoes-9641634550533257-1.jpg',
    },
    {
        id: 8,
        name: 'WROGN Blue Tee',
        price: '₹799',
        size: "S",
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/13881410/2022/4/25/06ab2234-030c-4d67-92c7-4c6e8f6f2a981650881864344-WROGN-Men-Black-Printed-Round-Neck-Pure-Cotton-T-shirt-18016-1.jpg',
    },
    {
        id: 9,
        name: 'Nike White Sneakers',
        price: '₹4499',
        size: "S",
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/16478912/2022/1/7/e6ad01a0-9e88-41d7-b5d3-34d04fc3ac0c1641530241926NikeCourtVisionNextNatureMenWhiteSneakers1.jpg',
    },
    {
        id: 10,
        name: 'H&M Oversized Hoodie',
        price: '₹1599',
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/21948630/2023/2/28/2fc3d74f-1c11-41ef-bef0-e21c1dc5d4ff1677561259474Oversizedhoodie1.jpg',
    },
    {
        id: 11,
        name: 'HRX Running Shoes',
        price: '₹1999',
        size: "S",
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/14810446/2021/10/18/5d761e6f-c9a1-4e31-a504-1dfd683f4ac81634550533717-HRX-by-Hrithik-Roshan-Men-Running-Shoes-9641634550533257-1.jpg',
    },
    {
        id: 12,
        name: 'WROGN Black Tee',
        price: '₹799',
        size: "S",
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/13881410/2022/4/25/06ab2234-030c-4d67-92c7-4c6e8f6f2a981650881864344-WROGN-Men-Black-Printed-Round-Neck-Pure-Cotton-T-shirt-18016-1.jpg',
    },
    {
        id: 13,
        name: 'Nike White Sneakers',
        price: '₹4499',
        size: "S",
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/16478912/2022/1/7/e6ad01a0-9e88-41d7-b5d3-34d04fc3ac0c1641530241926NikeCourtVisionNextNatureMenWhiteSneakers1.jpg',
    },
    {
        id: 14,
        name: 'H&M Oversized Hoodie',
        price: '₹1599',
        size: "S",
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/21948630/2023/2/28/2fc3d74f-1c11-41ef-bef0-e21c1dc5d4ff1677561259474Oversizedhoodie1.jpg',
    },
];

const dummyProducts = [
    {
        id: 1,
        name: 'Nike White & Blue Sneakers',
        price: '₹4499',
        size: "S",
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/16478912/2022/1/7/e6ad01a0-9e88-41d7-b5d3-34d04fc3ac0c1641530241926NikeCourtVisionNextNatureMenWhiteSneakers1.jpg',
    },
    {
        id: 2,
        name: 'H&M Oversized Hoodie',
        price: '₹1599',
        size: "S",
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/21948630/2023/2/28/2fc3d74f-1c11-41ef-bef0-e21c1dc5d4ff1677561259474Oversizedhoodie1.jpg',
    },
    {
        id: 3,
        name: 'Nike White Sneakers',
        price: '₹4499',
        size: "S",
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/16478912/2022/1/7/e6ad01a0-9e88-41d7-b5d3-34d04fc3ac0c1641530241926NikeCourtVisionNextNatureMenWhiteSneakers1.jpg',
    },
    {
        id: 4,
        name: 'H&M Oversized Hoodie',
        price: '₹1599',
        size: "S",
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/21948630/2023/2/28/2fc3d74f-1c11-41ef-bef0-e21c1dc5d4ff1677561259474Oversizedhoodie1.jpg',
    },
    {
        id: 5,
        name: 'Nike White Sneakers',
        price: '₹4499',
        size: "S",
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/16478912/2022/1/7/e6ad01a0-9e88-41d7-b5d3-34d04fc3ac0c1641530241926NikeCourtVisionNextNatureMenWhiteSneakers1.jpg',
    },
    {
        id: 6,
        name: 'H&M Royal Blue Oversized Hoodie',
        price: '₹1599',
        size: "S",
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/21948630/2023/2/28/2fc3d74f-1c11-41ef-bef0-e21c1dc5d4ff1677561259474Oversizedhoodie1.jpg',
    },
];

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const productId = parseInt(id ?? '');
    const { addToCart, addToWishlist } = useShop();
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const availableSizes = ['S', 'M', 'L', 'XL'];
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size before adding to cart.');
            return;
        }
        if (!product) return <div>Product not found</div>;
        addToCart({ ...product, size: selectedSize });
    };
    const handleAddToWishlist = () => {
        if (!selectedSize) {
            alert('Please select a size before adding to wishlist.');
            return;
        }
        if (!product) return <div>Product not found</div>;

        addToWishlist({ ...product, size: selectedSize });
    };


    const handleSizeSelect = (size: string) => {
        if (selectedProduct) {
            addToCart({ ...selectedProduct, size });
            setShowModal(false);
            setSelectedProduct(null);
        }
    };

    const product =
        dummyProducts.find(p => p.id === productId) ||
        featuredProducts.find(p => p.id === productId);

    if (!product) {
        return (
            <div className="detail-page">
                <p>Product not found</p>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }
    //   if (!fProduct) {
    //     return (
    //       <div className="detail-page">
    //         <p>Product not found</p>
    //         <button onClick={() => navigate(-1)}>Go Back</button>
    //       </div>
    //     );
    //   }

    return (
        <div className="product-detail-page">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p className="price">{product.price}</p>

            <div className="size-selector">
                <h4>Select Size:</h4>
                <div className="size-buttons">
                    {availableSizes.map(size => (
                        <button
                            key={size}
                            className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
                {selectedSize && <p className="selected-text">Selected: {selectedSize}</p>}
            </div>

            <button className="cart-btn" onClick={handleAddToCart}>Add to Cart</button>
            <button className="wishlist-btn" onClick={handleAddToWishlist}>Add to Wishlist</button>
            <button onClick={() => navigate('/cart')}>
                Cart
            </button>
        </div>
    );
};

export default ProductDetail;
