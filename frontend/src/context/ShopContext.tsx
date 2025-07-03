import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase'; 
import { db } from '../firebase';
import { collection, doc, setDoc, getDocs, query, where,getDoc, updateDoc } from 'firebase/firestore';

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

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setCurrentUser(user);
  //   });
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
  
      if (user) {
        const cartRef = doc(db, 'carts', user.uid);
        const cartSnap = await getDoc(cartRef);
  
        if (cartSnap.exists()) {
          const data = cartSnap.data();
          setUserCarts(prev => ({ ...prev, [user.uid]: data.items || [] }));
        } else {
          await setDoc(cartRef, { items: [] });
          setUserCarts(prev => ({ ...prev, [user.uid]: [] }));
        }
      }
    });
  
    return () => unsubscribe();
  }, []);
  // Extract current user's cart and wishlist
  const userKey = currentUser?.uid || '';
  const cart = userCarts[userKey] || [];
  const wishlist = userWishlists[userKey] || [];

  const addToCart = async (product: Product) => {
    if (!currentUser) return;
  
    const cartRef = doc(db, "carts", currentUser.uid);
    const cartSnap = await getDoc(cartRef);
    let cartItems: Product[] = cartSnap.exists() ? cartSnap.data().items : [];
  
    const existingIndex = cartItems.findIndex(
      item => item.id === product.id && item.size === product.size
    );
  
    if (existingIndex > -1) {
      cartItems[existingIndex].quantity = (cartItems[existingIndex].quantity || 1) + 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
  
    await setDoc(cartRef, { items: cartItems });
    setUserCarts(prev => ({ ...prev, [userKey]: cartItems }));
    toast.success("🛒 Added to cart");
  };
  
  
  const updateQuantity = async (id: number, quantity: number, size?: string) => {
    if (!currentUser) return;
  
    const existing = userCarts[userKey] || [];
  
    // Correctly identify the product by id AND size
    const updatedCart =
      quantity <= 0
        ? existing.filter(item => !(item.id === id && item.size === size))
        : existing.map(item =>
            item.id === id && item.size === size ? { ...item, quantity } : item
          );
  
    setUserCarts(prev => ({ ...prev, [userKey]: updatedCart }));
  
    try {
      const cartRef = doc(db, 'carts', userKey);
      await setDoc(cartRef, { items: updatedCart });
      toast.success("🛒 Cart updated!");
    } catch (error) {
      console.error("❌ Error updating Firestore:", error);
      toast.error("Failed to update cart");
    }
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
