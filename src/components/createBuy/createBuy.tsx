'use client'
import React, { useState } from 'react';
import header from '@/components/header/Header.module.css'
import Cart from '../cart/Cart';
import { useContext } from 'react';
import CartContext from '@/app/contexts/CartContext';

const createBuy = () => {



    return (
        <>
            <button>Заказать</button>
        </>
    );
}

export default createBuy;
