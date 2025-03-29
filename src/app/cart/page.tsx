// 'use client'
import Cart from '@/components/cart/Cart';
import React from 'react';


export const metadata: object = {
    title: 'Корзина',
    description: 'Все ваши товары',
    openGraph: {
        title: 'Корзина',
        description: 'Все ваши товары',
    }
}

const Page = () => {
    return (
        <div>
            <Cart />
        </div>
    );
}

export default Page;
