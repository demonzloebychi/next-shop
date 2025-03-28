'use client';

// import { Product } from '@/types/cart';
import { useState, useContext } from "react";
import { IProducts } from "@/app/products/products.interface";
import CartContext from '@/app/contexts/CartContext';

export default function AddToCartButton({ product }: { product: IProducts }) {
  const cartContext = useContext(CartContext);
  // const [cart, setCart] = useState<IProducts[]>([]);

   // Функция добавления товара в корзину
   if (!cartContext) {
    throw new Error('CartContext не найден');
  }
  const { handleAddToCart } = cartContext;

  return (
    <button
        className="card-button"
        onClick={() => handleAddToCart(product)}
    >
      В корзину
    </button>
  );
}
