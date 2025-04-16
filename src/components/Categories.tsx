'use client';

interface CategoriesProps {
  category: string;
}

export default function Categories({ category }: CategoriesProps) {
  // Создаем slug для ссылки
  const slug = category.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '');

  return (
    <li className='card h-auto'>
      <p className="text-2xl uppercase text-center">{category}</p>

      <div className="flex justify-center">
        <a href={`/category/${slug}`} className="card-link ">
          Подробнее
        </a>
      </div>                          
    </li>              
  );
}
