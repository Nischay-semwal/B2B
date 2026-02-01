import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (stock) => {
    setCartItems((prev) => {
      const existing = prev.find(i => i.stockId === stock._id);

      if (existing) {
        return prev.map(i =>
          i.stockId === stock._id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [
        ...prev,
        {
          stockId: stock._id,
          name: stock.productName,
          price: stock.pricePerUnit,
          quantity: 1
        }
      ];
    });
  };

  const updateQuantity = (stockId, quantity) => {
  setCartItems(prev =>
    prev.map(item =>
      item.stockId === stockId
        ? { ...item, quantity }
        : item
    )
  );
  };
  
  const totalAmount = cartItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
    );


  const removeFromCart = (stockId) => {
    setCartItems(prev => prev.filter(i => i.stockId !== stockId));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        totalAmount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
