'use client'
import React, { useState } from 'react';
import header from '@/components/Header/Header.module.css'
import Cart from '../Сart/Cart';
// import { useContext } from 'react';
// import CartContext from '@/app/contexts/CartContext';

import { useCartStore } from "@/store/useCartStore";



const Header = () => {
    const [IsCartOpen, setIsCartOpen] = useState(false)

    const [isOpenMenu, setIsOpenMenu] = useState(false)

//     const cartContext = useContext(CartContext);

//   if (!cartContext) {
//     throw new Error('CartContext не найден');
//   }

//   const { getTotalQuantity } = cartContext;


// const totalQuantity = useCartStore(state => state.getTotalQuantity());


const totalQuantity = useCartStore(state =>
  state.cart.reduce((acc, item) => acc + item.quantity, 0)
);

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
        //     name: 'Пользователь',
        //     url: 'register',
        // },
        // {
        //     name: 'Войти',
        //     url: 'login',
        // },
        // {
        //     name: 'dashboard',
        //     url: 'dashboard',
        // },

        // {
        //     name: 'Корзина',
        //     url: '/cart'
        // }
    ]


    return (
        <header className={header.header}>
            <nav className={header.nav}>
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
                    <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000000"
                                version="1.1"
                                id="Capa_1"
                                width="30px"
                                height="30px"
                                viewBox="0 0 902.86 902.86"
                                xmlSpace="preserve"
                                >
                                <g>
                                    <g>
                                    <path d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z     M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z" />
                                    <path d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717    c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744    c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742    C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744    c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z     M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742    S619.162,694.432,619.162,716.897z" />
                                    </g>
                                </g>
                            </svg>
                            

                        
                        <div className={header.quantity}>
                         {totalQuantity}
                        </div>
                         
                    </a>

                <button
                    className={`${header.burgerButton} ${isOpenMenu ? `${header.active}` : ''}`}
                    onClick={()=> setIsOpenMenu(!isOpenMenu)}
                >
                    <span/><span/><span/>
                </button>
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
