import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'verdant_cart_items';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const showNotification = (message, item = null) => {
    setNotification({ message, item });
    setTimeout(() => {
      setNotification(null);
    }, 3200);
  };

  const addToCart = (product, quantity = 1, variant = null) => {
    setCart(prevCart => {
      const itemKey = variant ? `${product.id}-${variant}` : `${product.id}`;
      const existingIndex = prevCart.findIndex(item => item.itemKey === itemKey);

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            ...product,
            itemKey,
            selectedVariant: variant,
            quantity: Math.max(1, quantity)
          }
        ];
      }
    });

    showNotification(`Added "${product.title}" to your cart`, product);
  };

  const removeFromCart = (itemKey) => {
    setCart(prevCart => prevCart.filter(item => item.itemKey !== itemKey));
  };

  const updateQuantity = (itemKey, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemKey);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.itemKey === itemKey ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  // Calculations
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeShippingThreshold = 150;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shipping = cart.length === 0 ? 0 : (isFreeShipping ? 0 : 12.00);
  const tax = subtotal * 0.08; // 8% estimated tax
  const total = subtotal + shipping + tax;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        totalItems,
        subtotal,
        shipping,
        tax,
        total,
        freeShippingThreshold,
        isFreeShipping,
        freeShippingProgress,
        notification
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
