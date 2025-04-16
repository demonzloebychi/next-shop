import React from 'react';
import Categories from '@/components/Categories';

export const metadata = {
  title: 'Все наши товары',
  description: 'Все наши товары',
  openGraph: {
    title: 'Все наши товары',
    description: 'Все наши товары',
  }
}

const fetchProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products/categories', {
    cache: 'force-cache',
    next: { revalidate: 3600 }
  });

  const data = await response.json();
  return data as string[];
}

const Page = async () => {
  const categories = await fetchProducts();

  return (
    <div>
      <h1>Каталог</h1>
      <ul className='cards'>
        {categories.map((category) => (
          <Categories category={category} key={category} />
          
        ))}
      </ul>
    </div>
  );
}

export default Page;
