// CartContext.tsx
'use client';

import { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
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
  getTotalQuantity: () => number; // Добавляем функцию для общего количества
  getTotalSum: () => number; // Добавляем функцию для общей суммы
  handleClearCart : () => void
}

const CART_KEY = 'cart';
const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);


    // Загрузка из localStorage при монтировании
    useEffect(() => {
      const savedCart = localStorage.getItem(CART_KEY);
      if (savedCart) setCart(JSON.parse(savedCart));
    }, []);
  
    // Сохранение в localStorage при изменении
    useEffect(() => {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }, [cart]);


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

  
  const getTotalQuantity = useCallback(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);
  

  const getTotalSum = useCallback(() => {
    const totalSum = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    // const totalSumRound = Math.round(totalSum)
    const totalSumRound = totalSum

    return totalSumRound;
  }, [cart]);


  const handleClearCart = useCallback(() => {
    setCart([]);
  }, []);

  return (
    <CartContext.Provider value={{ cart, handleAddToCart, handleRemoveFromCart, handleIncreaseQuantity, getTotalQuantity, getTotalSum, handleClearCart  }}>
      {children}
    </CartContext.Provider>
  );
  
};

export default CartContext;
