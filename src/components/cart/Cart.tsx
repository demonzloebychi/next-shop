'use client';

import { useContext } from 'react';
import CartContext from '@/app/contexts/CartContext';
// import RemoveFromCartButton from '../RemoveFromCartButton';

export default function Cart() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('CartContext не найден');
  }

  const { cart, handleRemoveFromCart,  handleIncreaseQuantity, getTotalSum, handleClearCart  } = cartContext;

  return (
    <div>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <div>
          <ul className='cart-open-ul'>
            {cart.map((item) => (
              <li key={item.product.id}>
                <div className="cart-left">
                  <p>
                    {item.product.title}
                  </p>
                  <p>Цена: <b>{item.product.price * item.quantity} $</b></p>
                </div>
                <div className="cart-right">
                  <p>Кол-во: {item.quantity}</p>
                  <div className="cart-actions">
                    <button
                      className='remove-product'
                      onClick={() => handleRemoveFromCart(item.product.id)}
                    >
                      -
                    </button>
                    <button 
                      className='increase-product' 
                      onClick={() => handleIncreaseQuantity(item.product.id)}
                    >
                      +
                    </button>
                  </div>
                  
                </div>
                
                
              </li>
            ))}
          </ul>
          <p className='text-3xl my-5'>Полная стоимость: {getTotalSum()} $</p>
          <button
            onClick={handleClearCart}
            className='clear-cart-button mt-5  mb-[70px]'
          >
            Очистить корзину
          </button>



        </div>
        

      )}
    </div>
  );
}

