'use client';

import { useContext } from 'react';
import CartContext from '@/app/contexts/CartContext';
import RemoveFromCartButton from '../RemoveFromCartButton';

export default function Cart() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('CartContext не найден');
  }

  const { cart } = cartContext;

  return (
    <div>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul className='cart-open-ul'>
          {cart.map((product) => (
            <li key={product.id}>
              <p>{product.title} - <b>{product.price} $</b></p>
              {/* Добавляем аргумент product.id в вызов функции */}
             
              <RemoveFromCartButton product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
