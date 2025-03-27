import React from 'react';
import Image from 'next/image';
import type { Metadata, ResolvingMetadata } from 'next'



  type Props = {
    params: Promise<{ id: number }>
    searchParams: Promise<{ [key: number]: number | number[] | undefined }>
  }



  const fetchProduct = async (id: number) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, { // Исправленный URL
        cache: 'force-cache',
        next: {
            revalidate: 3600,
        }
    });

    const data = await response.json();
    return data; 
}
   
  export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    // read route params
    const id = (await params).id
    const product = await fetchProduct(id);
    
       
    return {
      title: product.title,
      description: product.description,
    }
  }





const SinglePageProduct = async ({ params }: { params: Promise<{ id: number }> }) => { 
    const { id } = await params; 
    const product = await fetchProduct(id);

    return (
        <div>
            <h1>{product?.title}</h1> 
            <div className='img' >
                <Image width={400} height={400} src={product?.image} alt={product?.title} /> 
            </div>
        </div>
    );
}

export default SinglePageProduct;
