import React from 'react';
import Image from 'next/image';
import { GetProductsResponse } from '../../shared/interfaces/products.interface';
// import ProductCard from '@/components/Product';
import ProductCard from '@/components/Product';


export const metadata: object = {
    title: 'Все наши товары',
    description: 'Все наши товары',
    openGraph: {
        title: 'Все наши товары',
        description: 'Все наши товары',
    }
}

const fetchProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products', {

        cache: 'force-cache',
        next: {
            revalidate: 3600,
        }
    })

    const data = await response.json()
    return data as GetProductsResponse
}






const Page = async () => {
    const data = await fetchProducts()
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
