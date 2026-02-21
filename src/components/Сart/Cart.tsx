'use client';
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import CartItem from "@/components/CartItem/CartItem";
import CartSummary from "@/components/CartSummary/CartSummary";
import OrderForm from "@/components/OrderForm/OrderForm";

export default function Cart() {
  const cart = useCartStore(state => state.cart);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const increaseQuantity = useCartStore(state => state.increaseQuantity);
  const clearCart = useCartStore(state => state.clearCart);

  const [isOrdering, setIsOrdering] = useState(false);

  const totalSum = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (cart.length === 0) return <p>Корзина пуста</p>;

  return (
    <div>
      <ul className="cart-open-ul">
        {cart.map(item => (
          <CartItem
            key={item.product.id}
            item={item}
            removeFromCart={removeFromCart}
            increaseQuantity={increaseQuantity}
          />
        ))}
      </ul>

      <CartSummary
        totalSum={totalSum}
        totalQuantity={cart.length}
        clearCart={clearCart}
        onOrder={() => setIsOrdering(true)}
      />

      {isOrdering && (
        <OrderForm
          cart={cart}
          totalSum={totalSum}
          clearCart={clearCart}
          onClose={() => setIsOrdering(false)}
        />
      )}
    </div>
  );
}