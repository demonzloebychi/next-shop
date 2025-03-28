'use client'
import React, { useState } from 'react';
import header from '@/components/header/Header.module.css'
import Cart from '../cart/Cart';

const Header = () => {
    const [IsCartOpen, setIsCartOpen] = useState(false)

    const MENU = [
        {
            name: 'Главная',
            url: '/',
        },
        {
            name: 'Каталог',
            url: '/products',
        },
        // {
        //     name: 'Корзина',
        //     url: '/cart'
        // }
    ]


    return (
        <header className={header.header}>
            <nav className="nav">
                <ul className={header.headerList}>
                    {
                        MENU.map( item => 
                            <li key={item.url} className={header.headerItem}>
                                <a href={item.url}>
                                    {item.name}
                                </a>
                                
                            </li>
                        )
                    }
                    <li>
                        <button 
                            className={`cart ${IsCartOpen ? 'active' : ''}`}
                            onClick={() => setIsCartOpen(!IsCartOpen)}
                            
                        >
                            Корзина
                        </button>
                        <div className={`cart-open ${IsCartOpen ? 'active' : ''}`}>
                            <Cart />
                        </div>
                    </li>
                </ul>
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
