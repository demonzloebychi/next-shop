'use client';

// import { Product } from '@/types/cart';
import { useState, useContext } from "react";
import { IProducts } from "@/app/products/products.interface";
import CartContext from '@/app/contexts/CartContext';

export default function RemoveFromCartButton({ product }: { product: IProducts }) {
  const cartContext = useContext(CartContext);

   if (!cartContext) {
    throw new Error('CartContext не найден');
  }
  const { handleRemoveFromCart } = cartContext;

  return (
    <button 
                className='remove-product' 
                onClick={() => handleRemoveFromCart(product.id)} // Исправлено здесь
              >
                -
              </button>
  );
}
