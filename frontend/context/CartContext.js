// Archivo: EMJoyas/frontend/context/CartContext.js (Lógica completa del Carrito)

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// 1. Crea el Contexto
const CartContext = createContext();

// 2. Hook para usar el contexto (simplifica el acceso en otros componentes)
export const useCart = () => {
  // Aseguramos que useCart solo se llame dentro del CartProvider
  const context = useContext(CartContext);
  if (!context) {
    // Esto solo ocurre si alguien olvida envolver el componente con <CartProvider>
    return { cartItems: [], totalItems: 0, totalPrice: 0, addToCart: () => {}, removeFromCart: () => {}, updateQuantity: () => {} };
  }
  return context;
};

// Constante para el almacenamiento local (localStorage key)
const CART_STORAGE_KEY = 'emjoyas_cart';

// 3. Proveedor del Contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // --- LÓGICA DE CÁLCULO Y ALMACENAMIENTO ---

  // Función para calcular totales y guardar en localStorage
  const calculateTotals = useCallback((items) => {
    // Cálculo del número total de artículos
    const newTotalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    
    // Cálculo del precio total
    const newTotalPrice = items.reduce((sum, item) => sum + (item.product.Precio_MXN * item.quantity), 0);
    
    setTotalItems(newTotalItems);
    setTotalPrice(newTotalPrice);
    
    // Guardar en localStorage solo en el cliente (browser)
    if (typeof window !== 'undefined') {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, []);

  // Efecto para cargar el carrito desde localStorage al montar la aplicación
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        try {
          const parsedCart = JSON.parse(storedCart);
          setCartItems(parsedCart);
          calculateTotals(parsedCart);
        } catch (e) {
          console.error("Error parsing cart from localStorage:", e);
          setCartItems([]); // Si hay un error, inicializa vacío.
        }
      }
    }
  }, [calculateTotals]);

  // --- MÉTODOS DE MANIPULACIÓN DEL CARRITO ---

  // 1. Añadir/Actualizar un producto al carrito
  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.product.ID_SKU === product.ID_SKU);

      let updatedItems;
      if (existingItemIndex > -1) {
        // Si el producto existe, actualiza la cantidad
        updatedItems = prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Si es nuevo, añade el producto
        updatedItems = [...prevItems, { product, quantity }];
      }

      calculateTotals(updatedItems);
      return updatedItems;
    });
  }, [calculateTotals]);

  // 2. Remover completamente un producto (SKU)
  const removeFromCart = useCallback((sku) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.product.ID_SKU !== sku);
      calculateTotals(updatedItems);
      return updatedItems;
    });
  }, [calculateTotals]);

  // 3. Actualizar la cantidad (para usar en la vista del carrito)
  const updateQuantity = useCallback((sku, quantity) => {
    setCartItems(prevItems => {
      const newQuantity = Math.max(1, quantity); // La cantidad mínima es 1
      const updatedItems = prevItems.map(item =>
        item.product.ID_SKU === sku
          ? { ...item, quantity: newQuantity } 
          : item
      );
      calculateTotals(updatedItems);
      return updatedItems;
    });
  }, [calculateTotals]);
  
  // 4. Vaciar completamente el carrito
  const clearCart = useCallback(() => {
    setCartItems([]);
    calculateTotals([]);
  }, [calculateTotals]);

  const value = {
    cartItems,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};