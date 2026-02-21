'use client';

import { CartItem as CartItemType } from "@/shared/interfaces/cart.interface";

interface Props {
  item: CartItemType;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
}


export default function CartActions({  item, removeFromCart, increaseQuantity }: Props) {

    return (
          <div className="cart-actions">
          <button className="remove-product" onClick={() => removeFromCart(item.product.id)}>-</button>
           <p>{item.quantity}</p>
          <button className="increase-product" onClick={() => increaseQuantity(item.product.id)}>+</button>
        </div>
    )
}