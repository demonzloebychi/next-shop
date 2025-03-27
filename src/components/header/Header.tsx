'use client'
import React from 'react';
import header from '@/components/header/Header.module.css'

const Header = () => {

    const MENU = [
        {
            name: 'Главная',
            url: '/',
        },
        {
            name: 'Каталог',
            url: '/products',
        },
        {
            name: 'Корзина',
            url: '/cart'
        }
    ]


    return (
        <header>
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
                </ul>
            </nav>
        </header>
    );
}

export default Header;
