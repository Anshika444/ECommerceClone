import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase'; 

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity?: number;
  size?: string;
}

interface ShopContextType {
  cart: Product[];
  wishlist: Product[];
  addToCart: (product: Product) => void;
  addToWishlist: (product: Product) => void;
  moveToCart: (product: Product) => void;
  updateQuantity: (id: number, quantity: number) => void;
  currentUser: User | null;
}

// const auth = getAuth();
export const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userCarts, setUserCarts] = useState<{ [key: string]: Product[] }>({});
  const [userWishlists, setUserWishlists] = useState<{ [key: string]: Product[] }>({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Extract current user's cart and wishlist
  const userKey = currentUser?.uid || '';
  const cart = userCarts[userKey] || [];
  const wishlist = userWishlists[userKey] || [];

  const addToCart = (product: Product) => {
    if (!currentUser) return;
    const existing = userCarts[userKey] || [];
    const found = existing.find(p => p.id === product.id && p.size === product.size);

    if (found) {
      const updated = existing.map(item =>
        item.id === product.id && item.size === product.size
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      setUserCarts(prev => ({ ...prev, [userKey]: updated }));
    } else {
      const updated = [...existing, { ...product, quantity: 1 }];
      setUserCarts(prev => ({ ...prev, [userKey]: updated }));
    }

    toast.success("🛒 Added to cart");
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (!currentUser) return;
    const existing = userCarts[userKey] || [];
    const updated = quantity <= 0
      ? existing.filter(item => item.id !== id)
      : existing.map(item =>
          item.id === id ? { ...item, quantity } : item
        );

    setUserCarts(prev => ({ ...prev, [userKey]: updated }));
  };

  const addToWishlist = (product: Product) => {
    if (!currentUser) return;
    const existing = userWishlists[userKey] || [];
    const exists = existing.some(item => item.id === product.id && item.size === product.size);

    if (!exists) {
      const updated = [...existing, product];
      setUserWishlists(prev => ({ ...prev, [userKey]: updated }));
      toast.success("💖 Added to wishlist");
    }
  };

  const moveToCart = (product: Product) => {
    addToCart(product);

    // remove from wishlist
    const existing = userWishlists[userKey] || [];
    const updated = existing.filter(item => !(item.id === product.id && item.size === product.size));
    setUserWishlists(prev => ({ ...prev, [userKey]: updated }));
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        addToWishlist,
        moveToCart,
        updateQuantity,
        currentUser
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = (): ShopContextType => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
