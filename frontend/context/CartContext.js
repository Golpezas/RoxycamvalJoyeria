// frontend/context/CartContext.js → 100% SIN ERRORES (SSR SAFE)
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    return {
      cartItems: [],
      totalItems: 0,
      totalPrice: 0,
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {}
    };
  }
  return context;
};

const CART_STORAGE_KEY = 'roxy_cart_2025';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // Siempre inicia como array vacío

  // Cargar desde localStorage solo en el cliente
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Aseguramos que sea array
        setCartItems(Array.isArray(parsed) ? parsed : []);
      }
    } catch (e) {
      console.error("Error cargando carrito", e);
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  // Guardar cada vez que cambie
  useEffect(() => {
    if (typeof window !== 'undefined' && cartItems.length > 0) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }
    if (cartItems.length === 0) {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, [cartItems]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems(prev => {
      if (!Array.isArray(prev)) prev = [];
      const exists = prev.find(i => i.product.ID_SKU === product.ID_SKU);
      if (exists) {
        return prev.map(i =>
          i.product.ID_SKU === product.ID_SKU
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((sku) => {
    setCartItems(prev => (Array.isArray(prev) ? prev : []).filter(i => i.product.ID_SKU !== sku));
  }, []);

  const updateQuantity = useCallback((sku, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev => {
      if (!Array.isArray(prev)) return [];
      return prev.map(i =>
        i.product.ID_SKU === sku ? { ...i, quantity } : i
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // CÁLCULO SEGURO: siempre verifica que sea array
  const totalItems = Array.isArray(cartItems)
    ? cartItems.reduce((sum, i) => sum + (i.quantity || 0), 0)
    : 0;

  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce((sum, i) => 
        sum + (Number(i.product?.Precio_MXN || 0) * (i.quantity || 0)), 0
      )
    : 0;

  const value = {
    cartItems: cartItems || [],
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};