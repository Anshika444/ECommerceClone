import React from 'react';
import { Search, Heart, ShoppingCart, User } from 'lucide-react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';





const featuredImage =
    'https://assets.myntassets.com/w_980,h_300,q_90,fl_progressive/assets/images/2023/10/6/e830cdb4-9c84-4f47-a58d-b08e3000c7b61696570834419-DK-HAMMER---Banner--1-.jpg';



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
// Group 2 products per slide
const groupedProducts: { id: number; name: string; price: string; image: string; }[][] = [];
for (let i = 0; i < featuredProducts.length; i += 4) {
    groupedProducts.push(featuredProducts.slice(i, i + 4));
}

const Home = () => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [searchQuery, setSearchQuery] = React.useState('');
    const filteredFeatureProducts = featuredProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredDummyProducts = dummyProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredProducts = [...filteredFeatureProducts, ...filteredDummyProducts];
    const navigate = useNavigate();
    const handleSearch = (e: { key: string }) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };


    return (
        <div className="container">
            <header className="navbar">
            <div className="logo"><a href="/" className='logo'>ShopVerse</a></div>
                <nav className="nav-links">
                    <a href="#">Men</a>
                    <a href="#">Women</a>
                    <a href="#">Kids</a>
                    <a href="#">Beauty</a>
                </nav>
                <div className="top-icons">
                    <User className="icon" onClick={() => navigate('/profile')} />
                    <Heart className="icon" onClick={() => navigate('/wishlist')} />
                    <ShoppingCart className="icon" onClick={() => navigate('/cart')} />
                </div>
            </header>

            <div className="search-bar">
                <div className="search-container">
                    <Search className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search for products, brands and more"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                </div>
            </div>

            <section className="featured">
                <img src={featuredImage} alt="Featured" />
            </section>

            <section className="carousel-section">
                <h2>🆕 New Arrivals</h2>

                <div className="carousel-wrapper">
                    <div className="carousel-inner" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {groupedProducts.map((group, index) => (
                            <div className="carousel-slide" key={index}>
                                {group.map((product) => (
                                    <Link to={`/product/${product.id}`} key={product.id} className="product-link">
                                        <div className="product-card">
                                            <img src={product.image} alt={product.name} />
                                            <div className="info">
                                                <h3>{product.name}</h3>
                                                <p>{product.price}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="carousel-dots">
                        {groupedProducts.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${currentSlide === index ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(index)}
                            />
                        ))}
                    </div>
                </div>
            </section>


            <section className="grid-section">
                <h2>Top Picks For You</h2>
                <div className="grid">
                    {dummyProducts.map((product) => (
                        <Link to={`/product/${product.id}`} key={product.id} className="product-link">
                            <div className="product-card">
                                <img src={product.image} alt={product.name} />
                                <div className="info">
                                    <h3>{product.name}</h3>
                                    <p>{product.price}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
