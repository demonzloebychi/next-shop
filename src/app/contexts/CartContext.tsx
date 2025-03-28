'use client';

import { createContext, useState, ReactNode, useEffect } from 'react';
import { IProducts } from "@/app/products/products.interface";

// Тип для значения контекста
interface CartContextValue {
  cart: IProducts[];
  handleAddToCart: (product: IProducts) => void;
  handleRemoveFromCart: (productId: number) => void;

}

// Создание контекста
const CART_KEY = 'cart';
const CartContext = createContext<CartContextValue | null>(null);

// Провайдер контекста
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<IProducts[]>([]);


  // Загрузка корзины из Local Storage при инициализации
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_KEY);
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Сохранение корзины в Local Storage при изменении
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);


  const handleAddToCart = (product: IProducts) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if(!existingProduct) {
    setCart([...cart, product]);
  } else {
    console.log('Товар уже добавлен');
  }
  };
  

  const handleRemoveFromCart = (productId: number) => {
    setCart(cart.filter((product) => Number(product.id) !== productId));
  };
  



  return (
    <CartContext.Provider value={{ cart, handleAddToCart, handleRemoveFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
