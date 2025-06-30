import React, { useState } from 'react';
import { Heart } from 'lucide-react';

const allProducts = [
  {
    id: 1,
    name: 'Roadster Men Slim Fit T-Shirt',
    price: '₹499',
    image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/2225360/2020/1/30/f17959e0-02dd-47c2-94c0-bc9f8dfd1fbd1580390756551-Roadster-Men-Blue--Grey-Slim-Fit-Round-Neck-T-shirt-5371580-1.jpg',
    size:'S'
  },
  {
    id: 2,
    name: 'HIGHLANDER Men Checked Shirt',
    price: '₹799',
    image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/11720898/2020/4/17/18c32876-dba2-4484-8051-0e582d6db3f21587117514467-HIGHLANDER-Men-Shirts-3651587117512434-1.jpg',
  },
  {
    id: 3,
    name: 'WROGN Printed Crew T-Shirt',
    price: '₹699',
    image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/11495656/2020/7/21/bba745be-2a79-4e30-8ec7-10dcd158e1d91595327955508-WROGN-Men-Printed-Round-Neck-T-shirt-3891595327953397-1.jpg',
  },
  {
    id: 4,
    name: 'H&M Regular Fit Hoodie',
    price: '₹1,499',
    image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/15078376/2021/8/3/f648e4e4-5fe8-4050-a193-e9878ae7e87f1627980542047-HM-Men-Sweatshirts-2461627980541441-1.jpg',
  },
  {
    id: 5,
    name: 'ADIDAS Running Shoes',
    price: '₹3,299',
    image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/16749496/2022/1/24/b639f5c7-e073-4d15-8b29-3699055e8e8d1643029831941-ADIDAS-Men-Running-Shoes-6461643029831464-1.jpg',
  },
  {
    id: 6,
    name: 'U.S. Polo Solid Polo T-Shirt',
    price: '₹999',
    image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/12422536/2020/10/7/6de23300-8d6b-4e20-976b-8f6c3ff160ad1602066587967USPoloAssnMenRedSolidPoloCollarT-shirt1.jpg',
  },
  {
    id: 7,
    name: 'HRX Track Jacket',
    price: '₹1,799',
    image: 'https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/10949090/2020/2/5/3fd2be16-7a82-4d15-8fd2-f8fd4e59f1191580892275131-HRX-by-Hrithik-Roshan-Men-Track-Suits-1661580892273428-1.jpg',
  },
];

const featuredProducts = allProducts.slice(0, 4); // Show first 4 as featured

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showProducts = searchQuery.trim() ? filteredProducts : featuredProducts;

  return (
    <div className="bg-gray-100 min-h-screen px-8 py-10">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">🛍️ Search Products</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search for tshirt, shoes, hoodie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {showProducts.length > 0 ? (
          showProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 group relative"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-72 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h2 className="text-md font-medium text-gray-900 group-hover:underline">{item.name}</h2>
                <p className="text-lg font-bold text-pink-600">{item.price}</p>
              </div>
              <Heart className="absolute top-3 right-3 w-5 h-5 text-gray-600 hover:text-pink-500 cursor-pointer" />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No matching products 😕</p>
        )}
      </div>
    </div>
  );
};

export default Products;
