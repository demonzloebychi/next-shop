import React from 'react';
import Image from 'next/image';
import { GetProductsResponse } from '@/app/products/products.interface'
// import ProductCard from '@/components/Product';
import ProductCard from '@/components/Product';
import { use } from "react";



export const metadata: object = {
    title: 'Каталог',
    description: 'Каталог товаров категории',
    openGraph: {
        title: 'Каталог',
        description: 'Каталог товаров категории',
    }
}



const fetchProducts = async ( category: string ) => {

    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`, {

        cache: 'force-cache',
        next: {
            revalidate: 3600,
        }
    })
    // console.log(response)

    const data = await response.json()
    // console.log(data)

    return data as GetProductsResponse
}



// const Page = async ({ params }: { params: Promise<{ category: string }> }) => {
// const Page = async ({ params }: { params: { category: string } }) => {
//     const { category } = await params; 

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
