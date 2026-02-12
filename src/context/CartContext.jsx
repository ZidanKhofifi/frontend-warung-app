import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 1. Fungsi Tambah ke Keranjang
  const addToCart = (product) => {
    setCartItems((prev) => {
      const isExist = prev.find((item) => item._id === product._id);
      
      if (isExist) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // 2. Fungsi Update Quantity (Tambah/Kurang Jumlah)
  const updateQty = (id, amount) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item._id === id) {
          const newQty = item.qty + amount;
          return { ...item, qty: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  // 3. Fungsi Hapus Satu Item
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  // 4. Fungsi Bersihkan Keranjang
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    // Semua fungsi sekarang didefinisikan di level ini dan bisa dibagikan
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
