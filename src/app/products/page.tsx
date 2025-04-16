import React from 'react';
import Image from 'next/image';
import { GetProductsResponse } from './products.interface';
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
    console.log(data)
    

    return (
        <div>
            <h1>Каталог</h1>


            <ul className='cards'>
                {
                    data?.map( item => 
                        <ProductCard product={item}  key={item.id} />
                        // <li className='card' key={item.id} >
                        //     <div className="card-image">
                        //         <Image src={item.image} alt="" width='200' height='300' />
                        //     </div>
              
                        //     <div className="card-info">
                        //         <p>{item.title}</p>
                        //         <p><b>{item.price} $</b></p>
                        //     </div>
                            

                        //     <div className="card-actions">
                        //         <a href={`products/${item.id}`} className="card-link">
                        //             Подробнее
                        //         </a>
                        //         <button className="card-button">
                        //             В корзину
                        //         </button>
                        //     </div>
                            
                            
                            
                        // </li>
                    )
                }
            </ul>
        </div>
    );
}

export default Page;
