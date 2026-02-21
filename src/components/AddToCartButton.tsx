'use client';

// import {useState, useContext} from 'react';
import {IProducts} from '@/shared/interfaces/products.interface';

import {useCartStore} from '@/store/useCartStore';
import CartActions from './CartActions/CartActions';




export default function AddToCartButton({product}: {product: IProducts}) {

    const cart = useCartStore((state) => state.cart);
    const addToCart = useCartStore((state) => state.addToCart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const increaseQuantity = useCartStore((state) => state.increaseQuantity);

    const cartItem = cart.find((item) => item.product.id === product.id)


    const handleAddToCart = () => {
        addToCart(product);
    };

    if (cartItem) {
      return (
        <CartActions
          item={cartItem}
          removeFromCart={removeFromCart}
          increaseQuantity={increaseQuantity}
        />
      )
    }

    return (
        <>
          <button className="card-button" onClick={handleAddToCart}>
            В корзину
          </button>

            
        </>
    );
}
