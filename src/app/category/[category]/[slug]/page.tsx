// app/category/[category]/[slug]/page.tsx

import React from 'react';
import Image from 'next/image';
import AddToCartButton from '@/components/AddToCartButton';
import { Metadata } from 'next';









// Вспомогательная функция для генерации slug из названия
function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

// Получить продукт по слагу (здесь ищем по всем товарам категории)
const fetchProductBySlug = async (category: string, slug: string) => {
  const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
  const products = await response.json();
  return products.find((p: any) => slugify(p.title) === slug);
};


type Props = {
  params: Promise<{ category: string; slug: string }>;
};


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  
  // Добавляем await для получения значений category и slug
  const categoryValue = await category;
  const slugValue = await slug;

  const product = await fetchProductBySlug(categoryValue, slugValue);

  if (!product) {
    return {
      title: 'Товар не найден',
      description: 'Запрошенный товар не найден в категории ' + categoryValue,
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.image,
          alt: product.title,
        },
      ],
    },
  };
}









const SingleProductPage = async ({ params }: { params: Promise<{ category: string; slug: string }> }) => {
  const { category, slug } = await params;
  const product = await fetchProductBySlug(category, slug);

  if (!product) return <div>Товар не найден</div>;

  return (
    <div className='single-product'>
      <h1>{product.title}</h1>
      <p className='category'>{product.category}</p>
      <AddToCartButton product={product} />
      <p>{product.description}</p>
      <Image width={400} height={400} src={product.image} alt={product.title} />
    </div>
  );
};

export default SingleProductPage;
