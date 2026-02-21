import React from 'react';
import Image from 'next/image';
import { GetProductsResponse } from '@/shared/interfaces/products.interface'
import ProductCard from '@/components/Product';
import { use } from "react";
import { fetchProducts } from '@/app/api/fetchProductsByCategory';


export const metadata: object = {
    title: 'Каталог',
    description: 'Каталог товаров категории',
    openGraph: {
        title: 'Каталог',
        description: 'Каталог товаров категории',
    }
}


export const revalidate = 3600;


const Page = async ({params}: {params: Promise<{ category: string }>}) => {
    const { category } = await params;


    const data = await fetchProducts(category)
    // console.log(data)
    

    return (
        <div>
            <h1>Каталог</h1>


            <ul className='cards'>
                {
                    data?.map( item => 
                        <ProductCard product={item}  key={item.id} />
                    )
                }
            </ul>
        </div>
    );
}

export default Page;
