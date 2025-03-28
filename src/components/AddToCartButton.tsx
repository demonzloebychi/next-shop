'use client';

// import { Product } from '@/types/cart';
import { useState, useContext } from "react";
import { IProducts } from "@/app/products/products.interface";
import CartContext from '@/app/contexts/CartContext';

export default function AddToCartButton({ product }: { product: IProducts }) {
  const cartContext = useContext(CartContext);

   // Функция добавления товара в корзину
   if (!cartContext) {
    throw new Error('CartContext не найден');
  }

  const { cart } = cartContext;

  const isProductInCart = cart.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    cartContext.handleAddToCart(product);
  };


  // const { handleAddToCart } = cartContext;

  return (
    <button
        // className="card-button"
        // onClick={() => handleAddToCart(product)}
        className={`card-button ${isProductInCart ? 'added': ''}`}
        onClick={handleAddToCart}
        disabled={isProductInCart} // Отключаем кнопку, если товар уже в корзине
      >
        {isProductInCart ? 'В корзине' : 'В корзину'}
    </button>
  );
}
