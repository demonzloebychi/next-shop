'use client'
import React, { useState } from 'react';
import header from '@/components/header/Header.module.css'
import Cart from '../cart/Cart';
import { useContext } from 'react';
import CartContext from '@/app/contexts/CartContext';

const Header = () => {
    const [IsCartOpen, setIsCartOpen] = useState(false)

    const [isOpenMenu, setIsOpenMenu] = useState(false)

    const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('CartContext не найден');
  }

  const { getTotalQuantity } = cartContext;

    const MENU = [
        {
            name: 'Главная',
            url: '/',
        },
        {
            name: 'Каталог',
            url: '/category',
        },
        {
            name: 'Все товары',
            url: '/products',
        },
        // {
        //     name: 'Корзина',
        //     url: '/cart'
        // }
    ]


    return (
        <header className={header.header}>
            <nav className={header.nav}>
                <button
                    className={`${header.burgerButton} ${isOpenMenu ? `${header.active}` : ''}`}
                    onClick={()=> setIsOpenMenu(!isOpenMenu)}
                >
                    <span/><span/><span/>
                </button>
                <ul 
                    // className={header.headerList}
                    className={`${header.headerList} ${isOpenMenu ? `${header.active}` : ''}`}
                >
                    {
                        MENU.map( item => 
                            <li key={item.url} className={header.headerItem}>
                                <a href={item.url}>
                                    {item.name}
                                </a>
                                
                            </li>
                        )
                    }
                    
                    {/* <li>
                        <button 
                            className={`cart ${IsCartOpen ? 'active' : ''}`}
                            onClick={() => setIsCartOpen(!IsCartOpen)}
                            
                        >
                            Корзина
                        </button>
                        <div className={`cart-open ${IsCartOpen ? 'active' : ''}`}>
                            <Cart />
                        </div>
                    </li> */}
                </ul>
                <a className={header.cartLink} href='/cart'>
                        <p>Корзина</p>
                        <div className={header.quantity}>
                         {getTotalQuantity()}
                        </div>
                         
                    </a>
            </nav>
            
            {/* <div>
                {IsCartOpen && (
                    <div className='cart-opened'>

                    </div>
                )}
            </div> */}
            
        </header>
    );
}

export default Header;
