import React, { createContext, useState, ReactNode, useContext } from 'react';

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity?:number;
  size?: string;
}

interface ShopContextType {
  cart: Product[];
  wishlist: Product[];
  addToCart: (product: Product) => void;
  addToWishlist: (product: Product) => void;
  moveToCart: (product: Product) => void;
}

export const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // const addToCart = (product: Product) => {
  //   if (!cart.some(item => item.id === product.id)) {
  //     setCart([...cart, product]);
  //   }
  // };
  // const addToCart = (product: Product) => {
  //   const existingProduct = cart.find(item => item.id === product.id);
  
  //   if (existingProduct) {
  //     const updatedCart = cart.map(item =>
  //       item.id === product.id
  //         ? { ...item, quantity: (item.quantity || 1) + 1 }
  //         : item
  //     );
  //     setCart(updatedCart);
  //   } else {
  //     setCart([...cart, { ...product, quantity: 1 }]);
  //   }
  // };
  const addToCart = (product: Product) => {
    const existingProduct = cart.find(item =>
      item.id === product.id && item.size === product.size
    );
  
    if (existingProduct) {
      const updatedCart = cart.map(item =>
        item.id === product.id && item.size === product.size
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  
  
  console.log(cart);

  // const addToWishlist = (product: Product) => {
  //   if (!wishlist.some(item => item.id === product.id)) {
  //     setWishlist([...wishlist, product]);
  //   }
  // };
  const addToWishlist = (product: Product) => {
    const exists = wishlist.some(item => item.id === product.id && item.size === product.size);
  
    if (!exists) {
      setWishlist(prev => [...prev, product]);
    }
  };
  
  

  // const moveToCart = (product: Product) => {
  //   setWishlist(wishlist.filter(item => item.id !== product.id));
  //   addToCart(product);
  // };
 const moveToCart = (product: Product) => {
  // First, add to cart
  addToCart(product);

  // Then, remove the exact same product (with size) from wishlist
  setWishlist(prev =>
    prev.filter(item => !(item.id === product.id && item.size === product.size))
  );
};

  

  return (
    <ShopContext.Provider value={{ cart, wishlist, addToCart, addToWishlist, moveToCart }}>
      {children}
    </ShopContext.Provider>
  );
};

// Helper to use context safely
export const useShop = (): ShopContextType => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};
