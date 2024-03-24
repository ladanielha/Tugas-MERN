import React, { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("lastcart", JSON.stringify(cart));
    calculateTotalPrice();
    calculateTotalItems();
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: quantity }]);
    }
  };

  const decreaseFromCart = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart.filter((item) => item.quantity > 0));
  };

  const removeItemsFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const calculateTotalItems = () => {
    let totalItemsCount = 0;
    cart.forEach((item) => {
      totalItemsCount += item.quantity;
    });
    setTotalItems(totalItemsCount);
  };

  const calculateTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  };

  const clearCart = () => {
    setCart([]);
    setTotalPrice(0);
    setTotalItems(0);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, decreaseFromCart, totalPrice, clearCart, totalItems, removeItemsFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
