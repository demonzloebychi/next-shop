'use client';

import { IProducts } from "@/shared/interfaces/products.interface";
import { useCartStore } from "@/store/useCartStore";

export default function RemoveFromCartButton({ product }: { product: IProducts }) {
  const removeFromCart = useCartStore(state => state.removeFromCart);

  return (
    <button 
      className='remove-product' 
      onClick={() => removeFromCart(product.id)}
    >
      -
    </button>
  );
}