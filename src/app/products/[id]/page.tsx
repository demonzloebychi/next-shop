import React from 'react';
import Image from 'next/image';

const fetchProduct = async (id: number) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, { // Исправленный URL
        cache: 'force-cache',
        next: {
            revalidate: 3600,
        }
    });

    const data = await response.json();
    return data; // Больше не нужно выбирать первый элемент, API должен вернуть один продукт
}

const SinglePageProduct = async ({ params }: { params: { id: number } }) => { // Убрал Promise из типизации params
    const { id } = params; // Больше не нужен await, params уже содержит значение
    const product = await fetchProduct(id);

    return (
        <div>
            <h1>{product?.title}</h1> {/*Добавил опциональную цепочку*/}
            <div className='img'>
                <Image width={400} height={400} src={product?.image} alt={product?.title} /> {/*Добавил опциональную цепочку*/}
            </div>
        </div>
    );
}

export default SinglePageProduct;
