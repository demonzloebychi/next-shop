// CartContext.tsx
'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { IProducts } from "@/app/products/products.interface";

// Добавляем интерфейс для элемента корзины
interface CartItem {
  product: IProducts;
  quantity: number;
}

interface CartContextValue {
  cart: CartItem[];
  handleAddToCart: (product: IProducts) => void;
  handleRemoveFromCart: (productId: number) => void; // Изменяем тип на number
  handleIncreaseQuantity: (productId: number) => void; // Добавляем новую функцию

}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);


  // Логика добавления
const handleAddToCart = (product: IProducts) => {
  setCart(prev => {
    const existing = prev.find(item => item.product.id === product.id);
   
    
    return existing 
      ? prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      : [...prev, { product, quantity: 1 }];
  });
};

  // Логика удаления
  const handleRemoveFromCart = (productId: number) => {
    setCart(prev => 
      prev
        .map(item => 
          item.product.id === productId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };


  const handleIncreaseQuantity = (productId: number) => {
    setCart(prev => 
      prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };
  

  return (
    <CartContext.Provider value={{ cart, handleAddToCart, handleRemoveFromCart, handleIncreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
  
};

export default CartContext;
