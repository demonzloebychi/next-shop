import React from 'react';
import Categories from '@/components/Categories';
import {fetchProducts} from '../api/fetchAllCategory'

export const metadata = {
  title: 'Все наши товары',
  description: 'Все наши товары',
  openGraph: {
    title: 'Все наши товары',
    description: 'Все наши товары',
  }
}

export const revalidate = 3600; 


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
