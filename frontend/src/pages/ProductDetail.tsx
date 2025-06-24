import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import Home from './Home';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';


const featuredProducts = [
    {
        id: 7,
        name: 'HRX Shows',
        price: '₹1999',
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/14810446/2021/10/18/5d761e6f-c9a1-4e31-a504-1dfd683f4ac81634550533717-HRX-by-Hrithik-Roshan-Men-Running-Shoes-9641634550533257-1.jpg',
    },
    {
        id: 8,
        name: 'WROGN Blue Tee',
        price: '₹799',
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/13881410/2022/4/25/06ab2234-030c-4d67-92c7-4c6e8f6f2a981650881864344-WROGN-Men-Black-Printed-Round-Neck-Pure-Cotton-T-shirt-18016-1.jpg',
    },
    {
        id: 9,
        name: 'Nike White Sneakers',
        price: '₹4499',
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
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/14810446/2021/10/18/5d761e6f-c9a1-4e31-a504-1dfd683f4ac81634550533717-HRX-by-Hrithik-Roshan-Men-Running-Shoes-9641634550533257-1.jpg',
    },
    {
        id: 12,
        name: 'WROGN Black Tee',
        price: '₹799',
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/13881410/2022/4/25/06ab2234-030c-4d67-92c7-4c6e8f6f2a981650881864344-WROGN-Men-Black-Printed-Round-Neck-Pure-Cotton-T-shirt-18016-1.jpg',
    },
    {
        id: 13,
        name: 'Nike White Sneakers',
        price: '₹4499',
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/16478912/2022/1/7/e6ad01a0-9e88-41d7-b5d3-34d04fc3ac0c1641530241926NikeCourtVisionNextNatureMenWhiteSneakers1.jpg',
    },
    {
        id: 14,
        name: 'H&M Oversized Hoodie',
        price: '₹1599',
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/21948630/2023/2/28/2fc3d74f-1c11-41ef-bef0-e21c1dc5d4ff1677561259474Oversizedhoodie1.jpg',
    },
];

const dummyProducts = [
    {
        id: 1,
        name: 'Nike White & Blue Sneakers',
        price: '₹4499',
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/16478912/2022/1/7/e6ad01a0-9e88-41d7-b5d3-34d04fc3ac0c1641530241926NikeCourtVisionNextNatureMenWhiteSneakers1.jpg',
    },
    {
        id: 2,
        name: 'H&M Oversized Hoodie',
        price: '₹1599',
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/21948630/2023/2/28/2fc3d74f-1c11-41ef-bef0-e21c1dc5d4ff1677561259474Oversizedhoodie1.jpg',
    },
    {
        id: 3,
        name: 'Nike White Sneakers',
        price: '₹4499',
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/16478912/2022/1/7/e6ad01a0-9e88-41d7-b5d3-34d04fc3ac0c1641530241926NikeCourtVisionNextNatureMenWhiteSneakers1.jpg',
    },
    {
        id: 4,
        name: 'H&M Oversized Hoodie',
        price: '₹1599',
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/21948630/2023/2/28/2fc3d74f-1c11-41ef-bef0-e21c1dc5d4ff1677561259474Oversizedhoodie1.jpg',
    },
    {
        id: 5,
        name: 'Nike White Sneakers',
        price: '₹4499',
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/16478912/2022/1/7/e6ad01a0-9e88-41d7-b5d3-34d04fc3ac0c1641530241926NikeCourtVisionNextNatureMenWhiteSneakers1.jpg',
    },
    {
        id: 6,
        name: 'H&M Royal Blue Oversized Hoodie',
        price: '₹1599',
        image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/21948630/2023/2/28/2fc3d74f-1c11-41ef-bef0-e21c1dc5d4ff1677561259474Oversizedhoodie1.jpg',
    },
];

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const productId = parseInt(id ?? '');
    const { addToCart, addToWishlist } = useShop();
 
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
        <div className="detail-page">
            <div className="product-detail-card">
                <img src={product.image} alt={product.name} />
                <div className="details">
                    <h1>{product.name}</h1>
                    <p className="price">{product.price}</p>
                    <p className="desc">
                        This is a high-quality product designed for everyday use. Stylish, durable, and comfortable.
                    </p>
                    <button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>
                    <button className="btn-outline" onClick={() => addToWishlist(product)}>Add to Wishlist</button>
                    {/* <button ><Link to="/cart">Cart</Link></button>
                    <button ><Link to="/wishlist">Wishlist</Link></button> */}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
