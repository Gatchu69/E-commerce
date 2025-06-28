import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product, selectedSize = "M") => {
    setCartItems((prevItems) => {
      const existing = prevItems.find(
        (item) => item.id === product.id && item.size === selectedSize
      );

      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id && item.size === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prevItems,
        {
          ...product,
          quantity: 1,
          size: selectedSize,
        },
      ];
    });
  };
  const increaseQty = (productId, size) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (productId, size) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        cartOpen,
        setCartOpen,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
