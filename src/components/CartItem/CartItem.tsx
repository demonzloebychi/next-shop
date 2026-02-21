'use client';
import { CartItem as CartItemType } from "@/shared/interfaces/cart.interface";

interface Props {
  item: CartItemType;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
}

export default function CartItem({ item, removeFromCart, increaseQuantity }: Props) {
  return (
    <li>
      <div className="cart-left">
        <p>{item.product.title}</p>
        <p>Цена: <b>{item.product.price * item.quantity} $</b></p>
      </div>
      <div className="cart-right">
        <p>Кол-во: {item.quantity}</p>
        <div className="cart-actions">
          <button className="remove-product" onClick={() => removeFromCart(item.product.id)}>-</button>
          <button className="increase-product" onClick={() => increaseQuantity(item.product.id)}>+</button>
        </div>
      </div>
    </li>
  );
}